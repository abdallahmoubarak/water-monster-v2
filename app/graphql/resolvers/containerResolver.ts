import { driver } from "../index";

type containerTypes = {
  serialNumber: string;
  userId: string;
  location: any;
};

export const containerMutations = {
  createOrUpdateContainer: async (
    _source: any,
    { serialNumber, userId, location }: containerTypes
  ) => {
    const session = driver.session();
    const existingContainers = await session.run(
      `MATCH (n:Container {serialNumber:"${serialNumber}"}) RETURN n`
    );
    const [existingContainer]: any = existingContainers.records.map(
      (record) => record.get("n").properties
    );

    const users = await session.run(`MATCH (n:User {id:"${userId}"}) RETURN n`);
    const [user]: any = users.records.map(
      (record) => record.get("n").properties
    );

    if (!user) throw new Error(`User with id ${userId} does not exist!`);

    if (!existingContainer) {
      // create new container with user as owner
      const newContainer = await session.run(
        `
        CREATE (c:Container { location: $location, serialNumber: $serialNumber })
        CREATE (c)<-[:OWNS]-(u:User { id: $userId })
        RETURN c
      `,
        { location, serialNumber, userId }
      );

      const [container]: any = newContainer.records.map(
        (record) => record.get("c").properties
      );

      return container;
    } else {
      // update existing container with user as viewer
      await session.run(
        `
        MATCH (c:Container {serialNumber: $serialNumber})
        CREATE (c)<-[:CAN_VIEW]-(u:User { id: $userId })
      `,
        { serialNumber, userId }
      );

      return existingContainer;
    }
  },
};
