import { GraphQLClient } from "graphql-request";
import type { NextApiRequest, NextApiResponse } from "next";

declare const process: {
  env: { NEXT_PUBLIC_GQL_PATH: string };
};

const endpoint: string = process.env.NEXT_PUBLIC_GQL_PATH;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { distance, serialNumber } = req.query as {
    distance: string;
    serialNumber: string;
  };
  let headers:any ={
    "Content-Type": "application/json",
    Accept:"*/*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type,
    
  }

  if (distance && serialNumber) {
    const graphQLClient = new GraphQLClient(endpoint, { mode: "cors",  headers });

    await graphQLClient.request(
      `mutation {
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
      }`
    );
  }

  res.status(200).end(`Water level is: ${distance}`);
}
