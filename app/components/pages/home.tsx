import Layout from "./layout";
import { useEffect, useState } from "react";
import Containers from "@/components/pages/Containers";
import Head from "next/head";
import dynamic from "next/dynamic";
import { getMessaging, onMessage } from 'firebase/messaging';

import useFcmToken from "@/utils/hooks/useFcmToken";
import firebaseApp from "@/utils/firebase";

const Reconfig = dynamic(() => import("@/components/pages/secondary/Reconfig"));
const WaterProvider = dynamic(
  () => import("@/components/pages/secondary/Provider"),
);
const Cleaner = dynamic(() => import("@/components/pages/secondary/Cleaner"));

const Chat = dynamic(() => import("@/components/pages/secondary/Chat"));
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
  const [registration, setRegistration] = useState<any>();
  const { fcmToken,notificationPermissionStatus } = useFcmToken();

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
