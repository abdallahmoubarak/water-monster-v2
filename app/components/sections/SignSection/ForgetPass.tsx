import { FaArrowLeft } from "react-icons/fa";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { useRef, useState } from "react";
import validEmail from "@/utils/validEmail";
import SendEmail from "./SendEmail";

export default function ForgetPass({ setIsForget }: { setIsForget: Function }) {
  const [msg, setMsg] = useState<string>("");
  const [isMailSent, setIsMailSent] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const valid = validEmail(emailRef?.current?.value || "");
    valid ? setIsMailSent(true) : setMsg("The email is not valid.");
  };

  return (
    <>
      {isMailSent ? (
        <SendEmail />
      ) : (
        <>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsForget(false)}>
            <FaArrowLeft /> Back to sign up
          </div>
          <h1 className="text-3xl text-primary">Forget Password</h1>
          <Input
            placeholder="Email Address"
            onFocus={() => setMsg("")}
            refprop={emailRef}
          />
          <div className={`text-sm pl-2 text-secondary font-bold`}>{msg}</div>
          <Button text="Submit" onClick={handleSubmit} />
        </>
      )}
    </>
  );
}
