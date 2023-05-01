import { gql } from "graphql-request";

export const userDefs = gql`
  type User {
    id: ID! @id
    name: String!
    email: String!
    password: String! @auth(rules: [{ allow: { id: "$jwt.sub" } }]) @private
    userType: String!
    phone: String
    profile_url: String
    language: String
    location: Point
    palet_number: String
    sent_messages: [Message!]! @relationship(type: "FROM", direction: OUT)
    received_messages: [Message!]! @relationship(type: "TO", direction: IN)
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

  type Mutation {
    signUp(
      name: String!
      email: String!
      password: String!
      userType: String!
    ): AuthRes!
    signIn(email: String!, password: String!): AuthRes!
  }

  type Query {
    me: User
      @cypher(statement: "MATCH (u:User { id: $auth.jwt.sub }) RETURN u")
      @auth(rules: [{ isAuthenticated: true }])
  }
`;
