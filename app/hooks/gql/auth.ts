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

export const sendMagicLinkMutation = gql`
  mutation Mutation($email: String!) {
    sendMagicLink(email: $email) {
      message
      success
    }
  }
`;

export const resetPassMutation = gql`
  mutation Mutation($token: String!, $password: String!) {
    resetPass(token: $token, password: $password) {
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
