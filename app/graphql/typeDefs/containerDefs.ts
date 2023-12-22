import { gql } from "graphql-request";

export const containerDefs = gql`
  type Container {
    id: ID! @id
    serialNumber: String
    distance: Int
    name: String
    size: String
    height: String
    location: Point
    address: String
    water_level: Int
    threshold: Int
    pending: String
    deviceFcm: String
    sensor_state: Boolean
    private_mode: Boolean
    manual_mode: Boolean
    user: User! @relationship(type: "OWNS", direction: IN)
    viewer: [User!]! @relationship(type: "CAN_VIEW", direction: IN)
    createdAt: DateTime! @timestamp(operations: [CREATE])
    updatedAt: DateTime! @timestamp(operations: [CREATE, UPDATE])
  }

  type Mutation {
    createOrUpdateContainer(
      serialNumber: String!
      userId: String!
      location: PointInput
    ): Container!
  }
`;
