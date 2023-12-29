import { resetPassMutations } from "./resetPassResolvers";
import { authMutations } from "./authResolvers";
import { containerMutations } from "./containerResolver";
export const resolvers = {
  Mutation: {
    ...authMutations,
    ...containerMutations,
    ...resetPassMutations,
    
  },
  Query: {},
};
