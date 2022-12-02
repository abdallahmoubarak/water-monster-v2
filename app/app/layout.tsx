import "@/styles/globals.css";
import ReactQueryWrapper from "./ReactQueryWrapper";

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  console.log("performance");
  return (
    <html lang="en" dir="ltr">
      <body>
        <ReactQueryWrapper>{children}</ReactQueryWrapper>
      </body>
    </html>
  );
}
