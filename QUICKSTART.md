# Quick Start Guide

Get your AI-Native CMS up and running in 5 minutes!

## Step 1: Prerequisites

Ensure you have:
- Docker and Docker Compose installed
- An Anthropic API key ([get one here](https://console.anthropic.com/))

## Step 2: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your Anthropic API key
# ANTHROPIC_API_KEY=sk-ant-api03-your-api-key-here
```

On macOS/Linux:
```bash
nano .env
# or
vim .env
```

## Step 3: Start the Application

```bash
# Start all services (API, Admin UI, PostgreSQL, Redis)
docker-compose up -d

# View logs to ensure everything is running
docker-compose logs -f
```

## Step 4: Access the Application

Open your browser and navigate to:

- **Admin Dashboard**: http://localhost:5173
- **API**: http://localhost:3000
- **GraphQL Playground**: http://localhost:3000/graphql

## Step 5: Login

Use the default credentials:
- **Email**: `admin@example.com`
- **Password**: `admin123`

**IMPORTANT**: Change this password immediately in production!

## Step 6: Create Your First Post

1. Navigate to **Posts** in the sidebar
2. Click **New Post**
3. Enter a title
4. Use the **AI Assistant** to generate content:
   - Type a prompt like "Write an introduction about renewable energy"
   - Click Send
   - The AI will generate relevant content
5. Review and save your post

## Step 7: Try Semantic Search

1. Create a few more posts with different topics
2. Use the GraphQL playground to test semantic search:

```graphql
query {
  semanticSearch(query: "clean energy solutions", limit: 5) {
    posts {
      id
      title
      excerpt
    }
    relevanceScores
  }
}
```

## Common Commands

### Development

```bash
# Start all services
npm run dev

# Rebuild and start
npm run dev:build

# Stop all services
npm run down

# View logs
npm run logs

# View API logs only
npm run logs:api

# Stop and remove all data
npm run clean
```

### Without Docker

If you prefer to run services locally:

```bash
# Terminal 1: Start databases
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=cms_password ankane/pgvector
docker run -d -p 6379:6379 redis:7-alpine

# Terminal 2: Start API
cd api
npm install
npm run dev

# Terminal 3: Start Admin UI
cd admin-ui
npm install
npm run dev
```

## Next Steps

1. **Customize Content Models**: Edit schemas in [content-models/](content-models/)
2. **Explore AI Features**: Try different AI endpoints in [README.md](README.md#ai-features)
3. **Configure Cursor**: Open the project in Cursor IDE for AI-assisted development
4. **Add Your Content**: Create posts, pages, and let AI help you write

## Troubleshooting

### "Connection refused" errors
```bash
# Check if all containers are running
docker-compose ps

# Restart the services
docker-compose restart
```

### "Invalid API key" errors
- Double-check your `ANTHROPIC_API_KEY` in `.env`
- Ensure there are no extra spaces or quotes
- Verify the key is active in your Anthropic dashboard

### Database connection issues
```bash
# Reset the database
docker-compose down -v
docker-compose up -d
```

### Port already in use
If ports 3000, 5173, 5432, or 6379 are in use:
1. Stop the conflicting service
2. Or edit `docker-compose.yml` to use different ports

## Need Help?

- Read the full [README.md](README.md)
- Check the [API Documentation](README.md#api-documentation)
- Review example queries in the GraphQL playground

Happy building with AI!
