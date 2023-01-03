import Button from "@/components/Button";
import { Key, useEffect, useState } from "react";
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
  useEffect(() => {
    client.setQueryData(
      ["Containers"],
      JSON.parse(localStorage.getItem("Containers") || "[{}]"),
    );
  }, []);

  return (
    <>
      <div className="p-3">
        {isLoading && <ContainerLoader />}
        <div className="flex items-center justify-center gap-4 pb-4 flex-wrap ">
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

        <div className="py-8">
          <Button
            text={requestOn ? "Cancel" : "New Installation"}
            isSecondary={true}
            onClick={() => setRequestOn(!requestOn)}
          />
        </div>
      </div>

      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
    </>
  );
}
