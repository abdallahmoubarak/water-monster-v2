import { styles } from "@/utils/styles";
import { MouseEventHandler } from "react";

export default function Field({ icon, title, value, onClick }: fieldProps) {
  return (
    <>
      <div className="field">
        <div className="field-title">
          {icon}
          {title}
        </div>
        <div className="field-value" onClick={onClick}>
          {value}
        </div>
      </div>
      <style jsx>{`
        .field {
          ${styles.flexAligncenter};
          ${styles.justifyBetween};
          background: #f3f3f3;
          width: 100%;
          padding: 0.4rem;
        }
        .field-title {
          font-weight: bold;
          ${styles.flexAligncenter};
          gap: 0.6rem;
        }
        .field-value {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

type fieldProps = {
  icon: any;
  title: string;
  value: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
