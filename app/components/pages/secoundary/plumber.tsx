import Layout from "./sLayout";
import DateTimePicker from "@/components/DateTimePicker";

export default function Plumber({ setPage }: { setPage: Function }) {
  return (
    <Layout title={"Plumber"} onClick={() => setPage("Containers")}>
      <DateTimePicker />
    </Layout>
  );
}
