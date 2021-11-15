import Footer from "../../components/Footer/Footer";
import HeaderLogin from "../../components/Header/HeaderLogin";
import {Title} from "../../helpers/use-title";
import {Redirect} from "../../helpers/use-redirect";
import {reformattedErr} from "../../helpers/use-errors";
import Alert from "../../components/Layout/Alert";
import {useState} from "react";
import buildClient from "../../helpers/build-client";

import axios from "axios";
const UnverifiedEmail = ({currentUser}) => {
  const [emailRes, setEmailRes] = useState(null);
  const [data, setData] = useState(null);

  const onClick = async () => {
    try {
      setEmailRes(null);
      setData("not empty");
      const {data} = await axios.post("/api/users/resend-email");
      setData(null);
      setEmailRes(data.message);
    } catch (error) {
      setData(null);
      const errEmail = reformattedErr(
        error.response.data.errors,
        "email"
      )?.email;
      setEmailRes(errEmail);
    }
  };
  return currentUser.validated === false ? (
    <>
      <Title title="Please Verify Your Email Adress - Prospecat" />
      <HeaderLogin currentUser={currentUser} />
      <div className="container mt-4">
        <div className="margin-top-20 mt-4">
          <div className="row justify-content-center mt-4">
            <div className="col-xs mt-4">
              <div className="text-center mt-4">
                {emailRes && (
                  <Alert
                    content={emailRes}
                    className="alert-info text-center"
                  />
                )}
                <h3>Please verify your email address.</h3>
                <p className="text-muted lead text-center">
                  Before you can use Prospecat services,we need you to verify
                  your email address.
                  <br />
                  An email containing verification instructions was sent to{" "}
                  <span className="font-weight-bolder">
                    {currentUser?.email}
                  </span>
                </p>
                <input
                  type="button"
                  value={`${
                    data === null
                      ? "Resend Verification Email"
                      : "Resending email..."
                  }`}
                  className="btn text-center btn-sm btn-outline-info font-weight-bold mr-2"
                  onClick={onClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/leads" />
  );
};
export async function getServerSideProps(context) {
  const client = buildClient(context);
  const {data} = await client.get("/api/users/currentuser");
  if (!data.currentUser) {
    return {
      redirect: {
        destination: "/",
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
export default UnverifiedEmail;
