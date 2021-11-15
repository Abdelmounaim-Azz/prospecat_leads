import ChoosePlan from "../../components/ChoosePlan/ChoosePlan";
import HeaderLogin from "../../components/Header/HeaderLogin";
import {Title} from "../../utils/use-title";
import buildClient from "../../api/build-client";

export default function MonthlyPlan({currentUser}) {
  return (
    <>
      <Title
        title="PROSPECAT - Choose your subscription plan."
        content="Choose your monthly subscription plan and start finding leads for your business."
      />
      <HeaderLogin currentUser={currentUser} />
      <ChoosePlan />
    </>
  );
}
export async function getServerSideProps(context) {
  const client = buildClient(context);
  const {data} = await client.get("/api/users/currentuser");
  if (data.currentUser?.validated === false) {
    return {
      redirect: {
        destination: "/account/unverified-email",
        permanent: false,
      },
    };
  }
  if (!data.currentUser) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...data,
    },
  };
}
