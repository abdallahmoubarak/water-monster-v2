import Button from "@/components/Button";
import { Key, useEffect, useState } from "react";
import Container from "@/components/Container";
import {
  useUserContainers,
  useUserViewingContainers,
} from "@/hooks/useContainer";
import ContainerLoader from "@/components/ContainerLoader";
import { client } from "pages/_app";
import { userTypes } from "@/hooks/hookTypes";
import Alert from "@/components/Alert";

export default function Containers({
  setPage,
  setPageId,
}: {
  setPage: Function;
  setPageId: Function;
}) {
  const [alertMsg, setAlertMsg] = useState<string>("");

  let currentUser: any = localStorage.getItem("User");
  currentUser =
    JSON.parse(currentUser) || client.getQueryData<userTypes>(["User"]);

  const { data: containers, isLoading } = useUserContainers(currentUser.id);
  const { data: viewingContainer } = useUserViewingContainers(currentUser.id);

  useEffect(() => {
    client.setQueryData(
      ["Containers"],
      JSON.parse(localStorage.getItem("Containers") || "[{}]")
    );
    client.setQueryData(
      ["ViewingContainers"],
      JSON.parse(localStorage.getItem("ViewingContainers") || "[{}]")
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
              view={false}
              container={container}
              setPage={setPage}
              setPageId={setPageId}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 pb-4 flex-wrap ">
          {viewingContainer?.map((container: any, i: Key) => (
            <Container
              view={true}
              key={i}
              container={container}
              setPage={setPage}
              setPageId={setPageId}
            />
          ))}
        </div>

        <div className="py-8">
          <Button
            text={"New Installation"}
            isSecondary={true}
            onClick={() => setPage("Installation")}
          />
        </div>
      </div>
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
    </>
  );
}
