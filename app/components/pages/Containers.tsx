import Button from "@/components/atoms/Button";
import { Key, useEffect, useState } from "react";
import Container from "@/components/atoms/Container";
import ContainerLoader from "@/components/atoms/ContainerLoader";
import { client } from "pages/_app";
import { userTypes } from "@/hooks/hookTypes";
import Alert from "@/components/atoms/Alert";
import ServicesBar from "@/components/sections/ServicesBar";
import { useUserContainers } from "@/hooks/container/useUserContainers";
import { useUserViewingContainers } from "@/hooks/container/useUserViewingContainers";

export default function Containers({
  setPage,
  setCurrentContainer,
}: {
  setPage: Function;
  setCurrentContainer: Function;
}) {
  const [alertMsg, setAlertMsg] = useState<string>("");

  let currentUser: any = localStorage.getItem("User");
  currentUser =
    (currentUser && JSON.parse(currentUser)) ||
    client.getQueryData<userTypes>(["User"]);

  const {
    data: containers,
    isLoading,
    isFetching,
  } = useUserContainers(currentUser.id);
  const { data: viewingContainer } = useUserViewingContainers(currentUser.id);

  useEffect(() => {
    client.setQueryData(
      ["Containers"],
      JSON.parse(localStorage.getItem("Containers") || "[{}]"),
    );
    client.setQueryData(
      ["ViewingContainers"],
      JSON.parse(localStorage.getItem("ViewingContainers") || "[{}]"),
    );
  }, []);

  return (
    <>
      <ServicesBar setPage={setPage} />
      <div className="p-3">
        {isLoading && <ContainerLoader />}
        <div className="flex items-center justify-center gap-4 pb-4 flex-wrap ">
          {containers?.map((container: any, i: Key) => (
            <Container
              key={i}
              view={false}
              container={container}
              setPage={setPage}
              setCurrentContainer={setCurrentContainer}
              isFetching={isFetching}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 pb-4 flex-wrap ">
          {viewingContainer?.map((container: any, i: Key) => (
            <Container
              view={true}
              key={i}
              container={container}
              setPage={undefined}
              setCurrentContainer={undefined}
              isFetching={isFetching}
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
