import { postResolvers } from './resolvers/post.resolvers';
import { pageResolvers } from './resolvers/page.resolvers';
import { userResolvers } from './resolvers/user.resolvers';
import { aiResolvers } from './resolvers/ai.resolvers';

export const resolvers = {
  Query: {
    ...postResolvers.Query,
    ...pageResolvers.Query,
    ...userResolvers.Query,
    ...aiResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...pageResolvers.Mutation,
    ...userResolvers.Mutation,
    ...aiResolvers.Mutation,
  },
  Post: postResolvers.Post,
  Page: pageResolvers.Page,
  User: userResolvers.User,
};
