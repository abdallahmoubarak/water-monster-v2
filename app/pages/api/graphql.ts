// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { server } from "@/graphql/index";

export default startServerAndCreateNextHandler(server);
