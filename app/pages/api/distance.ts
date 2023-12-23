import { getTimeGreeting } from "@/utils/Greeting";
import { handleSendFCM } from "@/utils/SendFcm";
import { GraphQLClient } from "graphql-request";
import type { NextApiRequest, NextApiResponse } from "next";

declare const process: {
  env: {
    NEXT_PUBLIC_BASEURL: string;
    NEXT_PUBLIC_GQL_PATH: string;
  };
};

interface UpdateContainersResponse {
  updateContainers: {
    containers: {
      id: string;
      name: string;
      distance: number;
      height: string;
      deviceFcm: string;
      threshold:number;
    }[];
  };
}

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
    const graphQLClient = new GraphQLClient(endpoint, { mode: "cors" });

    try {
      const response: UpdateContainersResponse = await graphQLClient.request(
        `mutation {
          updateContainers(
            where: { serialNumber: "${serialNumber}" }
            update: { distance: ${parseInt(distance)} }
          ) {
            containers {
              id
              name
              height
              distance
              deviceFcm
              threshold
            }
          }
        }`
      );

      const updatedContainer = response?.updateContainers.containers[0];
      const updatedDeviceFcm = updatedContainer?.deviceFcm;
      const calc = Math.round(
        ((parseInt(updatedContainer?.height) - updatedContainer?.distance / 10 + 18) * 100) /
          parseInt(updatedContainer?.height),
      );
    
      const waterLevel = calc > 0 && calc < 100 ? calc : calc < 0 ? 1 : 100;
    
      if (updatedDeviceFcm && waterLevel==updatedContainer?.threshold) {
       const greeting=await getTimeGreeting()
        await handleSendFCM(
          updatedDeviceFcm,
          `${greeting}`,
          `Your tank is currently at ${updatedContainer?.threshold}% capacity.`
        );
      } else {
        console.error('Error: Device FCM not available in the response', updatedContainer);
      }
    } catch (error) {
      console.error('GraphQL request failed:', error);
      res.status(500).end('Internal Server Error');
      return;
    }
  }

  res.status(200).end(`Water level is: ${distance}`);
}
