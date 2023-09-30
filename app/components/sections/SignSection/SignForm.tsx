import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useLogIn, useSignUp } from "@/hooks/useAuth";
import { validSign } from "@/utils/validSign";
import { useRef, useState } from "react";

export default function SignForm({ setIsForget }: { setIsForget: Function }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rePassRef = useRef<HTMLInputElement>(null);

  const { mutate: signUp } = useSignUp({ setMsg, setIsLoading });
  const { mutate: logIn } = useLogIn({ setMsg, setIsLoading });

  const handleSignClick = () => {
    if (!isLoading) {
      setIsLoading(true);
      setMsg("");
      let user = {
        email: emailRef?.current?.value.toLowerCase().trim() || "",
        name: fullNameRef?.current?.value,
        phone: phoneNumberRef?.current?.value.toString() || "",
        password: passwordRef?.current?.value || "",
      };
      const { valid, message } = validSign({
        isLogIn,
        ...user,
        repass: rePassRef?.current?.value,
      });

      if (!valid) {
        setIsLoading(false);
        return setMsg("*" + message);
      }
      setIsLoading(false);
      isLogIn ? logIn({ ...user }) : signUp({ ...user });
    }
  };
  return (
    <>
      <h1 className="text-4xl text-primary">
        {isLogIn ? "Log In" : "Sign Up"}
      </h1>
      <div>
        <span
          className="text-sm underline cursor-pointer"
          onClick={() => setIsLogIn(!isLogIn)}>
          {isLogIn ? "I don't have account" : "I have an account"}
        </span>
        {" | "}
        <span
          onClick={() => setIsForget(true)}
          className="text-sm underline cursor-pointer">
          Forget password?
        </span>
      </div>
      {!isLogIn && (
        <>
          <Input
            placeholder="Full Name"
            refprop={fullNameRef}
            onFocus={() => setMsg("")}
          />
          <Input
            placeholder="Phone Number"
            refprop={phoneNumberRef}
            inputType="number"
            onFocus={() => setMsg("")}
          />{" "}
        </>
      )}
      <Input
        placeholder="Email Address"
        refprop={emailRef}
        onFocus={() => setMsg("")}
      />
      <Input
        placeholder="Password"
        inputType="password"
        refprop={passwordRef}
        onFocus={() => setMsg("")}
      />
      {!isLogIn && (
        <Input
          placeholder="Re-enter the password"
          inputType="password"
          refprop={rePassRef}
          onFocus={() => setMsg("")}
        />
      )}
      <div className={`text-sm pl-2 text-secondary font-bold`}>{msg}</div>
      <Button
        text={isLogIn ? "Log In" : "Sign Up"}
        onClick={handleSignClick}
        isLoading={isLoading}
      />
    </>
  );
}
