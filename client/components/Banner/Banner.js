import Link from "next/link";
import MouseScroll from "../MouseScroll/MouseScroll";
export default function Banner() {
  return (
    <section className="main-banner offset-top">
      <div className="container">
        <div className="row align-items-center full-height">
          <div className="col-md-7 center-sm">
            <h1 className=" main-heading ">
              It has never been easier to
              <br /> find Leads , Email adresses...
            </h1>
            <p className="main-heading-para">
              Prospecat is a B2B prospecting platform. Use it to find email
              addresses and build a quality B2B Data for your sales funnel.
            </p>
            <div className="main-actions">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <Link href="/signup">
                    <a className="btn-main">Get started Now For Free</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-5 d-none d-md-block">
            <img
              src="img/banner-home.svg"
              className="img-fluid m-auto"
              alt="find Leads "
            />
          </div>
        </div>
      </div>
      <MouseScroll />
    </section>
  );
}
