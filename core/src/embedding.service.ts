import Anthropic from '@anthropic-ai/sdk';

export class EmbeddingService {
  private anthropic: Anthropic;

  constructor(anthropic: Anthropic) {
    this.anthropic = anthropic;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    // Note: Claude API doesn't natively provide embeddings
    // For production, use a dedicated embedding model like:
    // - Voyage AI embeddings
    // - OpenAI embeddings
    // - Cohere embeddings

    // This is a placeholder implementation
    // In production, integrate with a proper embedding service

    const prompt = `Generate a semantic vector representation of the following text.
    Return a JSON array of 1536 floating point numbers representing the embedding.

    Text: ${text.substring(0, 500)}`;

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-opus-4-5-20251101',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.content[0].type === 'text'
        ? response.content[0].text
        : '[]';

      // Parse the embedding vector
      const embedding = JSON.parse(content);
      return Array.isArray(embedding) ? embedding : this.generateRandomEmbedding();
    } catch (error) {
      console.error('Error generating embedding:', error);
      // Fallback to random embedding for demo purposes
      return this.generateRandomEmbedding();
    }
  }

  private generateRandomEmbedding(dimension: number = 1536): number[] {
    // Temporary fallback for demo purposes
    // In production, use a real embedding API
    const embedding = new Array(dimension);
    for (let i = 0; i < dimension; i++) {
      embedding[i] = Math.random() * 2 - 1;
    }
    // Normalize the vector
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => val / magnitude);
  }

  async batchGenerateEmbeddings(texts: string[]): Promise<number[][]> {
    const embeddings: number[][] = [];

    for (const text of texts) {
      const embedding = await this.generateEmbedding(text);
      embeddings.push(embedding);
    }

    return embeddings;
  }

  cosineSimilarity(vectorA: number[], vectorB: number[]): number {
    if (vectorA.length !== vectorB.length) {
      throw new Error('Vectors must have the same dimension');
    }

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
      magnitudeA += vectorA[i] * vectorA[i];
      magnitudeB += vectorB[i] * vectorB[i];
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0;
    }

    return dotProduct / (magnitudeA * magnitudeB);
  }
}
