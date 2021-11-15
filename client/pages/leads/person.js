import Link from "next/link";
import HeaderLogin from "../../components/Header/HeaderLogin";
import {Title} from "../../helpers/use-title";
import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import buildClient from "../../helpers/build-client";

import {useForm} from "react-hook-form";
// import * as yup from "yup";
// import {yupResolver} from "@hookform/resolvers/yup";
// import {GoogleAuthLogin, GoogleAuthLogout} from "../../utils/use-google-auth";

function LeadPerson({currentUser}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [show, setShow] = useState(false);
  const [btndata, setBtnData] = useState(null);
  const {register, handleSubmit} = useForm({
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    try {
      setBtnData("not empty");
      const response = await axios.get(
        `/api/leads/findperson?name=${data.name}&domain=${data.domain}`
      );
      setEmail(response.data.result.email);
      setName(response.data.result.name);
      setAvatar(response.data.result.avatar);
      setDomain(response.data.result.domain);
      setShow(true);
      setBtnData(null);
    } catch (error) {
      setShow(false);
      setBtnData(null);
    }
  };
  return (
    <div className="bg-light ">
      <Title title="Prospecat: Find Leads Now" />
      <HeaderLogin currentUser={currentUser} />
      <div className="dashboard-body-lead">
        <div className="container-lead">
          <div
            className="board-box-lead"
            data-controller="onboarding-popovers"
            data-onboarding-popovers-id-value="email-finder"
          >
            <ul className="box-submenu-lead">
              <li>
                <a className="active-lead" href="/leads/person">
                  Email Finder{" "}
                </a>
              </li>
            </ul>
            <h2>Email Finder</h2>
            <form
              id="finder-form-lead"
              className="finder-form-lead"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="input-group-lead main-input-group-lead">
                <input
                  autocomplete="off"
                  autofocus="autofocus"
                  className="form-control-lead"
                  id="full-name-field"
                  name="name"
                  placeholder="John Doe"
                  required="required"
                  type="text"
                  ref={register}
                />
                <div className="at-form-lead">@</div>
                <input
                  autocomplete="off"
                  className="form-control-lead"
                  id="domain-field-lead"
                  placeholder="company.com"
                  required="required"
                  type="text"
                  name="domain"
                  ref={register}
                />
                <span className="input-group-btn-lead">
                  <button
                    className="btn-white-lead"
                    data-loading="none"
                    id="finder-btn"
                    type="submit"
                  >
                    {btndata === null ? (
                      <div className="far fa-search"></div>
                    ) : (
                      <img src="/img/search-spinner.gif" className="spinner" />
                    )}
                  </button>
                </span>
              </div>
              <div className="finder-result-lead">
                <div className="finder-message-lead">
                  Enter a full name and the domain name of the email address
                  (for example "prospecat.com").
                </div>
                {show && (
                  <div className="finder-result-container-lead">
                    <div className="finder-result-email-lead">
                      <div className="email-container-lead">
                        <div className="email-lead">{email}</div>
                        <div
                          className="score high-score"
                          data-placement="top"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="Confidence score: 90%"
                        ></div>
                      </div>
                    </div>
                    <div className="finder-result-profile-lead">
                      <div className="finder-result-pic-lead">
                        <img src={avatar} style={{opacity: 1}} />
                      </div>
                      <h3>{name}</h3>
                      <div className="finder-result-title-lead">{domain}</div>
                    </div>
                    <div className="finder-accept-all">
                      The email address is verified.100% accuracy.
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadPerson;
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
