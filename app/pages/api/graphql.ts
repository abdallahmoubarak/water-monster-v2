import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { server } from "@/graphql/index";

interface CustomHeaders extends Headers {
  authorization?: string;
}

export default startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({
    token: (req.headers as CustomHeaders).authorization,
  }),
});
