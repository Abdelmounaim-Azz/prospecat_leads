import buildClient from "../../../helpers/build-client";
import {Redirect} from "../../../helpers/use-redirect";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

import axios from "axios";

const verifyEmail = ({uservalidated}) => {
  if (uservalidated) {
    const logout = async () => await axios.post("/api/users/signout");
    useEffect(() => {
      logout();
    }, []);
    return <Redirect to="/signin" />;
  }
  return <Redirect to="/account/unverified-email" />;
};
export default verifyEmail;
export async function getServerSideProps(context) {
  const {emailCode} = context.query;
  const client = buildClient(context);
  const {data} = await client.post(
    `/api/users/verification/verify-account/${emailCode}`
  );

  return {props: {...data}};
}
