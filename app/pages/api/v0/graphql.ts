import { ogm, server } from "@/graphql/index";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse, IncomingMessage } from "http";

const startServer = server.start();

export default async function handler(
  req: MicroRequest,
  res: ServerResponse<IncomingMessage>,
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
  await server.createHandler({ path: process.env.NEXT_PUBLIC_PATH })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
