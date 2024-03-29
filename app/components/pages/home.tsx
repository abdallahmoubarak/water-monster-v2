import Layout from "./layout";
import { useState } from "react";
import Containers from "@/components/pages/Containers";
import Head from "next/head";
import dynamic from "next/dynamic";

const Reconfig = dynamic(() => import("@/components/pages/secondary/Reconfig"));
const WaterProvider = dynamic(
  () => import("@/components/pages/secondary/Provider"),
);
const Cleaner = dynamic(() => import("@/components/pages/secondary/Cleaner"));

const Plumber = dynamic(() => import("@/components/pages/secondary/Plumber"));
const ContainerSetting = dynamic(
  () => import("@/components/pages/secondary/ContainerSettings"),
);
const Profile = dynamic(() => import("@/components/pages/secondary/Profile"));
const Installation = dynamic(
  () => import("@/components/pages/secondary/Installation"),
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
        <Layout hasImg={true} hasNav={false} setActive={setPage}>
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
      {page === "Installation" && <Installation setPage={setPage} />}
      {page === "Reconfigure" && <Reconfig setPage={setPage} />}
    </>
  );
}
