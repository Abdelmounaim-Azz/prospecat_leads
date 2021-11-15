import axios from "axios";
import buildClient from "../api/build-client";

const Success = () => {
  return <div></div>;
};
export default Success;
export async function getServerSideProps(context) {
  const {session_id} = context.query;
  const client = buildClient(context);

  const {data} = await client.post("/api/payments/success", {
    sessionId: session_id,
  });
  const res = await client.post("/api/payments/customer-portal", {
    customerId: data.customer.id,
  });
  return {
    redirect: {
      destination: res.data?.url,
      permanent: false,
    },
  };
}
