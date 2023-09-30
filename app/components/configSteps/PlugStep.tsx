import ConfigLayout from "./configLayout";
import Image from "next/image";
import Button from "@/components/atoms/Button";

export default function PlugStep({ setStep }: { setStep: Function }) {
  return (
    <ConfigLayout subTitle="Plug the Water Monster hub to electricity">
      <Image
        className="mx-auto py-8"
        src="/gif/plugin.gif"
        alt=""
        width={300}
        height={300}
      />
      <Button text={"Next"} onClick={() => setStep(2)} />
    </ConfigLayout>
  );
}
