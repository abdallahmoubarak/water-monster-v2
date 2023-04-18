import Layout from "./sLayout";

export default function WaterProvider({ setPage }: { setPage: Function }) {
  return (
    <Layout title={"Water Provider"} onClick={() => setPage("Containers")}>
      <div>Comming Soon ...</div>
    </Layout>
  );
}
