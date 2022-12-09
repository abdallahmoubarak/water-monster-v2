import { styles } from "@/utils/styles";
import { MouseEventHandler } from "react";

export default function Switch({
  icon,
  title,
  description,
  isOn,
  setIsOn,
}: switchTypes) {
  return (
    <>
      <div>
        <div className="switch-container">
          <div className="title">
            <div>{icon}</div>
            <div>{title}</div>
          </div>
          <div className="switch" onClick={setIsOn}>
            <div className="circul"></div>
          </div>
        </div>
        <div className="description">{description}</div>
      </div>
      <style jsx>{`
        .switch-container {
          padding: 0rem 0.3rem;
          position: relative;
          width: 100%;
          flex: 1 1;
          ${styles.flexAligncenter};
          ${styles.justifyBetween};
        }
        .title {
          color: ${styles.primaryColor};
          ${styles.fontSize1p2rem};
          ${styles.flexAligncenter};
          gap: 0.3rem;
        }
        .switch {
          width: 3rem;
          height: 1.6rem;
          ${styles.borderRadius1rem};
          border: 1px solid lightgray;
          cursor: pointer;
          ${styles.flexAligncenter};
          ${isOn &&
          "-webkit-box-orient: horizontal;-webkit-box-direction: reverse;-ms-flex-direction: row-reverse; flex-direction: row-reverse;"}
        }
        .circul {
          width: 1.6rem;
          height: 1.6rem;
          ${styles.borderRadius50percent};
          background: ${isOn ? styles.primaryColor : "gray"};
        }
        .description {
          color: gray;
          ${styles.fontSizep8rem};
          padding: 0rem 0.3rem;
        }
      `}</style>
    </>
  );
}
type switchTypes = {
  icon: any;
  title: string;
  description: string;
  isOn: boolean;
  setIsOn: MouseEventHandler<HTMLDivElement>;
};
