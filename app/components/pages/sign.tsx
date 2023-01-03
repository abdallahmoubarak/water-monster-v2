import { styles } from "@/utils/styles";
import RootLayout from "./layout";
import Or from "@/components/svg/Or";
import Image from "next/image";
import googleLogo from "@/public/svg/google.svg";
import metaLogo from "@/public/svg/metamask.svg";
import SignForm from "../SignForm";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function SignPage() {
  const [isSent, setSent] = useState<boolean>(false);

  const handleForget = () => {
    //TODO: [WM-7] Handle forget password function
    //You can use setMsg("The email is not valid || The email dose not exist...")
    setSent(true);
  };

  return (
    <>
      <RootLayout>
        <div className="flex flex-col items-center justify-center max-w-[26rem] mx-auto p-4 sign-container">
          {isSent ? <MailSent /> : <SignForm handleForget={handleForget} />}
        </div>
        {!isSent && (
          <>
            <div className="max-w-[26rem] mx-auto p-8">
              <Or />
            </div>
            <div className="flex flex-col justify-center items-center gap-4 pb-8">
              <button
                className="social-btn"
                // onClick={() => signInWithGoogle(setName, setEmail, setProfilePic)}
              >
                <div>
                  <Image src={googleLogo} alt="G" height={"30"} />
                </div>
                <div>Continue with google</div>
              </button>
              <button className="social-btn">
                <div>
                  <Image src={metaLogo} alt="M" height={"30"} />
                </div>
                <div>Continue with Metamask</div>
              </button>
            </div>
          </>
        )}
      </RootLayout>

      <style jsx>{`
        .social-btn {
          transition: background-color 0.3s, box-shadow 0.3s;
          padding: 0.4rem 1rem;
          padding-top: 0.6rem;
          border: none;
          border-radius: 3px;
          box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04),
            0 1px 1px rgba(0, 0, 0, 0.25);
          color: #757575;
          background-color: white;
          cursor: pointer;
          ${styles.flexBothcenter};
          gap: 1rem;
        }
        .social-btn:hover {
          box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04),
            0 2px 4px rgba(0, 0, 0, 0.25);
        }

        .social-btn:focus {
          outline: none;
          box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04),
            0 2px 4px rgba(0, 0, 0, 0.25), 0 0 0 3px #c8dafc;
        }
        @media only screen and (min-width: 600px) {
          .sign-container {
            margin-top: 2rem;
            ${styles.borderRadius1rem};
            ${styles.boxshadow};
            ${styles.transitionAll3s};
          }
          .sign-container:hover {
            ${styles.boxshadowHover};
            ${styles.transitionAll3s};
          }
        }
      `}</style>
    </>
  );
}

const MailSent = () => {
  return (
    <>
      <div className="mail-sent">
        <FaCheckCircle /> Mail has been sent successfully,
      </div>
      <div className="go-to">
        <Link href="https://gmail.com">go to the inbox.</Link>
      </div>
      <style jsx>{`
        .mail-sent {
          color: green;
          ${styles.flexBothcenter};
          gap: 0.6rem;
        }
        .go-to {
          color: #555;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};
