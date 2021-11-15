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
  const arr1 = [
    "View Email",
    "View Email",
    "View Email",
    "View Email",
    "View Email",
    "View Email",
    "View Email",
  ];
  const [show, setShow] = useState(false);
  const [domain, setDomain] = useState("");
  const [emails, setEmails] = useState(null);
  const [result, setResult] = useState(null);
  const [btndata, setBtnData] = useState(null);
  const [buttoncontent, setButtonContent] = useState(arr1);
  const {register, handleSubmit} = useForm({
    mode: "onBlur",
  });
  const handleButtonClick = async (name, domain, index) => {
    try {
      const response = await axios.get(
        `/api/leads/findperson?name=${name}&domain=${domain}`
      );
      setResult(response.data.result);
      let newContent = [
        ...buttoncontent.slice(0, index),
        result.email,
        ...buttoncontent.slice(index + 1),
      ];

      setButtonContent(newContent);
    } catch (error) {
      const newCtn = [
        ...buttoncontent.slice(0, index),
        "View Email",
        ...buttoncontent.slice(index + 1),
      ];
      setButtonContent(newCtn);
    }
  };
  const onSubmit = async (data) => {
    try {
      setBtnData("not empty");
      setDomain(data.domain);
      const response = await axios.get(
        `/api/leads/criteria?jobTitle=${data.jobTitle}&domain=${data.domain}&certification=${data.certification}`
      );
      setEmails(response.data);
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
                <a className="active-lead" href="/leads/criteria">
                  Criteria Search{" "}
                </a>
              </li>
            </ul>
            <h2>Criteria Search</h2>
            <form
              id="finder-form-lead"
              className="finder-form-lead"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="input-group-lead main-input-group-lead">
                <input
                  autoComplete="off"
                  autoFocus="autofocus"
                  className="form-control-lead"
                  id="full-name-field"
                  name="jobTitle"
                  placeholder="nodejs developer"
                  required="required"
                  type="text"
                  ref={register}
                />
                <div className="at-form-lead">@</div>
                <input
                  autoComplete="off"
                  className="form-control-lead"
                  id="domain-field-lead"
                  placeholder="company.com"
                  required="required"
                  type="text"
                  name="domain"
                  ref={register}
                />
              </div>
              <div className="input-group-lead main-input-group-lead mt-4 mb-4">
                <input
                  autoComplete="off"
                  autoFocus="autofocus"
                  className="form-control-lead margin-left-4"
                  id="full-name-field"
                  name="location"
                  placeholder="New York"
                  required="required"
                  type="text"
                  ref={register}
                />
                <div className="at-form-lead">+</div>
                <input
                  autoComplete="off"
                  className="form-control-lead margin-unleft-4"
                  id="domain-field-lead"
                  placeholder="CKAD"
                  required="required"
                  type="text"
                  name="certification"
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
                  Enter your search criteria (for example "I want to look for
                  devops engineers(jobTitle) who work in prospecat.com(domain)
                  from London(location) and have an AWS
                  certification(certification)").
                </div>
                {show &&
                  emails.emails.map((result, index) => (
                    <div
                      key={result.name}
                      className="finder-result-container-lead"
                    >
                      <div className="finder-result-email-lead">
                        <div className="d-flex justify-content-between">
                          <span className="email">Name:{result.name} </span>
                          <span className="email">Job:{result.job} </span>
                          <button
                            onClick={() => {
                              handleButtonClick(result.name, domain, index);
                            }}
                            type="button"
                            className="btn-secondary"
                          >
                            {buttoncontent[index]}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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
