import ConfigLayout from "./configLayout";
import Image from "next/image";
import Button from "@/components/Button";

export default function AskToScan({ setIsScan }: { setIsScan: Function }) {
  return (
    <ConfigLayout subTitle="Scan the QR code placed on the card inside the box">
      <Image
        className="mx-auto py-8"
        src="/gif/scan.gif"
        alt=""
        width={300}
        height={300}
      />
      <Button text={"Scan Now"} onClick={() => setIsScan(true)} />
    </ConfigLayout>
  );
}
