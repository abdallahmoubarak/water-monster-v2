import { gql } from "graphql-request";

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
