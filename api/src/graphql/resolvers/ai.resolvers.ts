import { Context } from '../context';
import { aiService } from '../../services/ai.service';

export const aiResolvers = {
  Query: {
    aiSuggestContent: async (_: any, args: { prompt: string; context?: string }, context: Context) => {
      const suggestion = await aiService.generateContentSuggestion(args.prompt, args.context);
      return {
        type: 'content',
        content: suggestion,
        confidence: 0.85,
      };
    },
    aiGenerateTags: async (_: any, args: { content: string }, context: Context) => {
      const tags = await aiService.generateTags(args.content);
      return tags;
    },
    aiImproveText: async (_: any, args: { text: string; style?: string }, context: Context) => {
      const improved = await aiService.improveText(args.text, args.style);
      return improved;
    },
  },
  Mutation: {
    generateEmbeddings: async (_: any, args: { contentId: string; contentType: string }, context: Context) => {
      // TODO: Fetch content, generate embeddings, store in database
      await aiService.generateAndStoreEmbeddings(args.contentId, args.contentType);
      return true;
    },
    aiRewriteContent: async (_: any, args: { contentId: string; instructions: string }, context: Context) => {
      // TODO: Fetch content, rewrite with AI, return new content
      const rewritten = await aiService.rewriteContent(args.contentId, args.instructions);
      return rewritten;
    },
  },
};
