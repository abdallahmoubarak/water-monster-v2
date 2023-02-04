import Layout from "@/components/pages/secoundary/sLayout";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState("No QR code detected");
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <>
      <Head>
        <title>Installation</title>
      </Head>
      <main>
        <Layout title={"Installation"} onClick={() => router.replace("/")}>
          <h1 className="text-3xl pt-6">Step {step}</h1>
          {step === 1 && (
            <Image
              className="mx-auto py-8"
              src="/gif/plugin.gif"
              alt=""
              width={300}
              height={300}
            />
          )}
          {step === 2 && (
            <>
              <Image
                className="mx-auto py-8"
                src="/gif/scan.gif"
                alt=""
                width={300}
                height={300}
              />
            </>
          )}
          {step === 3 && (
            <Image
              className="mx-auto py-8"
              src="/gif/wifi.gif"
              alt=""
              width={300}
              height={300}
            />
          )}
          <div className="text-center py-8">
            {step === 1 && "Plug the Water Monster hub to electricity"}
            {step === 2 && "Scan the QR code placed on the card inside the box"}
            {step === 3 && "Setup your wifi configuration"}
            {step === 4 && "Inserting container's info, comming soon..."}
          </div>
          {step === 2 && (
            <>
              <QrReader
                onResult={(result, error) => {
                  if (!!result) {
                    // @ts-ignore
                    setData(result?.text);
                  }

                  if (!!error) {
                    console.info(error);
                  }
                }}
                // @ts-ignore
                style={{ width: "100%" }}
                constraints={{
                  facingMode: "environment",
                }}
              />
              <p className="pb-6">{data}</p>
            </>
          )}
          <Button
            text={"Done"}
            onClick={() =>
              step < 4 ? setStep((step) => step + 1) : router.replace("/")
            }
          />
        </Layout>
      </main>
    </>
  );
}
