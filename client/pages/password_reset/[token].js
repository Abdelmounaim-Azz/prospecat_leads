import axios from "axios";
import Router from "next/router";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {reformattedErr} from "../../helpers/use-errors";
import {Title} from "../../helpers/use-title";
import buildClient from "../../helpers/build-client";

const ResetPassword = ({userName, token}) => {
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("You need to provide a password")
      .min(8, "Password is too short (minimum is 8 characters)")
      .matches(/^(?=.*[a-zA-Z])/g, "Password needs at least 1 letter")
      .matches(/^(?=.*\d)/g, "Password needs at least 1 number"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password is required"),
  });
  const [errPassword, setErrPassword] = useState("");
  const onFormSubmit = async (data) => {
    try {
      await axios.put(`/api/users/password_reset/${query.token}`, data);
      Router.push("/signin");
    } catch (error) {
      const errPassword = reformattedErr(
        error.response.data.errors,
        "password"
      )?.password;
      setErrPassword(errPassword);
    }
  };
  function ChangePassword() {
    const [errPassword, setErrPassword] = useState("");

    const {register, handleSubmit, errors} = useForm({
      mode: "onBlur",
      resolver: yupResolver(schema),
    });
    return (
      <div>
        <Title title="Change your password  ¤  Prospecat" />
        <div className="container">
          <div className="margin-top-20">
            <div class="row justify-content-center">
              <div class="col-xs">
                <div className="rounded-circle d-flex justify-content-center"></div>
                <div className="text-center">
                  <p className="d-flex lead justify-content-center font-weight-normal">
                    Change password for
                    <br />@{userName}
                  </p>
                  <div
                    className="card  bg-light card-body"
                    style={{width: "20rem"}}
                  >
                    <form
                      onSubmit={handleSubmit(onFormSubmit)}
                      className="form mb-4"
                    >
                      <div className="form-group">
                        <label className="d-flex font-weight-bold">
                          New password
                        </label>
                        <input
                          type={"password"}
                          className={`form-control form-control-sm rounded  ${
                            !!errors.password ? "is-invalid" : ""
                          } ${errPassword ? "is-invalid" : ""}`}
                          name="password"
                          ref={register}
                          error={!!errors.password}
                          aria-describedby="passwordErr"
                        />
                        <small id="passwordErr" class="invalid-feedback">
                          {errors?.password?.message}
                        </small>
                        <small id="nameErr" class="invalid-feedback">
                          {errPassword}
                        </small>
                      </div>
                      <div className="form-group">
                        <label className="d-flex font-weight-bold">
                          Confirm password
                        </label>
                        <input
                          type={"password"}
                          className={`form-control form-control-sm rounded  ${
                            !!errors.confirmPassword ? "is-invalid" : ""
                          } ${errPassword ? "is-invalid" : ""}`}
                          name="confirmPassword"
                          ref={register}
                          error={!!errors.confirmPassword}
                          aria-describedby="passwordErr"
                        />
                        <small id="passwordErr" class="invalid-feedback">
                          {errors?.confirmPassword?.message}
                        </small>
                      </div>
                      <small className="form-text text-left text-muted">
                        Make sure it's at least at least 8 characters
                        <br />
                        including a number and a lowercase letter.
                      </small>
                      <input
                        type="submit"
                        value="Change password"
                        className="btn mt-4 btn-info  rounded btn-block"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ChangePassword />;
};

export default ResetPassword;
export async function getServerSideProps(context) {
  const {token} = context.query;
  const client = buildClient(context);
  try {
    const {data} = await client.get(`/api/users/validate_token/${token}`);
    return {props: {...data, token}};
  } catch (error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
