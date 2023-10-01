import NavBar from "@/components/sections/NavBar";
import TopBar from "@/components/atoms/TopBar";

export default function RootLayout({
  children,
  hasImg,
  hasNav,
  active,
  setActive,
}: layoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar hasImg={hasImg} setActive={setActive} />

      <div
        className={`h-screen overflow-auto ${
          hasNav && "height: calc(100vh - 8rem)"
        }`}>
        {children}
      </div>

      <div>
        {hasNav && <NavBar activePage={active} setActivePage={setActive} />}
      </div>
    </div>
  );
}

type layoutProps = {
  children?: React.ReactNode;
  hasImg?: boolean;
  hasNav?: boolean;
  active?: string;
  setActive?: Function;
};
