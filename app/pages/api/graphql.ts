import { ogm, server } from "@/graphql/index";
import type { NextApiRequest, NextApiResponse } from "next";

const startServer = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await ogm.init();
  await startServer;
  await server.createHandler({ path: process.env.NEXT_PUBLIC_GQL_PATH })(
    req,
    res,
  );
}

export const config = {
  api: {
    bodyParser: false,
  },
};
