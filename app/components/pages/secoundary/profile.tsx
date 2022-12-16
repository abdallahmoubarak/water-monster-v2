import Alert from "@/components/Alert";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Input from "@/components/Input";
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

export default function Profile({ setPage }: { setPage: Function }) {
  const { data: currentUser } = useCurrentUser({ enabled: true });
  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [image, setImage] = useState("");
  const [base64, setImg64] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

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
          <Box withOutShadow={true}>
            <InputsContainer>
              <Input
                name="Name"
                value={name}
                setValue={setName}
                onBlur={() =>
                  currentUser?.name !== name &&
                  updateName({ id: currentUser?.id, name })
                }
              />
              <Input
                name="Phone number"
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
                onClick={() => setPage("Chat")}
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
