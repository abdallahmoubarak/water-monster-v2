import { gql } from "graphql-request";

export const userContainerQuery = gql`
  query ($id: ID!) {
    containers(where: { user: { id: $id } }) {
      id
      name
      size
      sensor_state
      private_mode
      manual_mode
      water_level
      address
    }
  }
`;

export const createContainerMutation = gql`
  mutation ($id: ID!, $name: String!, $size: String!, $height: String!) {
    createContainers(
      input: [
        {
          name: $name
          size: $size
          height: $height
          user: { connect: { where: { node: { id: $id } } } }
        }
      ]
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
      }
    }
  }
`;

export const updateContainerMutation = gql`
  mutation ($container_id: ID!, $name: String!, $size: String!) {
    updateContainers(
      where: { id: $container_id }
      update: { name: $name, size: $size }
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
      }
    }
  }
`;

export const deleteContainerMutation = gql`
  mutation ($container_id: ID!) {
    deleteContainers(
      where: { id: $container_id }
      delete: { requests: { where: {} } }
    ) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`;

export const updatePrivateModeMutation = gql`
  mutation ($id: ID!, $private_mode: Boolean!) {
    updateContainers(
      where: { id: $id }
      update: { private_mode: $private_mode }
    ) {
      containers {
        id
      }
    }
  }
`;

export const updateManualModeMutation = gql`
  mutation ($id: ID!, $manual_mode: Boolean!) {
    updateContainers(
      where: { id: $id }
      update: { manual_mode: $manual_mode }
    ) {
      containers {
        id
      }
    }
  }
`;
