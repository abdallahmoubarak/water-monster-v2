import Layout from "@/components/pages/secoundary/sLayout";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import ToolTipButton from "@/components/ToolTipButton";
import { useCreateContainer } from "@/hooks/useContainer";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<string>("No QR code detected");
  const [isScan, setIsScan] = useState<boolean>(false);
  let currentUser: any = localStorage.getItem("User");

  const { mutate: createContainer } = useCreateContainer();

  useEffect(() => {
    if (data !== "No QR code detected") {
      const serialNumber = data.split("serialNumber=")[1];
      if (serialNumber) {
        setStep(3);
        setIsScan(false);
        createContainer({ userId: currentUser.id, serialNumber });
      } else {
        setData("The QR code is not as a standard.");
      }
    }
  }, [data]);
  return (
    <>
      <Head>
        <title>Installation</title>
      </Head>
      <main>
        <Layout title={"Installation"} onClick={() => router.replace("/")}>
          <h1 className="text-3xl pt-6">Step {step}</h1>
          <div className="text-center py-2">
            {step === 1 && "Plug the Water Monster hub to electricity"}
            {step === 2 && "Scan the QR code placed on the card inside the box"}
            {step === 3 && "Setup your wifi configuration"}
            {step === 4 && "Inserting container's info, comming soon..."}
          </div>
          {step === 1 && (
            <>
              <Image
                className="mx-auto py-8"
                src="/gif/plugin.gif"
                alt=""
                width={300}
                height={300}
              />
              <Button text={"Next"} onClick={() => setStep(2)} />
            </>
          )}
          {step === 2 && !isScan && (
            <>
              <Image
                className="mx-auto py-8"
                src="/gif/scan.gif"
                alt=""
                width={300}
                height={300}
              />
              <Button text={"Scan Now"} onClick={() => setIsScan(true)} />
            </>
          )}
          {isScan && (
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
              <div className="mx-auto">{data}</div>
            </>
          )}
          {step === 3 && (
            <>
              <Image
                className="mx-auto"
                src="/gif/wifi.gif"
                alt=""
                width={300}
                height={300}
              />
              <div className="px-2">
                <ul className="mx-auto">
                  <li>1- Copy the password below.</li>
                  <li>2- Go to the wifi manager.</li>
                  <li>
                    3- Connect to{" "}
                    <span className="text-primary">Water-Monster</span> SSID.
                  </li>
                  <li>4- Configure your wifi.</li>
                </ul>
                <ToolTipButton />
              </div>
              <Button text={"Done"} onClick={() => router.push("/")} />
            </>
          )}
        </Layout>
      </main>
    </>
  );
}
