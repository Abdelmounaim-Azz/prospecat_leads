import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {reformattedErr} from "../helpers/use-errors";
import {Title} from "../helpers/use-title";

const PasswordReset = () => {
  const {register, handleSubmit} = useForm({});
  const [data, setData] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  const staticData =
    "That address is not a verified primary email or is not associated with a personal user account.";
  function Alert() {
    const [show, setShow] = useState(true);
    if (show) {
      return (
        <div id="myAlert" className="alert alert-danger" role="alert">
          {staticData.substring(0, 38)}
          <br />
          {staticData.substring(38, 81)}
          <br />
          {staticData.substring(81)}
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
        <div>
          <Title title="Forgot your password?  ¤ Prospecat" />
          <div className="card bg-card mb-3">
            <div className="card-body">
              <p className="card-text f-w-600  text-home ">
                Enter your user account's verified email
                <br /> address and we will send you a password
                <br />
                <span>reset link.</span>
              </p>
              <form onSubmit={handleSubmit(onFormSubmit)} className="form mb-4">
                <div className="form-group">
                  <input
                    className={`form-control rounded form-control-sm `}
                    placeholder="Enter your email adress"
                    name="email"
                    ref={register}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-sm rounded btn-success btn-block"
                >
                  {data === ""
                    ? "Send password reset email"
                    : "Sending email..."}
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Title title="Email Sent!  ¤ Sahafrica" />
          <div className="card bg-card mb-3">
            <div className="card-body">
              <p className="card-text f-w-600 text-home ">
                Check your email for a link to reset your
                <br />
                password. If it doesn’t appear within a few
                <br />
                minutes, check your spam folder.
              </p>
              <Link href="/signin" passHref>
                <button className="btn btn-sm mt-3 rounded btn-info text-light btn-block font-weight-bold">
                  <i className="fas text-black fa-arrow-circle-left"></i> Return
                  to sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
  const onFormSubmit = async (data) => {
    try {
      const res = axios.post(
        "/api/users/forgotpassword",
        data
      );
      console.log(res);
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
      <div className="container">
        <div className="margin-top-20">
          <div className="row justify-content-center">
            <div className="col-xs">
              <div className="rounded-circle d-flex justify-content-center">
                <img
                  src="img/logo.svg"
                  className="logo-footer"
                  alt="Logo PROSPECAT - B2B Prospecting service"
                />
              </div>
              <div className=" text-center">
                <p className="d-flex text-angellist lead justify-content-center font-weight-normal">
                  Reset your password
                </p>
                {errEmail && !isSubmitted && <Alert />}
              </div>
              <BeforeAfterSubmit />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
