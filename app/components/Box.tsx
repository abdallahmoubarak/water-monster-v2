import { styles } from "@/utils/styles";

export default function Box({ children, title, withOutShadow }: boxTypes) {
  return (
    <>
      <div className="box">
        <div className="box-title">{title}</div>

        {children}
      </div>
      <style jsx>{`
        .box {
          ${!withOutShadow && styles.boxshadow};
          ${styles.borderRadius1rem};
          ${styles.flexColumn};
          gap: 1rem;
          padding: ${!withOutShadow && "1rem"};
          width: 100%;
          max-width: 26rem;
          margin: auto;
        }

        .box-title {
          ${styles.fontSize1p4rem};
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
