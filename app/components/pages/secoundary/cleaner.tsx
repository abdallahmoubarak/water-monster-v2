import Layout from "./sLayout";

export default function Cleaner({ setPage }: { setPage: Function }) {
  return (
    <Layout title={"Cleaner"} onClick={() => setPage("Containers")}>
      <div>This service is for ...</div>
    </Layout>
  );
}
