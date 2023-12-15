import Box from "@/components/atoms/Box";
import DotsDropDown from "@/components/atoms/DotsDropDown";
import { useUserContainers } from "@/hooks/useContainer";

export default function ViewerSettings({
  currentContainer,
}: {
  currentContainer: any;
}) {
  return (
    <>
      <Box title="Viewers">
        {currentContainer?.viewer?.map((user: any, i: number) => (
          <div key={i} className="flex justify-between">
            <div>{user?.email}</div>
            <DotsDropDown />
          </div>
        ))}
        {currentContainer?.viewer?.length === 0 && (
          <>
            <div className="text-gray-400">No Viewers</div>
            <div className="text-gray-400">
              If you want to add a viewer they must scan the qr code bellow
            </div>
          </>
        )}
      </Box>
    </>
  );
}
