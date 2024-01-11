import { gql } from "graphql-request";

export const userDefs = gql`
  type User @authentication {
    id: ID! @id
    name: String!
    email: String!
    password: String! @authentication
    userType: String!
    phone: String
    profileUrl: String
    language: String
    location: Point
    paletNumber: String
    containers: [Container!]! @relationship(type: "OWNS", direction: OUT)
    viewContainers: [Container!]!
      @relationship(type: "CAN_VIEW", direction: OUT)
    createdAt: DateTime! @timestamp(operations: [CREATE])
    updatedAt: DateTime! @timestamp(operations: [CREATE, UPDATE])
  }

  extend type User @exclude(operations: [CREATE, DELETE])

  type AuthRes @exclude {
    user: User
    token: String!
  }

  type SendLink {
    message: String!
    success: Boolean
  }

  type Mutation {
    signUp(
      name: String!
      phone: String!
      email: String!
      password: String!
    ): AuthRes!
    logIn(email: String!, password: String!): AuthRes!
    sendMagicLink(email: String!): SendLink!
    resetPass(token: String!, password: String!): AuthRes!
  }

  type Query {
    me: User @cypher(statement: "MATCH (u:User { id: $jwt.sub }) RETURN u")
  }
  type JWT @jwt {
    roles: [String!]!
  }
`;
