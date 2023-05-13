import { GraphQLClient } from "graphql-request";
import type { NextApiRequest, NextApiResponse } from "next";

declare const process: {
  env: {
    NEXT_PUBLIC_BASEURL: string;
    NEXT_PUBLIC_GQL_PATH: string;
  };
};

const endpoint: string =
  process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_GQL_PATH;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { distance, serialNumber } = req.query as {
    distance: string;
    serialNumber: string;
  };

  console.log({ distance, serialNumber });
  if (distance && serialNumber) {
    try {
      const graphQLClient = new GraphQLClient(endpoint);
      const mutation = `mutation {
      updateContainers(
        where: { serialNumber: "${serialNumber}" }
        update: { distance: ${parseInt(distance)} }
      ) {	
        containers {
          id
          name
          distance
        }
      }
    }`;

      await graphQLClient.request(mutation);
    } catch (err) {
      console.log(err);
    }
  }

  res.status(200).end(`Water level is: ${distance}`);
}
