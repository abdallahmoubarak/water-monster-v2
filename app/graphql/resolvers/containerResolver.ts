import { Container, User } from "../index";

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
    let existingContainer = await Container.find({ where: { serialNumber } });
    let user = await User.find({ where: { id: userId } });

    if (!user) throw new Error(`User with id ${userId} does not exist!`);

    if (existingContainer.length === 0) {
      // create new container with user as owner
      const { containers } = await Container.create({
        input: [
          {
            location,
            serialNumber,
            user: { connect: { where: { node: { id: userId } } } },
          },
        ],
      });
      return containers[0];
    } else {
      // update existing container with user as viewer
      const [container] = existingContainer;
      await Container.update({
        where: { serialNumber },
        update: { viewer: { connect: { where: { node: { id: userId } } } } },
      });
      return container;
    }
  },
};
