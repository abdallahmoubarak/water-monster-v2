import Layout from "./layout";
import { useState } from "react";
import Containers from "./primary/containers";
import Head from "next/head";
import dynamic from "next/dynamic";
import Chat from "./secoundary/chat";

const ContainerSetting = dynamic(() => import("./secoundary/containerSetting"));
const Profile = dynamic(() => import("./secoundary/profile"));
const Installation = dynamic(() => import("./secoundary/installation"));

export default function Home() {
  const [page, setPage] = useState<string>("Containers");
  const [pageId, setPageId] = useState<string>("");

  return (
    <>
      <Head>
        <title>{page}</title>
      </Head>

      {page === "Containers" && (
        <Layout hasImg={true} hasNav={false} active={page} setActive={setPage}>
          <Containers setPage={setPage} setPageId={setPageId} />
        </Layout>
      )}

      {page === "Settings" && (
        <ContainerSetting setPage={setPage} containerId={pageId} />
      )}
      {page === "Profile" && <Profile setPage={setPage} />}

      {page === "Chat" && <Chat setPage={setPage} />}

      {page === "Installation" && <Installation setPage={setPage} />}
    </>
  );
}
