import { styles } from "@/utils/styles";
import { childrenProp } from "types/common";

export default function InputsContainer({ children }: childrenProp) {
  return (
    <>
      <div className="inputs-container">{children}</div>
      <style jsx>{`
        .inputs-container {
          ${styles.flexBothcenter};
          ${styles.flexColumn};
          gap: 0.8rem;
          width: 100%;
          padding: 1rem 0;
        }
      `}</style>
    </>
  );
}
