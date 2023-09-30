import Alert from "@/components/Alert";
import Box from "@/components/atoms/Box";
import Button from "@/components/atoms/Button";
import Field from "@/components/Field";
import Input from "@/components/atoms/Input";
import InputsContainer from "@/components/InputsContainer";
import UploadImage from "@/components/UploadImage";
import { useCurrentUser } from "@/hooks/useAuth";
import { useUpdateName, useUpdatePhone } from "@/hooks/useUser";
import { graphQLClient } from "@/utils/graphQLInstance";
import { client } from "pages/_app";
import { useState } from "react";
import Layout from "./sLayout";
import { IoLanguage, IoMailOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { useRouter } from "next/router";

export default function Profile({ setPage }: { setPage: Function }) {
  const { data: currentUser } = useCurrentUser({ enabled: true });
  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [image, setImage] = useState("");
  const [base64, setImg64] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const router = useRouter();

  const { mutate: updateName } = useUpdateName({ setAlertMsg });
  const { mutate: updatePhone } = useUpdatePhone({ setAlertMsg });

  return (
    <>
      <Layout title={"Profile"} onClick={() => setPage("Containers")}>
        <UploadImage
          currentUser={currentUser}
          image={image}
          setImage={setImage}
          setImg64={setImg64}
        />
        <div className="sign-container">
          <Box noShadow={true}>
            <InputsContainer>
              <Input
                placeholder="Name"
                value={name}
                setValue={setName}
                onBlur={() =>
                  currentUser?.name !== name &&
                  updateName({ id: currentUser?.id, name })
                }
              />
              <Input
                placeholder="Phone number"
                value={phone}
                setValue={setPhone}
                onBlur={() =>
                  currentUser?.phone !== phone &&
                  updatePhone({ id: currentUser?.id, phone })
                }
              />
              <Field
                icon={<BiSupport />}
                title={"Support"}
                value={"Contact us"}
                onClick={() => router.push("https://wa.me/+96170097533")}
              />
              <Field icon={<IoLanguage />} title={"Language"} value={"En"} />
              <Field
                icon={<IoMailOutline />}
                title={"Email"}
                value={currentUser?.email}
              />
              <Button
                text="Logout"
                isSecondary={true}
                onClick={() => {
                  client.setQueryData(["User"], null);
                  localStorage.removeItem("JWT");
                  localStorage.removeItem("User");
                  graphQLClient.setHeaders({ authorization: "" });
                }}
              />
            </InputsContainer>
          </Box>
        </div>
        <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
      </Layout>
    </>
  );
}
