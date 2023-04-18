import Layout from "./sLayout";

export default function Cleaner({ setPage }: { setPage: Function }) {
  return (
    <Layout title={"Cleaner"} onClick={() => setPage("Containers")}>
      <div>Comming Soon ...</div>
    </Layout>
  );
}
