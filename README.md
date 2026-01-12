# AI-Native CMS

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Claude Opus 4.5](https://img.shields.io/badge/Claude-Opus%204.5-purple)](https://www.anthropic.com/claude)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)

A modern, AI-powered Content Management System built with Claude Opus 4.5, featuring automatic content generation, semantic search, RAG (Retrieval-Augmented Generation), and intelligent content suggestions.

[Quick Start](QUICKSTART.md) • [Architecture](ARCHITECTURE.md) • [Contributing](CONTRIBUTING.md) • [Report Bug](https://github.com/Ronfo2013/ai-native-cms/issues)

## Features

- **AI-Powered Content Generation**: Generate high-quality content with Claude Opus 4.5
- **Semantic Search**: Vector embeddings for intelligent content discovery
- **RAG Support**: Retrieval-Augmented Generation for context-aware responses
- **Auto-Generated Tags**: AI automatically suggests relevant tags for your content
- **Content Improvement**: AI-powered text enhancement and rewriting
- **RESTful & GraphQL APIs**: Flexible API options for any frontend
- **Modern React Admin UI**: Beautiful, responsive admin interface with AI assistant
- **Real-time Caching**: Redis-powered caching for optimal performance
- **Vector Database**: PostgreSQL with pgvector for semantic search

## Tech Stack

### Backend
- **Node.js** + **TypeScript** - Modern, type-safe backend
- **Express** - REST API framework
- **Apollo Server** - GraphQL implementation
- **PostgreSQL + pgvector** - Database with vector search capabilities
- **Redis** - Caching and session management
- **Anthropic Claude API** - AI capabilities powered by Opus 4.5

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first styling
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **Apollo Client** - GraphQL client

### Infrastructure
- **Docker** + **Docker Compose** - Containerization
- **Cursor IDE** - AI-assisted development environment

## Project Structure

```
ai-native-cms/
├── content-models/          # JSON schemas for content types
│   ├── post.schema.json
│   ├── page.schema.json
│   └── user.schema.json
├── api/                     # Backend API
│   ├── src/
│   │   ├── graphql/        # GraphQL schema and resolvers
│   │   ├── rest/           # REST API routes
│   │   ├── middleware/     # Auth, error handling
│   │   └── services/       # Business logic
│   ├── package.json
│   └── tsconfig.json
├── admin-ui/                # React admin dashboard
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── stores/         # State management
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── core/                    # AI engine
│   ├── src/
│   │   ├── ai.service.ts        # Main AI service
│   │   ├── embedding.service.ts # Vector embeddings
│   │   ├── rag.service.ts       # RAG implementation
│   │   ├── cache.service.ts     # Redis caching
│   │   └── database.service.ts  # Database operations
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml       # Full stack orchestration
├── init-db.sql             # Database initialization
├── .cursor/                 # Cursor IDE settings
│   └── settings.json
└── README.md
```

## Getting Started

### Prerequisites

- **Docker** and **Docker Compose** installed
- **Anthropic API Key** (get one at https://console.anthropic.com/)
- **Node.js 20+** (for local development without Docker)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   cd ai-native-cms
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Anthropic API key:
   ```env
   ANTHROPIC_API_KEY=sk-ant-api03-your-api-key-here
   ```

3. **Start the stack**
   ```bash
   docker-compose up -d
   ```

4. **Access the applications**
   - Admin UI: http://localhost:5173
   - API: http://localhost:3000
   - GraphQL Playground: http://localhost:3000/graphql

5. **Default login credentials**
   - Email: `admin@example.com`
   - Password: `admin123` (⚠️ CHANGE IN PRODUCTION)

### Local Development (without Docker)

#### 1. Start PostgreSQL and Redis

```bash
# Using Docker for just the databases
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=cms_password ankane/pgvector
docker run -d -p 6379:6379 redis:7-alpine
```

#### 2. Set up the API

```bash
cd api
npm install
cp .env.example .env
# Edit .env with your settings
npm run dev
```

#### 3. Set up the Admin UI

```bash
cd admin-ui
npm install
npm run dev
```

## API Documentation

### REST API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user

#### Posts
- `GET /api/v1/posts` - List posts
- `GET /api/v1/posts/:id` - Get post by ID
- `POST /api/v1/posts` - Create post
- `PUT /api/v1/posts/:id` - Update post
- `DELETE /api/v1/posts/:id` - Delete post
- `POST /api/v1/posts/:id/publish` - Publish post

#### AI Features
- `POST /api/v1/ai/suggest` - Get AI content suggestions
- `POST /api/v1/ai/tags` - Generate tags from content
- `POST /api/v1/ai/improve` - Improve text
- `POST /api/v1/ai/embeddings` - Generate embeddings
- `POST /api/v1/ai/search` - Semantic search
- `POST /api/v1/ai/rewrite` - Rewrite content with instructions

### GraphQL API

Access the GraphQL playground at `http://localhost:3000/graphql`

#### Example Queries

**Get posts with AI suggestions**
```graphql
query {
  posts(status: PUBLISHED, limit: 10) {
    id
    title
    content
    aiSummary
    tags
    author {
      username
    }
  }
}
```

**Semantic search**
```graphql
query {
  semanticSearch(query: "machine learning tutorials", limit: 5) {
    posts {
      id
      title
      excerpt
    }
    relevanceScores
  }
}
```

**AI content generation**
```graphql
query {
  aiSuggestContent(
    prompt: "Write an introduction about AI in healthcare"
    context: "Medical blog post"
  ) {
    type
    content
    confidence
  }
}
```

#### Example Mutations

**Create post with AI enhancement**
```graphql
mutation {
  createPost(input: {
    title: "Getting Started with AI"
    content: "This is my first post about AI..."
    status: DRAFT
  }) {
    id
    title
    aiSummary
    tags
  }
}
```

**Generate embeddings**
```graphql
mutation {
  generateEmbeddings(contentId: "123", contentType: "post")
}
```

## AI Features

### 1. Content Generation

Ask AI to generate content based on prompts:

```typescript
const suggestion = await aiService.generateContentSuggestion(
  "Write a blog post introduction about renewable energy",
  "Educational blog context"
);
```

### 2. Automatic Tag Generation

AI analyzes content and suggests relevant tags:

```typescript
const tags = await aiService.generateTags(postContent);
// Returns: ["renewable-energy", "solar-power", "sustainability", ...]
```

### 3. Text Improvement

Enhance existing text with AI:

```typescript
const improved = await aiService.improveText(
  originalText,
  "professional" // style: professional, casual, technical
);
```

### 4. Semantic Search

Find content using natural language:

```typescript
const results = await aiService.semanticSearch(
  "articles about climate change solutions",
  limit: 10
);
```

### 5. RAG (Retrieval-Augmented Generation)

Query your content with context-aware AI responses:

```typescript
const answer = await aiService.ragQuery(
  "What are the benefits of solar energy?",
  relevantDocuments
);
```

## Database Schema

### Users Table
- Authentication and user management
- Role-based access control (admin, editor, author, viewer)
- User preferences for AI features

### Posts Table
- Blog posts and articles
- Vector embeddings for semantic search
- AI-generated summaries and tags
- Support for drafts, published, archived states

### Pages Table
- Static pages with custom templates
- Hierarchical structure (parent-child relationships)
- Block-based content system

### Embeddings Table
- Vector storage for semantic search
- Links to posts and pages
- Metadata for contextual search

## Configuration

### Cursor IDE Settings

The project includes optimized Cursor settings at [.cursor/settings.json](.cursor/settings.json):

- Model: `claude-opus-4-5-20251101`
- AI assistance enabled for code completion and chat
- TypeScript optimization
- Auto-formatting on save
- Recommended extensions

### Environment Variables

See [.env.example](.env.example) for all available configuration options:

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | *required* |
| `ANTHROPIC_MODEL` | Claude model to use | `claude-opus-4-5-20251101` |
| `DATABASE_URL` | PostgreSQL connection string | Auto-configured in Docker |
| `REDIS_URL` | Redis connection string | Auto-configured in Docker |
| `JWT_SECRET` | Secret for JWT tokens | Change in production |
| `ENABLE_AI_EMBEDDINGS` | Enable vector embeddings | `true` |
| `ENABLE_AI_SUGGESTIONS` | Enable AI suggestions | `true` |
| `ENABLE_RAG` | Enable RAG features | `true` |

## Development Workflow

### 1. Using AI Assistant in Admin UI

The admin interface includes an integrated AI assistant that helps with content creation:

1. Start writing a post
2. Use the AI Assistant panel
3. Enter a prompt (e.g., "Expand on renewable energy benefits")
4. AI generates relevant content
5. Review and integrate into your post

### 2. Generating Embeddings

Embeddings are automatically generated when you create or update content. To manually trigger:

```bash
curl -X POST http://localhost:3000/api/v1/ai/embeddings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"contentId": "post-id", "contentType": "post"}'
```

### 3. Semantic Search

Use natural language to search your content:

```bash
curl -X POST http://localhost:3000/api/v1/ai/search \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "best practices for clean energy", "limit": 5}'
```

## Deployment

### Production Checklist

- [ ] Change default admin password
- [ ] Set strong `JWT_SECRET`
- [ ] Configure proper CORS origins
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure Redis persistence
- [ ] Set up monitoring and logging
- [ ] Review and adjust rate limits
- [ ] Secure API keys in environment

### Docker Production Build

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Performance Optimization

### Caching Strategy

- Redis caches AI-generated content for 1 hour
- Database query results cached for 5 minutes
- Vector search results cached per query

### Vector Search Optimization

- pgvector uses IVFFlat index for fast similarity search
- Embeddings dimension: 1536 (optimal for most use cases)
- Cosine similarity for relevance scoring

## Troubleshooting

### Docker Issues

**Containers won't start**
```bash
docker-compose down -v
docker-compose up -d --build
```

**Database connection errors**
```bash
docker-compose logs postgres
# Check if postgres is healthy
docker-compose ps
```

### API Issues

**Anthropic API errors**
- Verify your API key is correct
- Check API rate limits
- Ensure model name is correct: `claude-opus-4-5-20251101`

**Redis connection failed**
- Check if Redis container is running: `docker-compose ps redis`
- Verify Redis URL in .env

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Check the documentation in `/docs`
- Review API examples in `/examples`

## Acknowledgments

- Built with [Claude Opus 4.5](https://www.anthropic.com/claude) by Anthropic
- Vector search powered by [pgvector](https://github.com/pgvector/pgvector)
- UI components inspired by modern design systems

---

**Built with Claude Code** - AI-native development at its finest
