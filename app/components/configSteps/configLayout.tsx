interface Layout {
  subTitle: string;
  children: React.ReactNode;
}

export default function ConfigLayout({ subTitle, children }: Layout) {
  return (
    <>
      <div className="text-center py-2">{subTitle}</div>
      <div>{children}</div>
    </>
  );
}
