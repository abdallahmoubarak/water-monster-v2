export default function ToggleSwitch({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: Function;
}) {
  return (
    <div
      className="w-12 h-6 rounded-full bg-slate-200 cursor-pointer flex items-center p-1"
      onClick={() => setToggle(!toggle)}>
      <div className={`w-5 h-5 rounded-full ${!toggle && "bg-gray-500"}`}></div>
      <div className={`w-5 h-5 rounded-full ${toggle && "bg-blue-500"}`}></div>
    </div>
  );
}
