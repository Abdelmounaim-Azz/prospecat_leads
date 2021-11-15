import Head from "next/head";
import {Title} from "../utils/use-title";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import Features from "../components/Features/Features";
import Price from "../components/Price/Price";
import Footer from "../components/Footer/Footer";
import buildClient from "../api/build-client";

export default function Home({currentUser}) {
  return (
    <>
      <Title
        title="PROSPECAT - Find leads for your business instantly."
        content="Prospecat is a platform to find verified email addresses and build a quality Data for your sales funnel.Start using Prespecat to reach your customers directly."
      />
      <Header />
      <Banner />
      <Features />
      <Price />
      <Footer currentUser={currentUser} />
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
  if (data.currentUser?.validated === true) {
    return {
      redirect: {
        destination: "/leads/domain",
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
