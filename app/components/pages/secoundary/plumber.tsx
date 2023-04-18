import Layout from "./sLayout";

export default function Plumber({ setPage }: { setPage: Function }) {
  return (
    <Layout title={"Plumber"} onClick={() => setPage("Containers")}>
      <div>This service is for ...</div>
    </Layout>
  );
}
