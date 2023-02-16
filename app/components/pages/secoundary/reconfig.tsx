import PlugStep from "@/components/configSteps/PlugStep";
import WifiConfigStep from "@/components/configSteps/WifiConfigStep";
import { useState } from "react";
import Layout from "./sLayout";

export default function Reconfig({ setPage }: { setPage: Function }) {
  const [step, setStep] = useState<number>(1);
  return (
    <Layout title={"Reconfigure"} onClick={() => setPage("Containers")}>
      {step === 1 && <PlugStep setStep={setStep} />}
      {step === 2 && <WifiConfigStep setPage={setPage} />}
    </Layout>
  );
}
