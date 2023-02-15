import { gql } from "graphql-request";

export const userContainerQuery = gql`
  query ($id: ID!) {
    containers(where: { user: { id: $id } }) {
      id
      name
      size
      height
      distance
      sensor_state
      private_mode
      manual_mode
      water_level
      address
      updatedAt
    }
  }
`;

export const userViewingContainerQuery = gql`
  query ($id: ID!) {
    users(where: { id: $id }) {
      viewContainers {
        id
        name
        water_level
        distance
        updatedAt
      }
    }
  }
`;

export const createContainerMutation = gql`
  mutation ($userId: String!, $serialNumber: String!, $location: PointInput!) {
    createOrUpdateContainer(
      location: $location
      serialNumber: $serialNumber
      userId: $userId
    ) {
      id
      name
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
