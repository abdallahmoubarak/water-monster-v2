import Layout from "./layout";
import { useState } from "react";
import Containers from "./primary/containers";
import Head from "next/head";
import dynamic from "next/dynamic";

const ContainerSetting = dynamic(() => import("./secoundary/containerSetting"));
const Profile = dynamic(() => import("./secoundary/profile"));

export default function Home() {
  const [page, setPageName] = useState<string>("Containers");
  const [pageId, setPageId] = useState<string>("");

  const setPage = ({ name, id }: { name: string; id: string }) => {
    setPageName(name);
    setPageId(id);
  };

  return (
    <>
      <Head>
        <title>{page}</title>
      </Head>

      {page === "Containers" && (
        <Layout hasImg={true} hasNav={false} active={page} setActive={setPage}>
          <Containers setPage={setPage} />
        </Layout>
      )}

      {page === "Setting" && (
        <ContainerSetting setPage={setPage} containerId={pageId} />
      )}
      {page === "Profile" && <Profile setPage={setPage} />}
    </>
  );
}
