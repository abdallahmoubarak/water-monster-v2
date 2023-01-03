import { styles } from "@/utils/styles";

export default function Box({ children, title, withOutShadow }: boxTypes) {
  return (
    <>
      <div className="box rounded-2xl flex flex-col gap-4 w-full max-w-[26rem] mx-auto">
        <div className="text-2xl">{title}</div>
        {children}
      </div>
      <style jsx>{`
        .box {
          ${!withOutShadow && styles.boxshadow};
          padding: ${!withOutShadow && "1rem"};
        }
      `}</style>
    </>
  );
}

type boxTypes = {
  children: React.ReactNode;
  title?: string;
  withOutShadow?: boolean;
};
