import Image from "next/image";
import Box from "./atoms/Box";

export default function ServicesBar({ setPage }: any) {
  return (
    <div className="max-w-[30rem] mx-auto p-4 pb-1 ">
      <Box title="Services">
        <div className="flex gap-2">
          {services.map((service, i) => (
            <div
              key={i}
              className="cursor-pointer"
              onClick={() => setPage(service.name)}>
              <Image
                src={`/png/${service.name.toLowerCase()}.png`}
                alt={""}
                height={200}
                width={200}
              />
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

const services = [
  { name: "Plumber" },
  { name: "Provider" },
  { name: "Cleaner" },
];
