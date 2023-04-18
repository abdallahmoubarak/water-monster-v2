import Image from "next/image";

export default function ServicesBar({ setPage }: any) {
  return (
    <div className="flex gap-2 p-2 max-w-[30rem] ">
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
  );
}
