import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`min-h-screen ${nunito.className}`}>{children}</div>;
}
