import Button from "@/components/Button";
import Input from "@/components/Input";
import InputsContainer from "@/components/InputsContainer";
import Select from "@/components/Select";
import { validSign } from "@/utils/signValidation";
import { styles } from "@/utils/styles";
import { useState } from "react";
import RootLayout from "./layout";
import Or from "@/components/svg/Or";
import Image from "next/image";
import googleLogo from "@/public/svg/google.svg";
import metaLogo from "@/public/svg/metamask.svg";

export default function Sign() {
  const [signup, setSignUp] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [selected, setSelected] = useState<string>("Client");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [forgetForm, setForgetForm] = useState<boolean>(false);

  const handleSignClick = (signType: string) => {
    if (!isLoading) {
      setIsLoading(true);
      setMsg("");
      let userType = selected;
      const { valid, message } = validSign({
        signType,
        email,
        password,
        name,
        userType,
      });

      if (!valid) {
        setIsLoading(false);
        setInvalid(true);
        return setMsg("*" + message);
      }
      setInvalid(false);
      setMsg(message);

      // signType === "signin"
      //   ? signIn({ email.toLowerCase().trim(), password })
      //   : signUp({ type, name, email.toLowerCase().trim(), password });
    }
  };

  const handleForget = () => {
    //TODO: [WM-7] Handle forget password function
    //You can use setMsg("The email is not valid || The email dose not exist...")
  };

  return (
    <>
      <RootLayout>
        <div className="sign-container">
          {!forgetForm ? (
            <h1 className="left">{signup ? "Sign Up" : "Sign In"}</h1>
          ) : (
            <>
              <h1 className="left">Forget the password ?</h1>
              <div className="left">Insert the email address bellow...</div>
            </>
          )}
          <div
            className="switch left"
            onClick={() => {
              setMsg("");
              setSignUp(!signup);
            }}>
            {!forgetForm &&
              (signup
                ? "I already have an account"
                : "I don't have an account")}
          </div>
          <InputsContainer>
            {signup && <Input name="Name" value={name} setValue={setName} />}
            <Input
              name="Email"
              value={email.toLowerCase().trim()}
              setValue={setEmail}
            />
            {!forgetForm && (
              <Input
                name="Password"
                type={"password"}
                value={password}
                setValue={setPass}
              />
            )}
            {signup && (
              <Select
                name="Account type"
                options={["Client", "Provider"]}
                setSelected={setSelected}
                selected={selected}
                hasDefault={true}
              />
            )}
            <div className={`msg ${invalid && "invalid-msg"}`}>{msg}</div>
          </InputsContainer>
          {!signup && (
            <div
              className="switch center"
              onClick={() => setForgetForm(!forgetForm)}>
              {!forgetForm ? "I forget the password" : "Back to sign in"}
            </div>
          )}
          {forgetForm ? (
            <Button
              text={"Send"}
              isLoading={isLoading}
              onClick={handleForget}
            />
          ) : (
            <Button
              text={signup ? "Sign Up" : "Sign In"}
              isLoading={isLoading}
              onClick={() => handleSignClick(signup ? "signup" : "signin")}
            />
          )}
        </div>
        <div className="or-container">
          <Or />
        </div>
        <div className="btn-container">
          <button
            className="google-btn"
            // onClick={() => signInWithGoogle(setName, setEmail, setProfilePic)}
          >
            <div>
              <Image src={googleLogo} alt="G" height={"30"} />
            </div>
            <div>Continue with google</div>
          </button>
          <button className="google-btn">
            <div>
              <Image src={metaLogo} alt="M" height={"30"} />
            </div>
            <div>Continue with Metamask</div>
          </button>
        </div>
      </RootLayout>

      <style jsx>{`
        h1 {
          width: 100%;
          font-size: 2rem;
          padding-bottom: 0.2rem;
          color: ${styles.primaryColor};
        }
        .sign-container {
          ${styles.flexBothcenter};
          ${styles.flexColumn};
          max-width: 26rem;
          margin: auto;
          padding: 1rem;
        }
        .switch {
          cursor: pointer;
          text-decoration: underline;
          padding: 0.2rem;
          color: #555;
        }
        .left {
          text-align: left;
          width: 100%;
        }
        .center {
          text-align: center;
        }
        .msg {
          ${styles.fontSizep8rem}
          text-align: left;
          min-height: 1rem;
          width: 100%;
          padding-left: 0.2rem;
          color: ${styles.primaryColor};
        }

        .invalid-msg {
          color: ${styles.secondaryColor};
        }

        .or-container {
          max-width: 26rem;
          margin: auto;
          padding: 2rem;
        }
        .btn-container {
          ${styles.flexBothcenter};
          ${styles.flexColumn};
          gap: 1rem;
          padding-bottom: 2rem;
        }
        .google-btn {
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
          ${styles.flexBothcenter}
          gap:1rem;
        }
        .google-btn:hover {
          box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04),
            0 2px 4px rgba(0, 0, 0, 0.25);
        }

        .google-btn:focus {
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
