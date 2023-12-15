import TopBar from "@/components/atoms/TopBar";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import MagicBox from "@/components/atoms/MagicBox";
import validPass from "@/utils/validPass";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useResetPassMutation } from "@/hooks/auth/useResetPassMutation";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";

export default function ResetPassLink() {
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rePassRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string>("");
  const router = useRouter();
  const { token } = router.query;
  const newToken = Array.isArray(token) ? token[0] : token || "";

  const { mutate: resetPass } = useResetPassMutation({
    setMsg,
    setIsLoading,
    router,
  });
  const { data: currentUser } = useCurrentUser({ enabled: true });

  useEffect(() => {
    currentUser && router.replace("/");
  }, [currentUser]);

  const handleSubmit = () => {
    setIsLoading(true);
    let password = passwordRef.current?.value || "";
    const { valid, message }: any = validPass({
      password,
      rePass: rePassRef.current?.value,
    });
    valid ? resetPass({ token: newToken, password }) : setMsg(message);
    setIsLoading(false);
  };

  return (
    <>
      <TopBar />
      <div className="pt-12">
        <MagicBox>
          <h1 className="text-center text-3xl text-primary">Reset Password</h1>
          <Input
            placeholder="Password"
            inputType="password"
            refprop={passwordRef}
          />
          <Input
            placeholder="Re enter the password"
            inputType="password"
            refprop={rePassRef}
          />
          <div className={`text-sm pl-2 text-secondary font-bold`}>{msg}</div>
          <Button text="Submit" onClick={handleSubmit} isLoading={isLoading} />
        </MagicBox>
      </div>
    </>
  );
}
