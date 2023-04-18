import Layout from "./sLayout";

export default function Plumber({ setPage }: { setPage: Function }) {
  return (
    <Layout title={"Plumber"} onClick={() => setPage("Containers")}>
      <div>Comming Soon ...</div>
    </Layout>
  );
}
