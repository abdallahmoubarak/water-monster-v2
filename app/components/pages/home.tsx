import Layout from "./layout";
import { useState } from "react";
import Containers from "@/components/pages/Containers";
import Head from "next/head";
import dynamic from "next/dynamic";

const Reconfig = dynamic(
  () => import("@/components/pages/secoundary/Reconfig"),
);
const WaterProvider = dynamic(
  () => import("@/components/pages/secoundary/Provider"),
);
const Cleaner = dynamic(() => import("@/components/pages/secoundary/Cleaner"));

const Chat = dynamic(() => import("@/components/pages/secoundary/Chat"));
const Plumber = dynamic(() => import("@/components/pages/secoundary/Plumber"));
const ContainerSetting = dynamic(
  () => import("@/components/pages/secoundary/ContainerSettings"),
);
const Profile = dynamic(() => import("@/components/pages/secoundary/Profile"));
const Installation = dynamic(
  () => import("@/components/pages/secoundary/Installation"),
);

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
