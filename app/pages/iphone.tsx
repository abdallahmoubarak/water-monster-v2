import Button from "@/components/Button";
import Input from "@/components/Input";
import InputsContainer from "@/components/InputsContainer";
import Select from "@/components/Select";
import { validSign } from "@/utils/signValidation";
import { MouseEventHandler, useState } from "react";
import { styles } from "@/utils/styles";
import { useSignIn, useSignUp } from "@/hooks/useAuth";

export default function Iphone({
  handleForget,
}: {
  handleForget: MouseEventHandler<HTMLButtonElement>;
}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("Client");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);

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
        userType,
      });

      if (!valid) {
        setIsLoading(false);
        setInvalid(true);
        return setMsg("*" + message);
      }
      setInvalid(false);
      setMsg(message);

      signIn({ email: newEmail, password });
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPass(e.target.value)}
      />

      <Button
        text={"Sign In"}
        isLoading={isLoading}
        onClick={() => handleSignClick("signin")}
      />
    </>
  );
}
