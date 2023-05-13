import DateTimePicker from "@/components/DateTimePicker";
import Layout from "./sLayout";

export default function WaterProvider({ setPage }: { setPage: Function }) {
  return (
    <Layout title={"Water Provider"} onClick={() => setPage("Containers")}>
      <DateTimePicker service={"water provider"} />
    </Layout>
  );
}
