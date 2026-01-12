# Contributing to AI-Native CMS

Thank you for your interest in contributing to AI-Native CMS! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

### Prerequisites

- Node.js 20+
- Docker and Docker Compose
- Git
- GitHub account
- Anthropic API key (for AI features)

### Development Setup

1. **Fork the repository**
   ```bash
   gh repo fork Ronfo2013/ai-native-cms --clone
   cd ai-native-cms
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your ANTHROPIC_API_KEY
   ```

3. **Install dependencies**
   ```bash
   npm run setup
   ```

4. **Start development environment**
   ```bash
   docker-compose up -d
   # or for local development
   cd api && npm run dev
   cd admin-ui && npm run dev
   ```

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or updates

### 2. Make Your Changes

- Write clean, maintainable code
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed

### 3. Test Your Changes

Before submitting:

```bash
# API tests
cd api && npm test

# Admin UI build
cd admin-ui && npm run build

# Docker build test
docker-compose build
```

### 4. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add semantic search filtering

- Add filter options to semantic search
- Update GraphQL schema
- Add tests for new filters
"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
gh pr create --fill
```

## Code Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow existing indentation (2 spaces)
- Use meaningful variable and function names
- Prefer `const` over `let`
- Use async/await over promises chains
- Add JSDoc comments for public APIs

Example:
```typescript
/**
 * Generates AI-powered content suggestions
 * @param prompt - The user's content request
 * @param context - Optional context for better results
 * @returns Generated content string
 */
async function generateContent(prompt: string, context?: string): Promise<string> {
  // Implementation
}
```

### React/TSX

- Use functional components with hooks
- Keep components small and focused
- Use TypeScript interfaces for props
- Extract reusable logic into custom hooks

Example:
```tsx
interface PostEditorProps {
  postId?: string;
  onSave: (post: Post) => void;
}

export function PostEditor({ postId, onSave }: PostEditorProps) {
  // Component implementation
}
```

### CSS/Styling

- Use TailwindCSS utility classes
- Follow mobile-first approach
- Keep custom CSS minimal
- Use semantic color names from theme

## AI Feature Development

When working with AI features:

### 1. Prompt Engineering

- Test prompts thoroughly
- Document expected outputs
- Include context when needed
- Handle edge cases

### 2. Error Handling

Always handle AI API errors:

```typescript
try {
  const response = await anthropic.messages.create({...});
  return response.content[0].text;
} catch (error) {
  if (error.status === 429) {
    // Handle rate limiting
  }
  throw new Error('AI generation failed');
}
```

### 3. Caching

Cache AI responses when appropriate:

```typescript
const cacheKey = `ai:${hashPrompt(prompt)}`;
const cached = await cache.get(cacheKey);
if (cached) return cached;

const result = await generateWithAI(prompt);
await cache.set(cacheKey, result, 3600); // 1 hour TTL
return result;
```

### 4. Token Management

- Monitor token usage
- Set appropriate max_tokens
- Document costs in PR

## Testing Guidelines

### Unit Tests

Write unit tests for:
- Business logic
- API endpoints
- Utility functions

Example:
```typescript
describe('AIService', () => {
  it('should generate content with proper format', async () => {
    const result = await aiService.generateContent('test prompt');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});
```

### Integration Tests

Test component integration:
- API + Database
- Frontend + API
- AI Service + Cache

### E2E Tests

Test critical user flows:
- User authentication
- Content creation with AI
- Semantic search

## Documentation

Update documentation when:
- Adding new features
- Changing APIs
- Modifying configuration
- Updating dependencies

Documentation locations:
- `README.md` - Main documentation
- `ARCHITECTURE.md` - System architecture
- `QUICKSTART.md` - Quick start guide
- Inline code comments
- GraphQL schema descriptions

## Pull Request Process

1. **Update CHANGELOG** (if significant change)
2. **Update version numbers** (if applicable)
3. **Ensure all tests pass**
4. **Update documentation**
5. **Request review** from maintainers
6. **Address review feedback**
7. **Squash commits** if requested

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-reviewed code
- [ ] Added comments for complex logic
- [ ] Updated documentation
- [ ] Added/updated tests
- [ ] All tests passing
- [ ] No new warnings
- [ ] Dependent changes merged

## Areas for Contribution

We welcome contributions in these areas:

### High Priority
- [ ] Add comprehensive test suite
- [ ] Implement content versioning
- [ ] Add media upload/management
- [ ] Create public-facing frontend
- [ ] Performance optimizations

### Medium Priority
- [ ] Multi-language support
- [ ] Advanced SEO features
- [ ] Content workflow automation
- [ ] Analytics dashboard
- [ ] A/B testing for content

### Documentation
- [ ] API examples and tutorials
- [ ] Video walkthroughs
- [ ] Deployment guides
- [ ] Architecture deep-dives

## Questions?

- Open an issue with the `question` label
- Join discussions in GitHub Discussions
- Check existing documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AI-Native CMS!
