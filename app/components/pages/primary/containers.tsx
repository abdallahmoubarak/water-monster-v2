import Button from "@/components/Button";
import { Key, useEffect } from "react";
import Container from "@/components/Container";
import { useUserContainers } from "@/hooks/useContainer";
import ContainerLoader from "@/components/ContainerLoader";
import { client } from "pages/_app";
import { userTypes } from "@/hooks/hookTypes";
import { useRouter } from "next/router";

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

  const { data: containers, isLoading } = useUserContainers(currentUser.id);
  useEffect(() => {
    client.setQueryData(
      ["Containers"],
      JSON.parse(localStorage.getItem("Containers") || "[{}]")
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

        <div className="py-8">
          <Button
            text={"New Installation"}
            isSecondary={true}
            onClick={() => setPage("Installation")}
          />
        </div>
      </div>
    </>
  );
}
