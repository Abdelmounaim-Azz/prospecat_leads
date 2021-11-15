import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useState} from "react";
import * as yup from "yup";
import {Title} from "../helpers/use-title";
import {yupResolver} from "@hookform/resolvers/yup";
import {reformattedErr} from "../helpers/use-errors";
import {useHasMounted} from "../helpers/use-hasMounted";
import {useRouter} from "next/router";
import buildClient from "../api/build-client";
const SignUp = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Username can't be blank.")
      .min(3, "Minimum is 3 characters."),
    email: yup
      .string()
      .required("Email is Required.")
      .email("Email must be valid."),
    password: yup
      .string()
      .required("You need to provide a password.")
      .min(8, "Password is too short (minimum is 8 characters).")
      .matches(/^(?=.*[a-zA-Z])/g, "Password needs at least 1 letter.")
      .matches(/^(?=.*\d)/g, "Password needs at least 1 number."),
  });
  const [errName, setErrName] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [onClick, setOnClick] = useState(false);
  const {register, handleSubmit, errors} = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      setOnClick(true);
      setErrName("");
      setErrEmail("");
      setErrPassword("");
      await axios.post("/api/users/signup", data);
      router.push("/");
    } catch (error) {
      const errName = reformattedErr(error.response.data.errors, "name")?.name;
      const errPassword = reformattedErr(
        error.response.data.errors,
        "password"
      )?.password;
      const errEmail = reformattedErr(
        error.response.data.errors,
        "email"
      )?.email;
      setErrName(errName);
      setErrEmail(errEmail);
      setErrPassword(errPassword);
    }
  };
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <Title title="PROSPECAT - Sign up to ProsPecat." />
      <h3>
        Sign up is not enabled intentially.We will enable it when we finish from
        the testing phase.YOU SHALL NOT PASS FOR THE MOMENT.
      </h3>
    </>
  );
};
export default SignUp;
// export async function getServerSideProps(context) {
  // const client = buildClient(context);
  // const {data} = await client.get("/api/users/currentuser");
  // if (data.currentUser?.validated === false) {
  //   return {
  //     redirect: {
  //       destination: "/account/unverified-email",
  //       permanent: false,
  //     },
  //   };
  // }
  // if (data.currentUser?.validated === true) {
  //   return {
  //     redirect: {
  //       destination: "/leads/domain",
  //       permanent: false,
  //     },
  //   };
  // }
  // return {
  //   props: {},
  // };
// }
