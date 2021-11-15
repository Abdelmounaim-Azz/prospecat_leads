import Link from "next/link";
import {GoogleAuthLogin, GoogleAuthLogout} from "../utils/use-google-auth";
import Image from "next/image";
import axios from "axios";
import Router from "next/router";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {Title} from "../helpers/use-title";
import {reformattedErr} from "../helpers/use-errors";
import Alert from "../components/Alert/Alert";
import {useHasMounted} from "../helpers/use-hasMounted";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {faEye} from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;
import buildClient from "../api/build-client";

const SignIn = () => {
  const [errPassword, setErrPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const {register, handleSubmit} = useForm({});
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown === false);
    setErrPassword("");
    setErrEmail("");
  };

  const onFormSubmit = async (data) => {
    try {
      setErrEmail("");
      setErrPassword("");
      await axios.post("/api/users/signin", data);
      Router.push("/leads/domain");
    } catch (error) {
      const errPassword = reformattedErr(
        error.response.data.errors,
        "password"
      )?.password;
      const errEmail = reformattedErr(
        error.response.data.errors,
        "email"
      )?.email;
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
      <Title title="PROSPECAT - Sign in to ProsPecat." />
      <div className="container">
        <div className="margin-t-40">
          <div className="row justify-content-center">
            <div className="col-xs">
              <div className="rounded-circle d-flex justify-content-center">
                <img
                  src="/img/logo.svg"
                  className="logo-footer"
                  alt="Logo PROSPECAT - B2B Prospecting service"
                />
              </div>
              <div className="text-center">
                <p className="d-flex lead justify-content-center font-weight-normal text-angellist">
                  Sign in to Prospecat
                </p>
                {(errPassword || errEmail) && (
                  <Alert
                    className="alert-danger"
                    content="Incorrect email or password."
                  />
                )}
                <div className="card bg-card card-body">
                  <form
                    onSubmit={handleSubmit(onFormSubmit)}
                    className="form mb-4"
                  >
                    <div className="form-group">
                      <label className={`d-flex flex-row f-w-600 `}>
                        Email
                      </label>
                      <input
                        className={`form-control form-control-sm rounded `}
                        name="email"
                        ref={register}
                      />
                    </div>
                    <div className="form-group">
                      <div className="d-flex justify-content-between">
                        <label className={`f-w-600 `}>Password</label>
                        <Link href="/password_reset">
                          <a className={`link f-w-600`}>
                            <small>Forgot password? </small>
                          </a>
                        </Link>
                      </div>
                      <div className="pass-wrapper">
                        <input
                          type={passwordShown ? "text" : "password"}
                          className={`form-control form-control-sm rounded `}
                          name="password"
                          ref={register}
                        />
                        <i
                          className={`pass-icon
                          }`}
                          onClick={togglePasswordVisiblity}
                        >
                          {passwordShown ? eyeSlash : eye}
                        </i>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn rounded btn-success btn-block"
                    >
                      Sign In <i className={`fas fa-sign-in-alt`}></i>
                    </button>
                  </form>
                  {/* <GoogleAuthLogin text="Sign in with Google" /> */}
                </div>
              </div>

              <div className="card-body">
                <p className="my-1 border border-secondary bg-card card-footer justify-content-center text-secondary">
                  New customer?{" "}
                  <Link href="/signup">
                    <a className="link">Create an account.</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
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
    props: {},
  };
}
