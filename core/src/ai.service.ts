import Anthropic from '@anthropic-ai/sdk';
import { EmbeddingService } from './embedding.service';
import { RAGService } from './rag.service';
import { CacheService } from './cache.service';

export interface AIConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export class AIService {
  private anthropic: Anthropic;
  private embeddingService: EmbeddingService;
  private ragService: RAGService;
  private cacheService: CacheService;
  private model: string;
  private maxTokens: number;
  private temperature: number;

  constructor(config: AIConfig) {
    this.anthropic = new Anthropic({ apiKey: config.apiKey });
    this.model = config.model || 'claude-opus-4-5-20251101';
    this.maxTokens = config.maxTokens || 2000;
    this.temperature = config.temperature || 1.0;

    this.embeddingService = new EmbeddingService(this.anthropic);
    this.ragService = new RAGService(this.anthropic);
    this.cacheService = new CacheService();
  }

  async initialize(): Promise<void> {
    await this.cacheService.connect();
    console.log('AI Service initialized with model:', this.model);
  }

  async generateContent(prompt: string, systemPrompt?: string): Promise<string> {
    const cacheKey = `generate:${this.hashString(prompt)}`;
    const cached = await this.cacheService.get(cacheKey);

    if (cached) {
      return cached;
    }

    const messages: Anthropic.MessageParam[] = [
      { role: 'user', content: prompt }
    ];

    const response = await this.anthropic.messages.create({
      model: this.model,
      max_tokens: this.maxTokens,
      temperature: this.temperature,
      system: systemPrompt,
      messages,
    });

    const content = response.content[0].type === 'text'
      ? response.content[0].text
      : '';

    await this.cacheService.set(cacheKey, content, 3600);
    return content;
  }

  async generateContentSuggestion(prompt: string, context?: string): Promise<string> {
    const systemPrompt = `You are a helpful AI writing assistant for a content management system.
    Provide creative, well-structured content suggestions based on the user's prompt.
    ${context ? `Context: ${context}` : ''}`;

    return this.generateContent(prompt, systemPrompt);
  }

  async generateTags(content: string): Promise<string[]> {
    const prompt = `Analyze the following content and generate 5-10 relevant tags that categorize it effectively.
    Return ONLY a JSON array of strings, no other text.

    Content: ${content.substring(0, 1000)}`;

    const response = await this.generateContent(prompt);

    try {
      const tags = JSON.parse(response);
      return Array.isArray(tags) ? tags : [];
    } catch {
      return [];
    }
  }

  async improveText(text: string, style?: string): Promise<string> {
    const styleInstruction = style
      ? `Apply a ${style} writing style.`
      : 'Maintain a clear, professional tone.';

    const prompt = `Improve the following text by fixing grammar, enhancing clarity, and making it more engaging.
    ${styleInstruction}

    Original text: ${text}

    Return ONLY the improved text, no explanations.`;

    return this.generateContent(prompt);
  }

  async generateSummary(content: string, maxLength: number = 200): Promise<string> {
    const prompt = `Create a concise summary of the following content in maximum ${maxLength} characters:

    ${content}

    Return ONLY the summary, no other text.`;

    return this.generateContent(prompt);
  }

  async generateEmbedding(text: string): Promise<number[]> {
    return this.embeddingService.generateEmbedding(text);
  }

  async generateAndStoreEmbeddings(contentId: string, contentType: string): Promise<void> {
    // TODO: Fetch content from database, generate embedding, store it
    console.log(`Generating embeddings for ${contentType}:${contentId}`);
  }

  async semanticSearch(query: string, limit: number = 10): Promise<any> {
    const queryEmbedding = await this.generateEmbedding(query);
    return this.ragService.search(queryEmbedding, limit);
  }

  async rewriteContent(contentId: string, instructions: string): Promise<string> {
    // TODO: Fetch content from database
    const content = 'Original content here'; // Placeholder

    const prompt = `Rewrite the following content according to these instructions: ${instructions}

    Original content: ${content}

    Return ONLY the rewritten content, no explanations.`;

    return this.generateContent(prompt);
  }

  async ragQuery(query: string, context: string[]): Promise<string> {
    return this.ragService.query(query, context);
  }

  async chatWithContext(userMessage: string, conversationHistory: Anthropic.MessageParam[]): Promise<string> {
    const messages: Anthropic.MessageParam[] = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    const response = await this.anthropic.messages.create({
      model: this.model,
      max_tokens: this.maxTokens,
      messages,
    });

    return response.content[0].type === 'text'
      ? response.content[0].text
      : '';
  }

  async generateStructuredData(content: string, schema: string): Promise<object> {
    const prompt = `Generate structured data in the following schema for this content:

    Schema: ${schema}
    Content: ${content}

    Return ONLY valid JSON matching the schema.`;

    const response = await this.generateContent(prompt);

    try {
      return JSON.parse(response);
    } catch {
      return {};
    }
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }
}

// Singleton instance
let aiServiceInstance: AIService | null = null;

export function initializeAIService(config: AIConfig): AIService {
  if (!aiServiceInstance) {
    aiServiceInstance = new AIService(config);
  }
  return aiServiceInstance;
}

export const aiService = {
  initialize: async () => {
    const config: AIConfig = {
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      model: process.env.ANTHROPIC_MODEL || 'claude-opus-4-5-20251101',
    };
    const service = initializeAIService(config);
    await service.initialize();
    return service;
  },
  generateContent: (prompt: string, systemPrompt?: string) =>
    aiServiceInstance?.generateContent(prompt, systemPrompt) || Promise.resolve(''),
  generateContentSuggestion: (prompt: string, context?: string) =>
    aiServiceInstance?.generateContentSuggestion(prompt, context) || Promise.resolve(''),
  generateTags: (content: string) =>
    aiServiceInstance?.generateTags(content) || Promise.resolve([]),
  improveText: (text: string, style?: string) =>
    aiServiceInstance?.improveText(text, style) || Promise.resolve(''),
  generateSummary: (content: string, maxLength?: number) =>
    aiServiceInstance?.generateSummary(content, maxLength) || Promise.resolve(''),
  generateEmbedding: (text: string) =>
    aiServiceInstance?.generateEmbedding(text) || Promise.resolve([]),
  generateAndStoreEmbeddings: (contentId: string, contentType: string) =>
    aiServiceInstance?.generateAndStoreEmbeddings(contentId, contentType) || Promise.resolve(),
  semanticSearch: (query: string, limit?: number) =>
    aiServiceInstance?.semanticSearch(query, limit) || Promise.resolve({ posts: [], pages: [] }),
  rewriteContent: (contentId: string, instructions: string) =>
    aiServiceInstance?.rewriteContent(contentId, instructions) || Promise.resolve(''),
  ragQuery: (query: string, context: string[]) =>
    aiServiceInstance?.ragQuery(query, context) || Promise.resolve(''),
};
