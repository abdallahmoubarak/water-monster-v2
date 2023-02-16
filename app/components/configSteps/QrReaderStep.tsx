import { QrReader } from "react-qr-reader";

export default function QrReaderStep({
  data,
  setData,
}: {
  data: String;
  setData: Function;
}) {
  return (
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
      <div className="text-center text-primary font-bold">{data}</div>
    </>
  );
}
