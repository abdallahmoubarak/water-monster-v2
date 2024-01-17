import Box from "@/components/atoms/Box";
import DotsDropDown from "@/components/atoms/DotsDropDown";

export default function ViewerSettings({
  currentContainer,
  setPage,
  setAlertMsg,
}: {
  currentContainer: any;
  setPage: Function;
  setAlertMsg: Function;
}) {
  return (
    <>
      <Box title="Viewers">
        {currentContainer?.viewer?.map((user: any, i: number) => (
          <div key={i} className="flex justify-between gap-4">
            <div>{user?.email}</div>
            <DotsDropDown
              currentContainer={currentContainer}
              viewer={user}
              setPage={setPage}
              setAlertMsg={setAlertMsg}
            />
          </div>
        ))}
        {currentContainer?.viewer?.length === 0 && (
          <>
            <div className="text-gray-400">No Viewers</div>
            <div className="text-gray-400">
              If you want to add a viewer they must scan the qr code below
            </div>
          </>
        )}
      </Box>
    </>
  );
}
