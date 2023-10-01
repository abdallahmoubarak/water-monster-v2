import Box from "@/components/atoms/Box";
import Button from "@/components/atoms/Button";
import QRcode from "@/components/atoms/QRcode";

export default function QrCodeSettings({
  currentContainer,
  setPage,
}: {
  currentContainer: any;
  setPage: Function;
}) {
  return (
    <Box>
      <div className="text-sm text-center text-gray-400 ">
        Scan the QR code to connect other account as a viewer.
      </div>
      <div className="mx-auto w-fit border border-gray-300 p-4 ">
        <QRcode
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
    </Box>
  );
}
