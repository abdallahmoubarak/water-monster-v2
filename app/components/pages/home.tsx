import Layout from "./layout";
import { useEffect, useState } from "react";
import Containers from "@/components/pages/Containers";
import Head from "next/head";
import dynamic from "next/dynamic";
import { getMessaging, onMessage } from 'firebase/messaging';
import firebaseApp from "@/utils/firebase";
import useFcmToken from "@/utils/hooks/useFcmToken";

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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { fcmToken,notificationPermissionStatus } = useFcmToken();
  // Use the token as needed

  // alert(notificationPermissionStatus)
  fcmToken && console.log('FCM token:', fcmToken);
  const handleSendFCM = async () => {
   
    try {
 
     

      // Send a test FCM payload to the current token
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        // timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ` Bearer AAAAqwaYmvg:APA91bH96Zkyw4YGV_SY7VlF5nQZZlG_nzSpFu2XIrHhX7fr7kdkyDCqpY8Quba2w07570T07m0No3QEzSd5l4uhvqRB4ypMjqIgSiRHVRtaRDfMsKvlhvpUVinCz2iT6eceMfV2kAId`
        },
        body: JSON.stringify({
          to: "e7GjgAc48jEdpi36qZNLZa:APA91bF3g80hrYoyVeu6sfTQ6l1raX5yF8Y8-AuBS4E4wDXGSiU-T480zgG0zS1ZmsRRg9MbNYZF5OHUwYu3OdEA7tJk3ODKWBLy5ATg7UkkwrS32v1EBehXVV1pbZLGElCrTsOyZNRx",
          notification: {
            title: 'Test Notification',
            body: 'This is a test FCM payload from the client.',
          },
        }),
      });
      alert(fcmToken)
      const responseData = await response.json();
     
    } catch (error) {
      console.error('Error sending FCM payload:', error);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log(notificationPermissionStatus);
          // The Notification API is supported
          const notification = new Notification('New Message', {
            body: payload?.notification?.body,
          });
          console.log(notification);
          
        console.log('Foreground push notification received:', payload);
      
      
           
      
         
      
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{page}</title>
      </Head>
      <button onClick={handleSendFCM}> Send FCM Payload {fcmToken}</button>
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
