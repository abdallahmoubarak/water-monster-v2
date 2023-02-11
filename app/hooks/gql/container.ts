import { gql } from "graphql-request";

export const userContainerQuery = gql`
  query ($id: ID!) {
    containers(where: { user: { id: $id } }) {
      id
      name
      size
      height
      sensor_state
      private_mode
      manual_mode
      water_level
      address
      updatedAt
    }
  }
`;

export const createContainerMutation = gql`
  mutation ($userId: ID!, $serialNumber: String!, $location: PointInput!) {
    createContainers(
      input: [
        {
          location: $location
          serialNumber: $serialNumber
          user: { connect: { where: { node: { id: $userId } } } }
        }
      ]
    ) {
      containers {
        id
      }
    }
  }
`;

export const updateContainerMutation = gql`
  mutation (
    $container_id: ID!
    $name: String!
    $size: String!
    $height: String!
  ) {
    updateContainers(
      where: { id: $container_id }
      update: { name: $name, size: $size, height: $height }
    ) {
      containers {
        id
        name
        size
        height
        sensor_state
        private_mode
        manual_mode
        water_level
        updatedAt
      }
    }
  }
`;
