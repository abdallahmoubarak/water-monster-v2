import TopBar from "@/components/atoms/TopBar";

export default function RootLayout({
  children,
  hasImg,
  hasNav,
  setActive,
}: layoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar hasImg={hasImg} setActive={setActive} />

      <div
        className={`overflow-auto ${hasNav && "height: calc(100vh - 8rem)"}`}
      >
        {children}
      </div>
    </div>
  );
}

type layoutProps = {
  children?: React.ReactNode;
  hasImg?: boolean;
  hasNav?: boolean;
  setActive?: Function;
};
