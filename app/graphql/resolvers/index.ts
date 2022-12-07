import { authMutations } from "./authResolvers";
export const resolvers = {
  Mutation: {
    ...authMutations,
  },
  Query: {},
};
