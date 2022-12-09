import Button from "@/components/Button";
import { styles } from "@/utils/styles";
import { Key, useState } from "react";
import Installation from "@/components/Installation";
import Container from "@/components/Container";
import { useUserContainers } from "@/hooks/useContainer";
import ContainerLoader from "@/components/ContainerLoader";
import { client } from "pages/_app";
import Alert from "@/components/Alert";
import { userTypes } from "@/hooks/hookTypes";

export default function Containers({
  setPage,
  setPageId,
}: {
  setPage: Function;
  setPageId: Function;
}) {
  let currentUser: any = localStorage.getItem("User");
  currentUser =
    JSON.parse(currentUser) || client.getQueryData<userTypes>(["User"]);
  const [requestOn, setRequestOn] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const { data: containers, isLoading } = useUserContainers(currentUser.id);

  return (
    <>
      <div className="page">
        {isLoading && <ContainerLoader />}
        <div className="containers">
          {containers?.map((container: any, i: Key) => (
            <Container
              key={i}
              container={container}
              setPage={setPage}
              setPageId={setPageId}
            />
          ))}
        </div>

        {requestOn && (
          <Installation
            currentUser={currentUser}
            close={() => setRequestOn(false)}
            setAlertMsg={setAlertMsg}
          />
        )}

        <div className="new-installation-btn">
          <Button
            text={requestOn ? "Cancel" : "New Installation"}
            isSecondary={true}
            onClick={() => setRequestOn(!requestOn)}
          />
        </div>
      </div>

      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />

      <style jsx>{`
        .page {
          padding: 0.8rem;
        }
        .containers {
          ${styles.flexBothcenter};
          flex-wrap: wrap;
          gap: 1rem;
          padding-bottom: 1rem;
        }
        .new-installation-btn {
          padding: 2rem 0;
        }
      `}</style>
    </>
  );
}
