export default function MagicBox({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="rounded-2xl p-4 md:p-6 flex flex-col gap-4 w-full max-w-[26rem] mx-auto  md:shadow-[0_0px_8px_0_rgba(0,0,0,0.2)] md:hover:shadow-[0_0px_18px_0_rgba(0,0,0,0.2)] md:border md:border-gray-300 md:transition-shadow md:ease-in-out md:duration-300">
        {children}
      </div>
    </>
  );
}
