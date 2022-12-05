import Home from "@/components/pages/home";
import Head from "next/head";
import { useCurrentUser } from "@/hooks/useAuth";
import { styles } from "@/utils/styles";
import { useEffect, useState } from "react";
import Sign from "@/components/pages/sign";
import AnimatedLogo from "@/components/a/AnimatedLogo";

export default function Index() {
  const [enabled, setEnabled] = useState<boolean>(true);
  const { data: currentUser, isLoading } = useCurrentUser({ enabled });

  useEffect(() => setEnabled(Boolean(localStorage.getItem("JWT"))), []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <title>Water Monster</title>
      </Head>
      {enabled && isLoading && !currentUser && (
        <div className="fallback">
          <div className="logo-container">
            <AnimatedLogo />
          </div>
        </div>
      )}

      {currentUser?.id ? <Home /> : <Sign />}

      <style jsx>{`
        .fallback {
          ${styles.flexBothcenter};
          background: ${styles.primaryColor};
          height: 100vh;
          width: 100vw;
        }
        .logo-container {
          max-width: 8rem;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
}
