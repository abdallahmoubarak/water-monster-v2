import Button from "@/components/Button";
import { validSign } from "@/utils/signValidation";
import { useState } from "react";
import { useSignIn } from "@/hooks/useAuth";

export default function Iphone() {
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate: signIn } = useSignIn({ setMsg, setIsLoading });

  const handleSignClick = (signType: string) => {
    if (!isLoading) {
      setIsLoading(true);
      setMsg("");
      let userType = "Client";
      let newEmail = email.toLowerCase().trim();
      const { valid, message } = validSign({
        signType,
        email: newEmail,
        password,
        userType,
      });

      if (!valid) {
        setIsLoading(false);
        return setMsg("*" + message);
      }
      setMsg(message);

      signIn({ email: newEmail, password });
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        className="border border-black"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-black"
        value={password}
        onChange={(e) => setPass(e.target.value)}
      />

      <Button
        text={"Sign In"}
        isLoading={isLoading}
        onClick={() => handleSignClick("signin")}
      />
    </div>
  );
}
