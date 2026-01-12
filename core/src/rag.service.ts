import Anthropic from '@anthropic-ai/sdk';
import { DatabaseService } from './database.service';

export interface RAGContext {
  id: string;
  content: string;
  embedding: number[];
  metadata: Record<string, any>;
}

export class RAGService {
  private anthropic: Anthropic;
  private db: DatabaseService;

  constructor(anthropic: Anthropic) {
    this.anthropic = anthropic;
    this.db = new DatabaseService();
  }

  async query(userQuery: string, contextChunks: string[]): Promise<string> {
    const contextText = contextChunks.join('\n\n---\n\n');

    const prompt = `Answer the following question using ONLY the provided context.
    If the answer cannot be found in the context, say "I don't have enough information to answer that."

    Context:
    ${contextText}

    Question: ${userQuery}

    Answer:`;

    const response = await this.anthropic.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.content[0].type === 'text'
      ? response.content[0].text
      : 'Unable to generate response';
  }

  async search(queryEmbedding: number[], limit: number = 10): Promise<RAGContext[]> {
    // Search for similar content using vector similarity
    // This would use pgvector in production
    const results = await this.db.vectorSearch(queryEmbedding, limit);
    return results;
  }

  async rankByRelevance(query: string, documents: string[]): Promise<Array<{ index: number; score: number }>> {
    const prompt = `Rank the following documents by their relevance to the query "${query}".
    Return a JSON array of objects with "index" (0-based) and "score" (0-1) fields, ordered by relevance (highest first).

    Documents:
    ${documents.map((doc, i) => `[${i}] ${doc.substring(0, 200)}`).join('\n\n')}

    Return ONLY the JSON array, no other text.`;

    const response = await this.anthropic.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    try {
      const content = response.content[0].type === 'text'
        ? response.content[0].text
        : '[]';
      const rankings = JSON.parse(content);
      return Array.isArray(rankings) ? rankings : [];
    } catch {
      return documents.map((_, i) => ({ index: i, score: 1 - (i * 0.1) }));
    }
  }

  async extractKeyInformation(text: string): Promise<Record<string, any>> {
    const prompt = `Extract key information from the following text and return it as a JSON object.
    Include: main topics, key entities, important dates, and a brief summary.

    Text: ${text}

    Return ONLY valid JSON.`;

    const response = await this.anthropic.messages.create({
      model: 'claude-opus-4-5-20251101',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    });

    try {
      const content = response.content[0].type === 'text'
        ? response.content[0].text
        : '{}';
      return JSON.parse(content);
    } catch {
      return {};
    }
  }

  chunkText(text: string, chunkSize: number = 1000, overlap: number = 200): string[] {
    const chunks: string[] = [];
    let startIndex = 0;

    while (startIndex < text.length) {
      const endIndex = Math.min(startIndex + chunkSize, text.length);
      chunks.push(text.substring(startIndex, endIndex));
      startIndex += chunkSize - overlap;
    }

    return chunks;
  }
}
