import Button from "@/components/Button";
import SettingForm from "@/components/SettingForm";
import Layout from "./sLayout";
import QrCode from "@/components/QRcode";

export default function ContainerSetting({
  setPage,
  currentContainer,
}: {
  setPage: Function;
  currentContainer: any;
}) {
  return (
    <>
      <Layout
        title={"Container Settings"}
        onClick={() => setPage("Containers")}
      >
        <SettingForm currentContainer={currentContainer} setPage={setPage} />
        <div className="text-sm text-center text-gray-400 pt-6">
          Scan the QR code to connect other device.
        </div>
        <div className="mx-auto w-fit pb-4 pt-2">
          <QrCode
            value={`serialNumber=${currentContainer?.serialNumber}`}
            width={"250px"}
          />
        </div>
        <div className="pt-4">
          <Button
            text={"Reconfigure WiFi"}
            onClick={() => setPage("Reconfigure")}
          />
        </div>
      </Layout>
    </>
  );
}
