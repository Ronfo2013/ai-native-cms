import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    slug: String!
    content: String!
    excerpt: String
    author: User!
    status: PostStatus!
    tags: [String!]!
    aiSummary: String
    metadata: PostMetadata
    createdAt: String!
    updatedAt: String!
    publishedAt: String
  }

  type Page {
    id: ID!
    title: String!
    slug: String!
    content: String!
    template: PageTemplate!
    parentPage: Page
    status: PageStatus!
    blocks: [ContentBlock!]!
    metadata: PageMetadata
    createdAt: String!
    updatedAt: String!
    publishedAt: String
  }

  type User {
    id: ID!
    email: String!
    username: String!
    firstName: String
    lastName: String
    role: UserRole!
    avatar: String
    bio: String
    status: UserStatus!
    createdAt: String!
    updatedAt: String!
  }

  type PostMetadata {
    featuredImage: String
    seoTitle: String
    seoDescription: String
  }

  type PageMetadata {
    seoTitle: String
    seoDescription: String
    canonicalUrl: String
  }

  type ContentBlock {
    type: String!
    content: String!
  }

  enum PostStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  enum PageStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  enum PageTemplate {
    DEFAULT
    LANDING
    ABOUT
    CONTACT
    CUSTOM
  }

  enum UserRole {
    ADMIN
    EDITOR
    AUTHOR
    VIEWER
  }

  enum UserStatus {
    ACTIVE
    INACTIVE
    SUSPENDED
  }

  type AISuggestion {
    type: String!
    content: String!
    confidence: Float!
  }

  type SemanticSearchResult {
    posts: [Post!]!
    pages: [Page!]!
    relevanceScores: [Float!]!
  }

  type Query {
    # Posts
    posts(status: PostStatus, limit: Int, offset: Int): [Post!]!
    post(id: ID, slug: String): Post
    searchPosts(query: String!): [Post!]!
    semanticSearch(query: String!, limit: Int): SemanticSearchResult!

    # Pages
    pages(status: PageStatus, limit: Int, offset: Int): [Page!]!
    page(id: ID, slug: String): Page

    # Users
    users(role: UserRole, limit: Int, offset: Int): [User!]!
    user(id: ID, username: String): User
    me: User

    # AI Features
    aiSuggestContent(prompt: String!, context: String): AISuggestion!
    aiGenerateTags(content: String!): [String!]!
    aiImproveText(text: String!, style: String): String!
  }

  type Mutation {
    # Posts
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    deletePost(id: ID!): Boolean!
    publishPost(id: ID!): Post!

    # Pages
    createPage(input: CreatePageInput!): Page!
    updatePage(id: ID!, input: UpdatePageInput!): Page!
    deletePage(id: ID!): Boolean!

    # Users
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!

    # Auth
    login(email: String!, password: String!): AuthPayload!
    register(input: RegisterInput!): AuthPayload!

    # AI Features
    generateEmbeddings(contentId: ID!, contentType: String!): Boolean!
    aiRewriteContent(contentId: ID!, instructions: String!): String!
  }

  input CreatePostInput {
    title: String!
    content: String!
    excerpt: String
    status: PostStatus
    tags: [String!]
    metadata: PostMetadataInput
  }

  input UpdatePostInput {
    title: String
    content: String
    excerpt: String
    status: PostStatus
    tags: [String!]
    metadata: PostMetadataInput
  }

  input CreatePageInput {
    title: String!
    content: String!
    slug: String!
    template: PageTemplate
    status: PageStatus
    metadata: PageMetadataInput
  }

  input UpdatePageInput {
    title: String
    content: String
    slug: String
    template: PageTemplate
    status: PageStatus
    metadata: PageMetadataInput
  }

  input CreateUserInput {
    email: String!
    username: String!
    password: String!
    firstName: String
    lastName: String
    role: UserRole
  }

  input UpdateUserInput {
    email: String
    username: String
    firstName: String
    lastName: String
    bio: String
    avatar: String
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
    firstName: String
    lastName: String
  }

  input PostMetadataInput {
    featuredImage: String
    seoTitle: String
    seoDescription: String
  }

  input PageMetadataInput {
    seoTitle: String
    seoDescription: String
    canonicalUrl: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;
