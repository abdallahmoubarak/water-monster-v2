import DateTimePicker from "@/components/atoms/DateTimePicker";
import Layout from "./sLayout";

export default function Cleaner({ setPage }: { setPage: Function }) {
  return (
    <Layout title={"cleaner"} onClick={() => setPage("Containers")}>
      <DateTimePicker service={"Cleaner"} />
    </Layout>
  );
}
