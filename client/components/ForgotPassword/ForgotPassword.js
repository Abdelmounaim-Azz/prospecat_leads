import Link from "next/link";
import Image from "next/image";
import {Title} from "../../helpers/use-title";
import {useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import CheckLink from "../CheckLink/CheckLink";
import {reformattedErr} from "../../helpers/use-errors";

const ForgotPassword = () => {
  const StaticErrorEmail =
    "That address is not a verified primary email or is not associated with a personal user account.";
  const {register, handleSubmit} = useForm({});
  const [data, setData] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  function Alert() {
    const [show, setShow] = useState(true);
    if (show) {
      return (
        <div id="myAlert" className="alert alert-danger" role="alert">
          {StaticErrorEmail.substring(0, 38)}
          <br />
          {StaticErrorEmail.substring(38, 81)}
          <br />
          {StaticErrorEmail.substring(81)}
          <button
            onClick={() => setShow(false)}
            type="button"
            className="close"
          >
            <span>
              <i
                className="fas fa-times fa-xs"
                data-fa-transform="shrink-4"
              ></i>
            </span>
          </button>
        </div>
      );
    }
    return null;
  }
  function BeforeAfterSubmit() {
    if (isSubmitted === false) {
      return (
        <>
          <Title title="PROSPECAT - Reset your password." />
          <div>
            <h2 className="text-center">Reset Your Password</h2>
            <div className="rounded-circle d-flex justify-content-center">
              <img
                src="img/logo.svg"
                className="logo-footer"
                alt="Logo PROSPECAT - B2B Prospecting service"
              />
            </div>
            {errEmail && <Alert />}
            <form
              className="login-page-form"
              onSubmit={handleSubmit(onFormSubmit)}
            >
              <p className="text-center lead">
                Enter your user account's email address and we will send you{" "}
                <br /> a password reset link.
              </p>
              <input type="text" className="form-login-input" />
              <input
                type="submit"
                className="form-login-btn"
                value={`${
                  data === ""
                    ? "Send password reset email "
                    : "sending email..."
                }`}
                name="email"
                ref={register}
              />
            </form>
          </div>
        </>
      );
    } else {
      return (
        <>
          <CheckLink />
        </>
      );
    }
  }
  const onFormSubmit = async (data) => {
    try {
      const res = axios.post("/api/users/forgotpassword", data);
      setData(res);
      await res;
      setSubmitted(true);
    } catch (error) {
      console.log(error);
      setData("");

      const errEmail = reformattedErr(
        error.response.data.errors,
        "email"
      )?.email;
      setErrEmail(errEmail);
    }
  };
  return (
    <>
      <BeforeAfterSubmit />
    </>
  );
};
export default ForgotPassword;
