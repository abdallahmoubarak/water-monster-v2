import { childrenProp } from "types/common";

export default function InputsContainer({ children }: childrenProp) {
  return (
    <>
      <div className="flex flex-col gap-3 justify-center items-center w-full py-4">
        {children}
      </div>
    </>
  );
}
