import { gql } from "graphql-request";

export const signUpMutation = gql`
  mutation (
    $name: String!
    $email: String!
    $password: String!
    $phone: String!
  ) {
    signUp(name: $name, email: $email, phone: $phone, password: $password) {
      token
      user {
        id
        name
        email
        phone
        userType
      }
    }
  }
`;

export const logInMutation = gql`
  mutation ($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        phone
        userType
        profileUrl
      }
    }
  }
`;

export const meQuery = gql`
  query {
    me {
      id
      name
      email
      phone
      userType
      profileUrl
    }
  }
`;
