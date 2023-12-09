import Home from "@/components/pages/home";
import Head from "next/head";
import { useCurrentUser } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import Sign from "@/components/pages/sign";
import AnimatedLogo from "@/components/svg/AnimatedLogo";
import { client } from "./_app";

export default function Index() {
  const [enabled, setEnabled] = useState<boolean>(true);
  const { data: currentUser, isLoading } = useCurrentUser({ enabled });
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log("Service Worker registered with scope:", registration.scope);
        } catch (error) {
          console.error("Service Worker registration failed:", error);
        }
      }
    };

    registerServiceWorker();
  }, []);

  useEffect(() => setEnabled(Boolean(localStorage.getItem("JWT"))), []);
  useEffect(() => {
    localStorage.getItem("User") &&
      client.setQueryData(
        ["User"],
        JSON.parse(localStorage.getItem("User") || "{}"),
      );
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <title>Water Monster</title>
      </Head>

      {isLoading && (
        <div className="bg-primary h-screen w-screen flex justify-center items-center">
          <div className="max-w-[8rem] mx-auto">
            <AnimatedLogo />
          </div>
        </div>
      )}

      {currentUser?.id ? <Home /> : <Sign />}
    </>
  );
}
