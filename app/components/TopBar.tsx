import { styles } from "@/utils/styles";
import Logo from "./svg/Logo";

export default function TopBar({ hasImg, setActive }: topBarProps) {
  return (
    <>
      <div className="top-bar">
        <div className="logo">
          <Logo />
        </div>
        {hasImg && (
          <div
            className="profile-image"
            // onClick={() => setActive("Profile")}
          ></div>
        )}
      </div>

      <style jsx>{`
        .top-bar {
          background: ${styles.primaryColor};
          padding: 0.6rem 1.2rem;
          height: 4rem;
          ${styles.flexAligncenter};
          ${styles.justifyBetween};
          gap: 1rem;
        }
        .logo {
          height: 100%;
        }
        .profile-image {
          width: 3rem;
          height: 3rem;
          cursor: pointer;
          ${styles.borderRadius50percent};
          ${styles.darkProfileBackground};
        }
      `}</style>
    </>
  );
}

type topBarProps = {
  hasImg?: boolean;
  setActive?: (name: string) => void;
};
