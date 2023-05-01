import { QRCodeSVG } from "qrcode.react";

export default function QRcode({ value, width }: any) {
  return (
    <QRCodeSVG
      bgColor="#FFFFFF"
      fgColor="#40A3C0"
      level="Q"
      style={{ width: width, height: width }}
      value={value}
    />
  );
}
