import { useId } from "react";

export default function Input({
  name,
  value,
  setValue,
  inputType = "text",
  onBlur,
  onFocus,
  accept,
  isDisabled,
  limit = 40,
}: inputProps) {
  const id = useId();
  return (
    <div className="rounded-md relative flex-auto w-full">
      {isDisabled ? (
        <>
          <div className="w-full text-xl pl-4 pb-2 pt-6 border leading-none border-black_gray bg-transparent rounded-md min-h-[3.6rem]">
            {value}
          </div>
          <label
            className="absolute text-xs text-primary top-1 left-4"
            htmlFor={id}
          >
            {name}
          </label>
        </>
      ) : (
        <>
          <input
            className="block text-xl pl-4 pb-2 pt-6 border leading-none border-black_gray w-full bg-transparent rounded-md focus:outline-none focus:ring-0 focus:border-primary peer placeholder:text-transparent"
            autoComplete="off"
            id={id}
            placeholder={name}
            value={value}
            type={inputType}
            onChange={(e) =>
              e.target.value.length < limit &&
              !!setValue &&
              setValue(e.target.value)
            }
            onBlur={onBlur && onBlur}
            accept={accept && accept}
            onFocus={onFocus && onFocus}
          />
          <label
            className="absolute text-xs text-primary duration-100 transform -translate-y-4 top-5 left-4 origin-[0] peer-focus:text-primary peer-focus:top-5 peer-focus:text-xs peer-focus:-translate-y-4 cursor-text peer-placeholder-shown:text-light_gray peer-placeholder-shown:text-2xl peer-placeholder-shown:-translate-y-4 peer-placeholder-shown:top-8"
            htmlFor={id}
          >
            {name}
          </label>
        </>
      )}
    </div>
  );
}

type inputProps = {
  name: string;
  value: string | number;
  setValue?: Function;
  inputType?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  accept?: string;
  isDisabled?: boolean;
  limit?: number;
};
