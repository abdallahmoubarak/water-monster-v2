import { useState } from "react";
import AdminLayout from "./layout";
import Users from "./users";
import dynamic from "next/dynamic";

const Contacts = dynamic(() => import("../primary/contacts"));
const MapPage = dynamic(() => import("../primary/mapPage"));
const Statistics = dynamic(() => import("../primary/statistics"));
const Requests = dynamic(() => import("./requests"));
const Chat = dynamic(() => import("../secoundary/chat"));

export default function Admin({ socket, onlineUsers }) {
  const [active, setActive] = useState("Users");
  const [chatUser, setChatUser] = useState({});
  return (
    <>
      {layoutPages.includes(active) && (
        <AdminLayout active={active} setActive={setActive}>
          {active === "Users" && <Users />}
          {active === "Requests" && <Requests />}
          {active === "Contacts" && (
            <Contacts
              chatUser={chatUser}
              setChatUser={setChatUser}
              onlineUsers={onlineUsers}
              setPage={setActive}
              socket={socket}
            />
          )}
          {active === "Statistics" && <Statistics />}
          {active === "Map" && (
            <MapPage setPage={setActive} setChatUser={setChatUser} />
          )}
        </AdminLayout>
      )}
      {active === "Chat" && (
        <Chat setPage={setActive} user={chatUser} socket={socket} />
      )}
    </>
  );
}

const layoutPages = ["Users", "Requests", "Contacts", "Statistics", "Map"];
