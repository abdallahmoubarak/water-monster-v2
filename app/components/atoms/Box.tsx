export default function Box({ children, title, noShadow }: boxTypes) {
  return (
    <>
      <div
        className={`rounded-xl flex flex-col gap-4 w-full max-w-[26rem] mx-auto ${
          !noShadow && "p-4 shadow-[0_0_10px_0_rgba(0,0,0,0.2)]"
        }`}>
        <div className="text-2xl">{title}</div>
        {children}
      </div>
    </>
  );
}

type boxTypes = {
  children: React.ReactNode;
  title?: string;
  noShadow?: boolean;
};
