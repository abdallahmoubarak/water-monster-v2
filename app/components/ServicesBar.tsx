import Image from "next/image";
import Box from "./Box";

export default function ServicesBar({ setPage }: any) {
  return (
    <div className="max-w-[30rem] mx-auto p-4 ">
      <Box title="Services">
        <div className="flex gap-2  ">
          <div onClick={() => setPage("Plumber")}>
            <Image src={"/png/plumber.png"} alt={""} height={200} width={200} />
          </div>
          <div onClick={() => setPage("Provider")}>
            <Image
              src={"/png/water-provider.png"}
              alt={""}
              height={200}
              width={200}
            />
          </div>
          <div onClick={() => setPage("Cleaner")}>
            <Image
              src={"/png/tank-cleaner.png"}
              alt={""}
              height={200}
              width={200}
            />
          </div>
        </div>
      </Box>
    </div>
  );
}
