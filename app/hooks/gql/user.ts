import { gql } from "graphql-request";

export const updateNameMutation = gql`
  mutation ($id: ID!, $name: String!) {
    updateUsers(where: { id: $id }, update: { name: $name }) {
      users {
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

export const updatePhoneMutation = gql`
  mutation ($id: ID!, $phone: String!) {
    updateUsers(where: { id: $id }, update: { phone: $phone }) {
      users {
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

export const updateProfileUrlMutation = gql`
  mutation ($id: ID!, $url: String!) {
    updateUsers(where: { id: $id }, update: { profileUrl: $url }) {
      users {
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

export const getAdminQuery = gql`
  query {
    users(where: { userType: "Admin" }) {
      id
      name
      profileUrl
    }
  }
`;

export const getContactsQuery = gql`
  query ($me: ID!) {
    users(
      where: {
        OR: [
          { sent_messages_SOME: { to: { id: $me } } }
          { received_messages_SOME: { from: { id: $me } } }
        ]
        type_NOT: "Admin"
      }
    ) {
      id
      name
      profileUrl
      userType
    }
  }
`;

export const getUsersQuery = gql`
  query {
    users(where: { type_NOT: "Admin" }) {
      name
      userType
    }
  }
`;
