import { gql } from "graphql-request";

export const userContainerQuery = gql`
  query ($id: ID!) {
    containers(where: { user: { id: $id } }) {
      id
      name
      size
      height
      threshold
      serialNumber
      distance
      sensor_state
      private_mode
      manual_mode
      water_level
      viewer {
        email
      }
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
        size
        height
        threshold
        distance
        water_level
        sensor_state
        updatedAt
      }
    }
  }
`;

export const createContainerMutation = gql`
  mutation ($userId: String!, $serialNumber: String!, $location: PointInput) {
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

export const updateContainerInfoMutation = gql`
  mutation ($id: ID!, $name: String!, $size: String!, $height: String!) {
    updateContainers(
      where: { id: $id }
      update: { name: $name, size: $size, height: $height }
    ) {
      containers {
        id
        name
        size
        height
        threshold
        serialNumber
        sensor_state
        private_mode
        manual_mode
        water_level
        updatedAt
      }
    }
  }
`;

export const updateThresholdMutation = gql`
  mutation ($id: ID!, $threshold: Int!) {
    updateContainers(where: { id: $id }, update: { threshold: $threshold }) {
      containers {
        id
        name
        size
        height
        threshold
        serialNumber
        sensor_state
        private_mode
        manual_mode
        water_level
        updatedAt
      }
    }
  }
`;
export const transferOwnerShipMutation = gql`
mutation UpdateContainer(
  $contId: ID!,
  $ownerId: ID!,
  $newOwnerId: ID!
) {
  updateContainers(
    where: { id: $contId }
    disconnect: { user: { where: { node: { id: $ownerId } } } }
    connect: { user: { where: { node: { id: $newOwnerId } } } }
  ) {
    containers {
      id
      user {
        id
      }
    }
  }
}
`;

export const removeViewerMutation = gql`
mutation($contId: ID!, $userId: ID!) {
  updateContainers(
    where: { id: $contId }
    disconnect: { viewer: [{ where: { node: { id: $userId } } }] }
  ) {
    containers {
      id
      viewer {
        id
      }
    }
  }
}`;