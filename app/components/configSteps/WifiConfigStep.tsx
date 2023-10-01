import ConfigLayout from "./configLayout";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import ToolTipButton from "@/components/atoms/ToolTipButton";
import Box from "@/components/atoms/Box";

export default function WifiConfigStep({ setPage }: { setPage: Function }) {
  return (
    <ConfigLayout subTitle="Setup your wifi configuration">
      <Image
        className="mx-auto pb-2"
        src="/gif/wifi.gif"
        alt=""
        width={250}
        height={250}
      />
      <div className="pb-4">
        <Box>
          <ul>
            <li>1- Copy the password below.</li>
            <li>2- Go to the wifi manager.</li>
            <li>
              3- Connect to <span className="text-primary">Water-Monster</span>{" "}
              SSID.
            </li>
            <li>4- Configure your wifi.</li>
          </ul>
          <ToolTipButton />
        </Box>
      </div>
      <Button text={"Done"} onClick={() => setPage("Containers")} />
    </ConfigLayout>
  );
}
