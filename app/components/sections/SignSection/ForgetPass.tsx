import { FaArrowLeft } from "react-icons/fa";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { useRef, useState } from "react";
import validEmail from "@/utils/validEmail";
import EmailSent from "./EmailSent";
import { useSendMagicLinkMutation } from "@/hooks/useAuth";

export default function ForgetPass({ setIsForget }: { setIsForget: Function }) {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const [isMailSent, setIsMailSent] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const { mutate: sendMail } = useSendMagicLinkMutation({
    setMsg,
    setIsLoading,
    setIsMailSent,
  });
  const handleSubmit = () => {
    setIsLoading(true);
    const valid = validEmail(emailRef?.current?.value || "");
    let email = emailRef?.current?.value || "";
    valid ? sendMail({ email }) : setMsg("The email is not valid.");
  };

  return (
    <>
      {isMailSent ? (
        <EmailSent />
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
          <Button
            text={"Submit"}
            onClick={handleSubmit}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
}
