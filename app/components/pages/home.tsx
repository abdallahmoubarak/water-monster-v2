import Layout from "./layout";
import { useState } from "react";
import Containers from "./primary/containers";
import Head from "next/head";
import dynamic from "next/dynamic";
import Chat from "./secoundary/chat";
import Reconfig from "./secoundary/reconfig";
import Plumber from "./secoundary/plumber";
import WaterProvider from "./secoundary/provider";
import Cleaner from "./secoundary/cleaner";

const ContainerSetting = dynamic(() => import("./secoundary/containerSetting"));
const Profile = dynamic(() => import("./secoundary/profile"));
const Installation = dynamic(() => import("./secoundary/installation"));

export default function Home() {
  const [page, setPage] = useState<string>("Containers");
  const [currentContainer, setCurrentContainer] = useState<any>({});

  return (
    <>
      <Head>
        <title>{page}</title>
      </Head>

      {page === "Containers" && (
        <Layout hasImg={true} hasNav={false} active={page} setActive={setPage}>
          <Containers
            setPage={setPage}
            setCurrentContainer={setCurrentContainer}
          />
        </Layout>
      )}

      {page === "Settings" && (
        <ContainerSetting
          setPage={setPage}
          currentContainer={currentContainer}
        />
      )}
      {page === "Plumber" && <Plumber setPage={setPage} />}
      {page === "Provider" && <WaterProvider setPage={setPage} />}
      {page === "Cleaner" && <Cleaner setPage={setPage} />}

      {page === "Profile" && <Profile setPage={setPage} />}
      {page === "Chat" && <Chat setPage={setPage} />}
      {page === "Installation" && <Installation setPage={setPage} />}
      {page === "Reconfigure" && <Reconfig setPage={setPage} />}
    </>
  );
}
