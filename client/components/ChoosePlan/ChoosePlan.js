import {useState} from "react";
import axios from "axios";
import {Stripe, loadStripe} from "@stripe/stripe-js";

const ChoosePlan = () => {
  const handleBasicClick = async (e) => {
    try {
      const {data} = await axios.get("/api/payments/config");
      const stripe = await loadStripe(data.publishableKey);
      const res = await axios.post("/api/payments/create-checkout-session", {
        priceId: data.basicPrice,
      });
      stripe.redirectToCheckout({
        sessionId: res.data.sessionId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePremiumClick = async (e) => {
    try {
      const {data} = await axios.get("/api/payments/config");
      const stripe = await loadStripe(data.publishableKey);
      const res = await axios.post("/api/payments/create-checkout-session", {
        priceId: data.premiumPrice,
      });
      stripe.redirectToCheckout({
        sessionId: res.data.sessionId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleProClick = async (e) => {
    try {
      const {data} = await axios.get("/api/payments/config");
      const stripe = await loadStripe(data.publishableKey);
      const res = await axios.post("/api/payments/create-checkout-session", {
        priceId: data.proPrice,
      });
      stripe.redirectToCheckout({
        sessionId: res.data.sessionId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mb-3">
        <h1 className="text-center section-4-heading">Subscribe to a plan</h1>
        <div class="bRCJYY ">
          <div class="fyDBrO erXztQ container-price-plan">
            <div class="erXztQ jObgKD">
              <div
                class="QETzq jObgKD bRCJYY"
                direction="column"
                color="#600DFF"
              >
                <div class="ipMqpO">
                  <div class="ikrm96">
                    <img src="/img/image.svg" class="price-model-img-top" />
                  </div>
                </div>
                <div direction="column" class="bRCJYY">
                  <div direction="column" class="bRCJYY yNEap">
                    <div class="header-title hFPKtd">FREE</div>
                    <div class="kCTWXR header-subtitle">
                      Essential to generate urgent leads
                    </div>
                  </div>
                  <div class="dVWzzy bRCJYY">
                    <div class="cwCJJc erXztQ">
                      <div class="price-value etVJAp">
                        $0
                        <span class="mvwCl">/mo</span>
                      </div>
                    </div>
                    <div class="hPzTHP">
                      <div class="hoJPPZ">100 Credits Monthly</div>
                      <div class="hoJPPZ">1 user</div>
                    </div>
                  </div>
                  <a class="eHuhJA btn-price-plan-new" href="/signup">
                    Get Started
                  </a>
                  <hr class="hNDTnm" />
                  <div class="bRCJYY kHQzpT">
                    <div class="hoJPPZ">What's Included:</div>
                    <div class="bRCJYY kpXRIZ">
                      <div class="section-title">
                        <div class="bWCeYo">Data Enrichment</div>
                      </div>
                      <div class="fErTBS erXztQ">
                        <div class="jPWqco">
                          <svg
                            width="14px"
                            height="14px"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            alt="feature"
                          >
                            <path
                              d="M5.222 11.925L2.251 8.931a.864.864 0 010-1.218.853.853 0 011.21 0l2.471 2.483 5.9-5.944a.851.851 0 011.204-.005l.006.007a.87.87 0 01-.002 1.224l-6.398 6.447a1 1 0 01-1.42 0z"
                              fill="#702CF4"
                            ></path>
                          </svg>
                        </div>
                        <div class="hoJPPZ">Verified Emails</div>
                      </div>
                      <div class="fErTBS erXztQ">
                        <div class="jPWqco">
                          <svg
                            width="14px"
                            height="14px"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            alt="feature"
                          >
                            <path
                              d="M5.222 11.925L2.251 8.931a.864.864 0 010-1.218.853.853 0 011.21 0l2.471 2.483 5.9-5.944a.851.851 0 011.204-.005l.006.007a.87.87 0 01-.002 1.224l-6.398 6.447a1 1 0 01-1.42 0z"
                              fill="#702CF4"
                            ></path>
                          </svg>
                        </div>
                        <div class="hoJPPZ">Find Leads by search criteria</div>
                      </div>
                      <div class="fErTBS erXztQ">
                        <div class="jPWqco">
                          <svg
                            width="14px"
                            height="14px"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            alt="feature"
                          >
                            <path
                              d="M5.222 11.925L2.251 8.931a.864.864 0 010-1.218.853.853 0 011.21 0l2.471 2.483 5.9-5.944a.851.851 0 011.204-.005l.006.007a.87.87 0 01-.002 1.224l-6.398 6.447a1 1 0 01-1.42 0z"
                              fill="#702CF4"
                            ></path>
                          </svg>
                        </div>
                        <div class="hoJPPZ">Find Leads by domain name</div>
                      </div>
                    </div>
                    <div class="fErTBS erXztQ">
                      <div class="jPWqco">
                        <svg
                          width="14px"
                          height="14px"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          alt="feature"
                        >
                          <path
                            d="M5.222 11.925L2.251 8.931a.864.864 0 010-1.218.853.853 0 011.21 0l2.471 2.483 5.9-5.944a.851.851 0 011.204-.005l.006.007a.87.87 0 01-.002 1.224l-6.398 6.447a1 1 0 01-1.42 0z"
                            fill="#702CF4"
                          ></path>
                        </svg>
                      </div>
                      <div class="hoJPPZ">Find Emails by name/domain</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="erXztQ jObgKD">
              <div
                class="QETzq jObgKD bRCJYY"
                direction="column"
                color="#600DFF"
              >
                <div class="ipMqpO">
                  <div class="ikrm96">
                    <img src="/img/image-2.svg" class="price-model-img-top" />
                  </div>
                </div>
                <div direction="column" class="bRCJYY">
                  <div direction="column" class="bRCJYY yNEap">
                    <div class="header-title hFPKtd">STARTER</div>
                    <div class="kCTWXR header-subtitle">
                      Generate more leads
                    </div>
                  </div>
                  <div class="dVWzzy bRCJYY">
                    <div class="cwCJJc erXztQ">
                      <div class="price-value etVJAp">
                        $19
                        <span class="mvwCl">/mo</span>
                      </div>
                    </div>
                    <div class="hPzTHP">
                      <div class="hoJPPZ">1000 Credits Monthly</div>
                      <div class="hoJPPZ">1 user</div>
                    </div>
                  </div>
                  <button
                    class="eHuhJA btn-price-plan-new"
                    onClick={handleBasicClick}
                  >
                    Choose Plan
                  </button>
                  <hr class="hNDTnm" />
                  <div class="bRCJYY kHQzpT">
                    <div class="hoJPPZ">Everything in FREE, plus:</div>
                    <div class="bRCJYY kpXRIZ">
                      <div class="section-title">
                        <div class="bWCeYo">Data Enrichment</div>
                      </div>
                      <div class="fErTBS erXztQ">
                        <div class="jPWqco">
                          <svg
                            width="14px"
                            height="14px"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            alt="feature"
                          >
                            <path
                              d="M5.222 11.925L2.251 8.931a.864.864 0 010-1.218.853.853 0 011.21 0l2.471 2.483 5.9-5.944a.851.851 0 011.204-.005l.006.007a.87.87 0 01-.002 1.224l-6.398 6.447a1 1 0 01-1.42 0z"
                              fill="#702CF4"
                            ></path>
                          </svg>
                        </div>
                        <div class="hoJPPZ">50 max search/leads</div>
                      </div>
                      <div class="fErTBS erXztQ">
                        <div class="jPWqco">
                          <svg
                            width="14px"
                            height="14px"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            alt="feature"
                          >
                            <path
                              d="M5.222 11.925L2.251 8.931a.864.864 0 010-1.218.853.853 0 011.21 0l2.471 2.483 5.9-5.944a.851.851 0 011.204-.005l.006.007a.87.87 0 01-.002 1.224l-6.398 6.447a1 1 0 01-1.42 0z"
                              fill="#702CF4"
                            ></path>
                          </svg>
                        </div>
                        <div class="hoJPPZ">
                          Email Accuracy(find email by name/domain):100%
                        </div>
                      </div>
                      <div class="fErTBS erXztQ">
                        <div class="jPWqco">
                          <svg
                            width="14px"
                            height="14px"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            alt="feature"
                          >
                            <path
                              d="M5.222 11.925L2.251 8.931a.864.864 0 010-1.218.853.853 0 011.21 0l2.471 2.483 5.9-5.944a.851.851 0 011.204-.005l.006.007a.87.87 0 01-.002 1.224l-6.398 6.447a1 1 0 01-1.42 0z"
                              fill="#702CF4"
                            ></path>
                          </svg>
                        </div>
                        <div class="hoJPPZ">
                          Email Accuracy(find leads by criteria):100%
                        </div>
                      </div>
                      <div class="section-title">
                        <div class="bWCeYo">Management</div>
                      </div>
                      <div class="fErTBS erXztQ">
                        <div class="jPWqco">
                          <svg
                            width="14px"
                            height="14px"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            alt="feature"
                          >
                            <path
                              d="M5.222 11.925L2.251 8.931a.864.864 0 010-1.218.853.853 0 011.21 0l2.471 2.483 5.9-5.944a.851.851 0 011.204-.005l.006.007a.87.87 0 01-.002 1.224l-6.398 6.447a1 1 0 01-1.42 0z"
                              fill="#702CF4"
                            ></path>
                          </svg>
                        </div>
                        <div class="hoJPPZ">Export To CSV</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="erXztQ jObgKD">
                <div
                  class="QETzq jObgKD bRCJYY"
                  direction="column"
                  color="#600DFF"
                >
                  <div class="ipMqpO">
                    <div class="ikrm96">
                      <img src="/img/image-3.svg" class="price-model-img-top" />
                    </div>
                  </div>
                  <div direction="column" class="bRCJYY">
                    <div direction="column" class="bRCJYY yNEap">
                      <div class="header-title hFPKtd">GROWTH</div>
                      <div class="kCTWXR header-subtitle">
                        Increase your sales funnel
                      </div>
                    </div>
                    <div class="dVWzzy bRCJYY">
                      <div class="cwCJJc erXztQ">
                        <div class="price-value etVJAp">
                          $39
                          <span class="mvwCl">/mo</span>
                        </div>
                      </div>
                      <div class="hPzTHP">
                        <div class="hoJPPZ">2500 Credits Monthly</div>
                        <div class="hoJPPZ">1 user</div>
                      </div>
                    </div>
                    <button
                      class="eHuhJA btn-price-plan-new"
                      onClick={handlePremiumClick}
                    >
                      Choose Plan
                    </button>
                    <hr class="hNDTnm" />
                    <div class="bRCJYY kHQzpT">
                      <div class="hoJPPZ">Everything in STARTER, plus:</div>
                      <div class="bRCJYY kpXRIZ">
                        <div class="section-title">
                          <div class="bWCeYo">Data Enrichment</div>
                        </div>
                        <div class="fErTBS erXztQ">
                          <div class="jPWqco">
                            <svg
                              width="14px"
                              height="14px"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              alt="feature"
                            >
                              <path
                                d="M5.222 11.925L2.251 8.931a.864.864 0 010-1.218.853.853 0 011.21 0l2.471 2.483 5.9-5.944a.851.851 0 011.204-.005l.006.007a.87.87 0 01-.002 1.224l-6.398 6.447a1 1 0 01-1.42 0z"
                                fill="#702CF4"
                              ></path>
                            </svg>
                          </div>
                          <div class="hoJPPZ">
                            Email Accuracy(find leads by domain):100%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="erXztQ jObgKD">
                  <div
                    class="QETzq jObgKD bRCJYY"
                    direction="column"
                    color="#600DFF"
                  >
                    <div class="ipMqpO">
                      <div class="ikrm96">
                        <img
                          src="/img/image-4.svg"
                          class="price-model-img-top"
                        />
                      </div>
                    </div>
                    <div direction="column" class="bRCJYY">
                      <div direction="column" class="bRCJYY yNEap">
                        <div class="header-title hFPKtd">PRO</div>
                        <div class="kCTWXR header-subtitle">
                          Power up and grow your sales faster
                        </div>
                      </div>
                      <div class="dVWzzy bRCJYY">
                        <div class="cwCJJc erXztQ">
                          <div class="price-value etVJAp">
                            $99
                            <span class="mvwCl">/mo</span>
                          </div>
                        </div>
                        <div class="hPzTHP">
                          <div class="hoJPPZ">10000 Credits Monthly</div>
                          <div class="hoJPPZ">1 user</div>
                        </div>
                      </div>
                      <button
                        class="eHuhJA btn-price-plan-new"
                        onClick={handleProClick}
                      >
                        Choose Plan
                      </button>
                      <hr class="hNDTnm" />
                      <div class="bRCJYY kHQzpT">
                        <div class="hoJPPZ">Everything in GROWTH, plus:</div>
                        <div class="bRCJYY kpXRIZ">
                          <div class="section-title">
                            <div class="bWCeYo">Data Enrichment</div>
                          </div>
                          <div class="fErTBS erXztQ">
                            <div class="jPWqco">
                              <svg
                                width="14px"
                                height="14px"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                alt="feature"
                              >
                                <path
                                  d="M5.222 11.925L2.251 8.931a.864.864 0 010-1.218.853.853 0 011.21 0l2.471 2.483 5.9-5.944a.851.851 0 011.204-.005l.006.007a.87.87 0 01-.002 1.224l-6.398 6.447a1 1 0 01-1.42 0z"
                                  fill="#702CF4"
                                ></path>
                              </svg>
                            </div>
                            <div class="hoJPPZ">
                              No Max per search constraint
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChoosePlan;
