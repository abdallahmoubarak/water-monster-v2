import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";
import { styles } from "@/utils/styles";

export default function RootLayout({
  children,
  hasImg,
  hasNav,
  active,
  setActive,
}: layoutProps) {
  return (
    <div className="app">
      <TopBar hasImg={hasImg} setActive={setActive} />

      <div className="app-body">{children}</div>

      <div>
        {hasNav && <NavBar activePage={active} setActivePage={setActive} />}
      </div>

      <style jsx>{`
        .app {
          ${styles.flexColumn};
          height: 100vh;
          overflow: hidden;
        }
        .app-body {
          overflow: auto;
          height: 100vh;
          ${hasNav && "height: calc(100vh - 8rem)"};
        }
      `}</style>
    </div>
  );
}

type layoutProps = {
  children: React.ReactNode;
  hasImg?: boolean;
  hasNav?: boolean;
  active?: string;
  setActive?: () => void;
};
