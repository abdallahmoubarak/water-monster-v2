import { useId } from "react";

export default function Select({
  name,
  options,
  selected,
  setSelected,
  hasDefault,
}: selectProps) {
  const id = useId();

  return (
    <>
      <div className="rounded-md relative flex-auto w-full">
        <select
          className="block text-xl pl-4 pb-2 pt-6 border leading-none border-black_gray w-full bg-transparent rounded-md focus:outline-none focus:ring-0 focus:border-primary peer placeholder:text-transparent"
          id={id}
          onChange={(e) => setSelected(e.target.value)}
          defaultValue={selected}>
          {!hasDefault && <option value="">Select {name}</option>}
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label
          htmlFor={id}
          className="absolute text-xs text-primary duration-100 transform -translate-y-4 top-5 left-4 origin-[0] peer-focus:text-primary peer-focus:top-5 peer-focus:text-xs peer-focus:-translate-y-4 cursor-text peer-placeholder-shown:text-light_gray peer-placeholder-shown:text-2xl peer-placeholder-shown:-translate-y-4 peer-placeholder-shown:top-8">
          {name}
        </label>
      </div>
    </>
  );
}

type selectProps = {
  name: string;
  options: string[];
  selected: string;
  setSelected: Function;
  hasDefault: boolean;
};
