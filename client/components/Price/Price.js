import Link from "next/link";
import {useState} from "react";

export default function PricePlan() {
  const [plan, setPlan] = useState("Free Plan");
  const [credits, setCredits] = useState("100");
  const [maxPerSearch, setMaxPerSearch] = useState(10);
  const [unlimitedCSV, setUnlimitedCSV] = useState(false);
  const onInputClick = (plan, credits, maxsearch, csv) => {
    setPlan(plan);
    setCredits(credits);
    setMaxPerSearch(maxsearch);
    setUnlimitedCSV(csv);
  };
  return (
    <section className="pricing-plan" id="pricing">
      <div className="container">
        <div className="text-center">
          <h2 className="main-heading">Pricing Plan</h2>
          <div className="bottom-line"></div>
          <p className="main-heading-para">
            We offer multiple pricing models that fits every business size.
          </p>
        </div>
        <div className="pricing-plan-container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="plan-left">
                <h4 className="text-center">{plan}</h4>
                <ul className="list-unstyled">
                  <li>
                    <h5 className="option">credits</h5>
                    <h5 className="value">{credits}</h5>
                  </li>
                  <li>
                    <h5 className="option">Email Search</h5>
                    <h5 className="value">5 credits</h5>
                  </li>
                  <li>
                    <h5 className="option">Leads Search</h5>
                    <h5 className="value">1 credit</h5>
                  </li>
                  <li>
                    <h5 className="option">Maximum Leads Per Search</h5>
                    <h5 className="value">{maxPerSearch} </h5>
                  </li>
                  <li>
                    <h5 className="option">Unlimited CSV IMPORT/EXPORT</h5>
                    {unlimitedCSV ? (
                      <div className="heavy-check">&#10004;</div>
                    ) : (
                      <div className="cross-x">&#10060;</div>
                    )}
                  </li>
                </ul>
                <div className="text-center">
                  <a href="/signup" className="btn-main btn-green">
                    Start Prospecting NOW
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="plan-right">
                <div className="main-check-listing">
                  <ul className="list-unstyled">
                    <li className="mb-4">
                      <input
                        type="radio"
                        name="pack"
                        onClick={() => {
                          onInputClick("Free Plan", 100, 10, false);
                        }}
                        checked={plan === "Free Plan"}
                      />
                      <div className="main-check">
                        <div className="row align-items-center">
                          <div className="col-8">
                            <span className="main-radio">
                              <span></span>
                            </span>
                            <h4 className="price-model">Free Plan</h4>
                          </div>
                          <div className="col-4">
                            <h4 className="price">
                              0$ <span>Per month</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="mb-4">
                      <input
                        type="radio"
                        name="pack"
                        onClick={() => {
                          onInputClick("Starter Plan", 1000, 50, true);
                        }}
                        checked={plan === "Starter Plan"}
                      />
                      <div className="main-check">
                        <div className="row align-items-center">
                          <div className="col-8">
                            <span className="main-radio">
                              <span></span>
                            </span>
                            <h4 className="price-model">Starter Plan</h4>
                          </div>
                          <div className="col-4">
                            <h4 className="price">
                              19$ <span>Per month</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="mb-4">
                      <input
                        type="radio"
                        name="pack"
                        onClick={() => {
                          onInputClick("Growth Plan", 2500, 100, true);
                        }}
                        checked={plan === "Growth Plan"}
                      />
                      <div className="main-check">
                        <div className="row align-items-center">
                          <div className="col-8">
                            <span className="main-radio">
                              <span></span>
                            </span>
                            <h4 className="price-model">Growth Plan</h4>
                          </div>
                          <div className="col-4">
                            <h4 className="price">
                              39$ <span>Per month</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="mb-4">
                      <input
                        type="radio"
                        name="pack"
                        onClick={() => {
                          onInputClick("Pro Plan", 10000, "Unlimited", true);
                        }}
                        checked={plan === "Pro Plan"}
                      />
                      <div className="main-check">
                        <div className="row align-items-center">
                          <div className="col-8">
                            <span className="main-radio">
                              <span></span>
                            </span>
                            <h4 className="price-model">Pro Plan</h4>
                          </div>
                          <div className="col-4">
                            <h4 className="price">
                              99$ <span>Per month</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
