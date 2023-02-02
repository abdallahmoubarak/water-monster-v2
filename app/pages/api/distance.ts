import { GraphQLClient } from "graphql-request";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { distance, serialNumber } = req.query as {
    distance: string;
    serialNumber: string;
  };

  if (distance && serialNumber) {
    const graphQLClient = new GraphQLClient(
      process.env.NEXT_PUBLIC_ENDPOINT || "",
      {
        mode: "cors",
      },
    );

    await graphQLClient.request(
      `mutation {
        updateContainers(
          where: { serialNumber: "${serialNumber}" }
          update: { distance: ${parseInt(distance)} }
        ) {containers {
            id
        }}
    }`,
    );
  }

  res.status(200).end(`Water level is: ${distance}`);
}
