import Home from "@/components/pages/home";
import Head from "next/head";
import Sign from "@/components/pages/sign";
import AnimatedLogo from "@/components/svg/AnimatedLogo";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";

export default function Index() {
  const { data: currentUser, isLoading } = useCurrentUser();

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
