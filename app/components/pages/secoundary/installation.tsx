import Layout from "./sLayout";
import { useEffect, useState } from "react";
import { useCreateContainer } from "@/hooks/useContainer";
import { useCurrentUser } from "@/hooks/useAuth";
import { getGeoLocation } from "@/utils/getGeoLocation";
import PlugStep from "@/components/configSteps/PlugStep";
import AskToScan from "@/components/configSteps/AskToScan";
import QrReaderStep from "@/components/configSteps/QrReaderStep";
import WifiConfigStep from "@/components/configSteps/WifiConfigStep";

export default function ContainerSetting({ setPage }: { setPage: Function }) {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<string>("No QR code detected");
  const [isScan, setIsScan] = useState<boolean>(false);

  const { data: currentUser } = useCurrentUser({ enabled: true });
  const { mutate: createContainer } = useCreateContainer();

  useEffect(() => getGeoLocation(), []);

  useEffect(() => {
    if (data !== "No QR code detected") {
      const serialNumber = data.split("serialNumber=")[1].trim();
      if (serialNumber) {
        createContainer({
          userId: currentUser?.id,
          serialNumber,
          location: {
            latitude: parseFloat(localStorage.getItem("lat") || ""),
            longitude: parseFloat(localStorage.getItem("long") || ""),
          },
        });
        setStep(3);
        setIsScan(false);
      } else {
        setData("The QR code is not as a standard.");
      }
    }
  }, [data]);
  return (
    <>
      <Layout title={"Installation"} onClick={() => setPage("Containers")}>
        <h1 className="text-3xl pt-6">Step {step}</h1>
        {step === 1 && <PlugStep setStep={setStep} />}
        {step === 2 && !isScan && <AskToScan setIsScan={setIsScan} />}
        {isScan && <QrReaderStep data={data} setData={setData} />}
        {step === 3 && <WifiConfigStep setPage={setPage} />}
      </Layout>
    </>
  );
}
