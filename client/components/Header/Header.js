import Link from "next/link";
import Head from "next/head";
import {GoogleAuthLogout} from "../../utils/use-google-auth";
export default function Header() {
  return (
    <>
      <Head>
        <script
          src="https://code.jquery.com/jquery-3.5.1.min.js"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossOrigin="anonymous"
        ></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.min.js"></script>
      </Head>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light " id="main-nav">
          <div className="brand-m-x">
            <Link href="/">
              <a className="navbar-brand">
                <img
                  src="/img/logo.svg"
                  className="logo-footer"
                  alt="Logo PROSPECAT - B2B Prospecting service"
                />
              </a>
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNavDropdown">
            {
              <ul className="navbar-nav">
                <li className="nav-item ">
                  <a className="js-scrollTo" href="#about">
                    About <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className=" dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Features
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Link href="#features">
                      <a className="dropdown-item">Find Emails</a>
                    </Link>
                    <Link href="#features">
                      <a className="dropdown-item">Domain And Company Search</a>
                    </Link>
                    <Link href="#features">
                      <a className="dropdown-item">Find New Leads</a>
                    </Link>
                    <Link href="#features">
                      <a className="dropdown-item">List Manager</a>
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <a className=" js-scrollTo" href="#pricing">
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="js-scrollTo" href="#">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <Link href="/contact-us">
                    <a className="">Contact</a>
                  </Link>
                </li>
              </ul>
            }
            <div className={`d-flex navbar-buttons `}>
              <Link href="/signin">
                <button className="navbar-btn form-login-btn login">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="navbar-btn form-signup-btn signup">
                  Signup
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
