import pg from 'pg';
import { RAGContext } from './rag.service';

const { Pool } = pg;

export class DatabaseService {
  private pool: pg.Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async initialize(): Promise<void> {
    // Create tables with pgvector extension
    await this.pool.query('CREATE EXTENSION IF NOT EXISTS vector');

    // Create embeddings table
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS embeddings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        content_id UUID NOT NULL,
        content_type VARCHAR(50) NOT NULL,
        embedding vector(1536),
        content TEXT,
        metadata JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create index for vector similarity search
    await this.pool.query(`
      CREATE INDEX IF NOT EXISTS embeddings_vector_idx
      ON embeddings
      USING ivfflat (embedding vector_cosine_ops)
    `);

    console.log('Database initialized with pgvector');
  }

  async vectorSearch(queryEmbedding: number[], limit: number = 10): Promise<RAGContext[]> {
    const query = `
      SELECT
        id,
        content,
        embedding,
        metadata,
        1 - (embedding <=> $1::vector) as similarity
      FROM embeddings
      ORDER BY embedding <=> $1::vector
      LIMIT $2
    `;

    try {
      const result = await this.pool.query(query, [JSON.stringify(queryEmbedding), limit]);

      return result.rows.map(row => ({
        id: row.id,
        content: row.content,
        embedding: row.embedding,
        metadata: row.metadata,
      }));
    } catch (error) {
      console.error('Vector search error:', error);
      return [];
    }
  }

  async storeEmbedding(
    contentId: string,
    contentType: string,
    embedding: number[],
    content: string,
    metadata: Record<string, any>
  ): Promise<void> {
    const query = `
      INSERT INTO embeddings (content_id, content_type, embedding, content, metadata)
      VALUES ($1, $2, $3::vector, $4, $5)
      ON CONFLICT (content_id)
      DO UPDATE SET
        embedding = EXCLUDED.embedding,
        content = EXCLUDED.content,
        metadata = EXCLUDED.metadata
    `;

    await this.pool.query(query, [
      contentId,
      contentType,
      JSON.stringify(embedding),
      content,
      JSON.stringify(metadata),
    ]);
  }

  async deleteEmbedding(contentId: string): Promise<void> {
    await this.pool.query('DELETE FROM embeddings WHERE content_id = $1', [contentId]);
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
