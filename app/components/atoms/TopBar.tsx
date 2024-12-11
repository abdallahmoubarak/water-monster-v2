import Logo from "../svg/Logo";

export default function TopBar({ hasImg, setActive }: topBarProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-4  bg-primary px-4 py-2 h-16">
        <div className="h-full w-fit flex-0 items-start">
          <Logo />
        </div>
        {hasImg && (
          <div
            className="dark-profile-background w-12 h-12 cursor-pointer rounded-full"
            onClick={() => !!setActive && setActive("Profile")}
          ></div>
        )}
      </div>
    </>
  );
}

type topBarProps = {
  hasImg?: boolean;
  setActive?: Function;
};
