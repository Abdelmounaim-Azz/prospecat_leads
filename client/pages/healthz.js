const Healthz = () => {};
export default Healthz;
export async function getServerSideProps(context) {
  context.res.end("Status Up");
  return {props: {}};
}
