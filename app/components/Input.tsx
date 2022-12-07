import styles from "@/styles/Input.module.css";
import { useId } from "react";

export default function Input({
  name,
  value,
  setValue,
  type = "text",
  onBlur,
  onFocus,
  accept,
  isDisabled,
  limit = 40,
}: inputProps) {
  const id = useId();
  return (
    <>
      <div className={styles.inputContainer}>
        {isDisabled ? (
          <>
            <div className={styles.inputDisabled}>{value}</div>
            <label className={styles.labelDisabled} htmlFor={id}>
              {name}
            </label>
          </>
        ) : (
          <>
            <input
              className={styles.input}
              autoComplete="off"
              id={id}
              placeholder={name}
              value={value}
              type={type}
              onChange={(e) =>
                e.target.value.length < limit && setValue(e.target.value)
              }
              onBlur={onBlur && onBlur}
              accept={accept && accept}
              onFocus={onFocus && onFocus}
            />
            <label className={styles.label} htmlFor={id}>
              {name}
            </label>
          </>
        )}
      </div>
    </>
  );
}

type inputProps = {
  name: string;
  value: string | number;
  setValue?: Function;
  type?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  accept?: string;
  isDisabled?: boolean;
  limit?: number;
};
