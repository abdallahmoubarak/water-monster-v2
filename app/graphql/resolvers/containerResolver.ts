import { driver } from "../index";
import { v4 as uuidv4 } from "uuid";

type containerTypes = {
  serialNumber: string;
  userId: string;
  location: any;
};

export const containerMutations = {
  createOrUpdateContainer: async (
    _source: any,
    { serialNumber, userId, location }: containerTypes,
  ) => {
    const session = driver.session();
    const existingContainers = await session.run(
      `MATCH (c:Container {serialNumber:"${serialNumber}"}) RETURN c`,
    );
    const owners = await session.run(
      `MATCH (owner)-[:OWNS]->(c:Container {serialNumber:"${serialNumber}"}) RETURN c,owner`,
    );
    const [existingContainer]: any = existingContainers.records.map(
      (record) => record.get("c").properties,
    );

    const users = await session.run(`MATCH (u:User {id:"${userId}"}) RETURN u`);
    const [user]: any = users.records.map(
      (record) => record.get("u").properties,
    );
    const [owner]: any = owners.records.map(
      (record) => record.get("owner").properties,
    );

    if (!user) throw new Error(`User with id ${userId} does not exist!`);

    if (!existingContainer && !owner) {
      // create new container with user as owner
      const id = uuidv4();
      const newContainer = await session.run(`
      CREATE (c:Container {id:"${id}", location: "${location}", serialNumber: "${serialNumber}", createdAt: datetime(), updatedAt: datetime()})
      WITH c
      MATCH (u:User {  id: "${userId}" })
      MERGE (c)<-[:OWNS]-(u)
      RETURN c  
      `);

      const [container]: any = newContainer.records.map(
        (record) => record.get("c").properties,
      );

      return container;
    } else if (!owner && existingContainer) {
      await session.run(`
      MATCH (c:Container {serialNumber: "${serialNumber}"})
      MATCH (u:User {  id: "${userId}" })
      MERGE (c)<-[:OWNS]-(u)
    `);
      return existingContainer;
    } else {
      // update existing container with user as viewer
      if (owner?.id === userId) return existingContainer;

      await session.run(`
        MATCH (c:Container {serialNumber: "${serialNumber}"})
        MATCH (u:User {  id: "${userId}" })
        MERGE (c)<-[:CAN_VIEW]-(u)
      `);
      return existingContainer;
    }
  },
};
