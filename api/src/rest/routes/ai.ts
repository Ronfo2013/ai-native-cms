import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { aiService } from '../../services/ai.service';

export const aiRouter = Router();

// POST /api/v1/ai/suggest - Get AI content suggestions
aiRouter.post('/suggest', authenticate, async (req, res) => {
  const { prompt, context } = req.body;
  const suggestion = await aiService.generateContentSuggestion(prompt, context);
  res.json({ suggestion });
});

// POST /api/v1/ai/tags - Generate tags from content
aiRouter.post('/tags', authenticate, async (req, res) => {
  const { content } = req.body;
  const tags = await aiService.generateTags(content);
  res.json({ tags });
});

// POST /api/v1/ai/improve - Improve text with AI
aiRouter.post('/improve', authenticate, async (req, res) => {
  const { text, style } = req.body;
  const improved = await aiService.improveText(text, style);
  res.json({ improved });
});

// POST /api/v1/ai/embeddings - Generate embeddings for content
aiRouter.post('/embeddings', authenticate, async (req, res) => {
  const { contentId, contentType } = req.body;
  await aiService.generateAndStoreEmbeddings(contentId, contentType);
  res.json({ success: true });
});

// POST /api/v1/ai/search - Semantic search
aiRouter.post('/search', authenticate, async (req, res) => {
  const { query, limit } = req.body;
  const results = await aiService.semanticSearch(query, limit);
  res.json({ results });
});

// POST /api/v1/ai/rewrite - Rewrite content with instructions
aiRouter.post('/rewrite', authenticate, async (req, res) => {
  const { contentId, instructions } = req.body;
  const rewritten = await aiService.rewriteContent(contentId, instructions);
  res.json({ content: rewritten });
});
