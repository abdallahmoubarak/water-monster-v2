import Button from "@/components/Button";
import { styles } from "@/utils/styles";
import { Key, useState } from "react";
import RequestInstallation from "@/components/RequestInstallation";
import Container from "@/components/Container";
import { useUserContainers } from "@/hooks/useContainer";
import ContainerLoader from "@/components/ContainerLoader";
import { client } from "pages/_app";
import Alert from "@/components/Alert";
import { userTypes } from "@/hooks/hookTypes";

export default function Containers({ setPage }: { setPage: Function }) {
  const currentUser =
    client.getQueryData<userTypes>(["User"]) ||
    JSON.parse(localStorage.getItem("User"));
  const [requestOn, setRequestOn] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const { data: containers, isLoading } = useUserContainers(currentUser?.id);

  return (
    <>
      <div className="page">
        {isLoading && <ContainerLoader />}
        <div className="containers">
          {containers?.map((container: any, i: Key) => (
            <Container key={i} container={container} setPage={setPage} />
          ))}
        </div>

        {requestOn && (
          <RequestInstallation
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
