import Layout from "./sLayout";

export default function WaterProvider({ setPage }: { setPage: Function }) {
  return (
    <Layout title={"Water Provider"} onClick={() => setPage("Containers")}>
      <div>This service is for ...</div>
    </Layout>
  );
}
