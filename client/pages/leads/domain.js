import HeaderLogin from "../../components/Header/HeaderLogin";
import {Title} from "../../helpers/use-title";
import axios from "axios";
import {useRouter} from "next/router";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import buildClient from "../../helpers/build-client";

function LeadsHome({currentUser}) {
  const [emails, setEmails] = useState(null);
  const [company, setCompany] = useState(null);
  const [show, setShow] = useState(false);
  const [btndata, setBtnData] = useState(null);
  const {register, handleSubmit} = useForm({
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    try {
      setBtnData("not empty");
      const company = data.company.split(",")[0];
      const country = data.company.split(",")[1];

      const response = await axios.get(
        `/api/leads/company_email?domain=${company}&country=${country}`
      );
      setCompany(company);
      setEmails(response.data.result);
      setShow(true);
      setBtnData(null);
    } catch (error) {
      setShow(false);
      setBtnData(null);
    }
  };
  return (
    <div className="bg-light">
      <Title title="Prospecat: Find Leads Now" />
      <HeaderLogin currentUser={currentUser} />
      <div className="container-pp ">
        <div className="homepage-header">
          <h1>
            Get in touch with people directly.
            <div className="subtitle">
              Prospecat helps you find professional verified emails and lets you
              search for leads associated with a domain name.
            </div>
          </h1>
        </div>
        <div id="domain-search-form-container">
          <form id="domain-search-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group-pp d-flex">
              <input
                id="domain-field"
                className="form-control-pp"
                placeholder="company.com,country"
                required="required"
                type="text"
                name="company"
                required="required"
                autoComplete="off"
                ref={register}
                aria-describedby="companyErr"
              />
              <span className="input-group-btn-pp">
                <button id="search-btn" className="btn-blue" type="submit">
                  <span>
                    {`${btndata === null ? "Find emails" : "Searching ..."}`}
                  </span>
                </button>
              </span>
            </div>

            {show && (
              <div className="result-information">
                <div className="results-number">
                  {emails.emails_number} email adresses.
                </div>
                <div className="results-pattern">
                  <span className="hidden-xs">Most Common Pattern:</span>
                  <strong>
                    <span
                      data-toggle="tooltip"
                      data-placement="top"
                      title=""
                      data-original-title="First name initial"
                    >
                      {emails.pattern}
                    </span>
                    @{company}
                  </strong>
                </div>
              </div>
            )}

            <div className="">
              <div className="search-results" style={{display: "block"}}>
                <div className="d-flex justify-content-between">
                  <div className="">
                    {show &&
                      emails.emails.map((result) => (
                        <>
                          <div key={result.email} className="result">
                            <span className="email">{result.email}</span>
                            <div
                              className="verified-icon fas fa-shield-check"
                              data-placement="top"
                              data-toggle="tooltip"
                              title=""
                              data-original-title="Verified"
                            ></div>
                          </div>
                        </>
                      ))}
                  </div>
                  <div className="">
                    {show &&
                      emails.emails.map((res) => (
                        <>
                          <div key={res.job} className="result">
                            <span className="email">Info: {res.job}</span>
                          </div>
                        </>
                      ))}
                  </div>
                </div>
                {show && (
                  <div>
                    <Link href="/leads/person">
                      <a id="more_results" className="grey">
                        Find person email by name.
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="light-grey before-search-message">
              <p className="before-search-para">
                enter a domain name,county to launch the search.For example,
                <a className="try-domain">prospecat.com,Morocco</a>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LeadsHome;
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
