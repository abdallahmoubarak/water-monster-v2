import Button from "@/components/Button";
import Input from "@/components/Input";
import InputsContainer from "@/components/InputsContainer";
import Select from "@/components/Select";
import { validSign } from "@/utils/signValidation";
import { MouseEventHandler, useState } from "react";
import { styles } from "@/utils/styles";
import { useSignIn, useSignUp } from "@/hooks/useAuth";

export default function SignForm({
  handleForget,
}: {
  handleForget: MouseEventHandler<HTMLButtonElement>;
}) {
  const [signup, setSignUp] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("Client");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [forgetForm, setForgetForm] = useState<boolean>(false);

  const { mutate: signUp } = useSignUp({ setMsg, setIsLoading });
  const { mutate: signIn } = useSignIn({ setMsg, setIsLoading });

  const handleSignClick = (signType: string) => {
    if (!isLoading) {
      setIsLoading(true);
      setMsg("");
      let userType = selectedType;
      let newEmail = email.toLowerCase().trim();
      const { valid, message } = validSign({
        signType,
        email: newEmail,
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

      signType === "signin"
        ? signIn({ email: newEmail, password })
        : signUp({ userType: "Client", name, email: newEmail, password });
    }
  };
  return (
    <>
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
          (signup ? "I already have an account" : "I don't have an account")}
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
            inputType={"password"}
            value={password}
            setValue={setPass}
          />
        )}
        {signup && (
          <Select
            name="Account type"
            options={["Client", "Provider"]}
            setSelected={setSelectedType}
            selected={selectedType}
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
        <Button text={"Send"} isLoading={isLoading} onClick={handleForget} />
      ) : (
        <Button
          text={signup ? "Sign Up" : "Sign In"}
          isLoading={isLoading}
          onClick={() => handleSignClick(signup ? "signup" : "signin")}
        />
      )}
      <style jsx>{`
        h1 {
          width: 100%;
          font-size: 2rem;
          padding-bottom: 0.2rem;
          color: ${styles.primaryColor};
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
