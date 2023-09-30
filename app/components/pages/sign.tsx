import MagicBox from "@/components/atoms/MagicBox";
import ForgetPass from "@/components/sections/SignSection/ForgetPass";
import SignForm from "@/components/sections/SignSection/SignForm";
import TopBar from "@/components/sections/TopBar";
import { useState } from "react";

export default function Sign() {
  const [isForget, setIsForget] = useState(false);
  return (
    <>
      <TopBar />
      <div className="pt-4">
        <MagicBox>
          {isForget ? (
            <ForgetPass setIsForget={setIsForget} />
          ) : (
            <SignForm setIsForget={setIsForget} />
          )}
        </MagicBox>
      </div>
    </>
  );
}
