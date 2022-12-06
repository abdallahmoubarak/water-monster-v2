import Layout from "./layout";
import { useEffect, useState } from "react";
import Containers from "./primary/containers";
import Admin from "./admin";
import Head from "next/head";
import MapPage from "./primary/mapPage";
import { io, Socket } from "socket.io-client";
import { useCurrentUser } from "@/hooks/useAuth";
import dynamic from "next/dynamic";

const ContainerSetting = dynamic(() => import("./secoundary/containerSetting"));
const Statistics = dynamic(() => import("./primary/statistics"));
const Contacts = dynamic(() => import("./primary/contacts"));
const Profile = dynamic(() => import("./secoundary/profile"));
const Chat = dynamic(() => import("./secoundary/chat"));
const Wallet = dynamic(() => import("./secoundary/wallet"));
const Call = dynamic(() => import("@/components/Call"));

export default function Home() {
  const [page, setPageName] = useState<string>("Containers");
  const [chatUser, setChatUser] = useState({});
  const [pageId, setPageId] = useState<string>("");
  const [socket, setSocket] = useState<Socket>();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [call, setCall] = useState(true);
  const { data: currentUser } = useCurrentUser({ enabled: true });

  const setPage = (name: string, id: string) => {
    setPageName(name);
    setPageId(id);
  };

  useEffect(
    () =>
      setSocket(io(process.env.NEXT_PUBLIC_BASEURL, { path: "/api/socketio" })),
    [],
  );

  useEffect(() => {
    let userId = currentUser?.id;
    socket?.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket?.id);
      currentUser && socket?.emit("addUser", userId);

      socket?.on("getUsers", (users) => {
        setOnlineUsers(users);
      });

      socket?.on("getCall", ({ callerId, callerName }) => {
        setChatUser({ id: callerId, name: callerName });
        setPage("Call");
        setCall(true);
      });

      if (socket) return () => socket?.disconnect();
    });
  }, [socket]);

  // useEffect(() => {
  //   currentUser.type === "Admin" && setPage("Admin");
  // }, [currentUser]);

  return (
    <>
      <Head>
        <title>{page}</title>
      </Head>

      {layoutPages.includes(page) && (
        <Layout hasImg={true} hasNav={true} active={page} setActive={setPage}>
          {/* {page === "Statistics" && (
            <Statistics setChatUser={setChatUser} setPage={setPage} />
          )} */}
          {page === "Containers" && (
            <>
              {currentUser?.type === "Provider" ? (
                <></>
              ) : (
                // <MapPage
                //   setPage={setPage}
                //   userType={currentUser?.type}
                //   setChatUser={setChatUser}
                // />
                <Containers setPage={setPage} />
              )}
            </>
          )}

          {/* {page === "Contacts" && (
            <Contacts
              setPage={setPage}
              chatUser={chatUser}
              setChatUser={setChatUser}
              socket={socket}
              onlineUsers={onlineUsers}
            />
          )} */}
        </Layout>
      )}
      {/* {page === "Chat" && (
        <Chat setPage={setPage} user={chatUser} socket={socket} />
      )}
      {page === "Setting" && (
        <ContainerSetting setPage={setPage} containerId={pageId} />
      )}
      {page === "Profile" && <Profile setPage={setPage} />}
      {page === "Wallet" && <Wallet setPage={setPage} />}
      {page === "Admin" && <Admin onlineUsers={onlineUsers} socket={socket} />}
      {page === "Call" && (
        <Call
          call={call}
          setCall={setCall}
          user={chatUser}
          recieve={true}
          setPage={setPage}
          userType={currentUser.type}
          socket={socket}
        />
      )} */}
    </>
  );
}

const layoutPages = ["Statistics", "Containers", "Contacts"];
declare const process: {
  env: {
    NEXT_PUBLIC_BASEURL: string;
  };
};
