import Link from "next/link";
import {useState} from "react";
import Confetti from "react-confetti";
import Swal from "sweetalert2";
import Router from "next/router";
import {reformattedErr} from "../../helpers/use-errors";

import axios from "axios";
const Footer = ({currentUser}) => {
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);

  const onInputClick = async (e) => {
    e.preventDefault();
    try {
      setErrEmail("");
      setData("not empty");
      const response = await axios.post("/api/users/subscribe", {email});
      if (response.status === 200) {
        Swal.fire(
          "Great!",
          "You've been subscribed to our newsletter!Check your email for daily news.",
          "success"
        );
        setData(null);
        setSuccess(true);
      }
    } catch (error) {
      setData(null);
      const errEmail = reformattedErr(
        error.response.data.errors,
        "email"
      )?.email;
      setErrEmail(errEmail);
    }
  };

  return (
    <>
      {success && <Confetti width={1300} height={2800} />}
      <footer>
        {currentUser ? null : (
          <div className="content">
            <div className="top">
              <div className="logo-details">
                <img
                  src="img/logo-white.svg"
                  className="logo-footer"
                  alt="Logo PROSPECAT - B2B Prospecting service"
                />
              </div>
              <div className="media-icons ">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div className="bottom-line-full"></div>
            <div className="link-boxes">
              <ul className="box">
                <li className="link_name">Company</li>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="/contact-us">Contact us</a>
                </li>
                <li>
                  <a href="#about">About us</a>
                </li>
                <li>
                  <a href="/signup">Get started</a>
                </li>
              </ul>
              <ul className="box">
                <li className="link_name">Services</li>
                <li>
                  <a href="#features">Find new leads</a>
                </li>
                <li>
                  <a href="#features">Find emails</a>
                </li>
                <li>
                  <a href="#features">Manage Leads</a>
                </li>
                <li>
                  <a href="#features">Domain Search</a>
                </li>
              </ul>
              <ul className="box">
                <li className="link_name">Contact</li>
                <li>
                  <Link href="mailto:contact@prospecat.com">
                    <a>contact@prospecat.com</a>
                  </Link>
                </li>
                <li>
                  <Link href="mailto:support@prospecat.com">
                    <a>support@prospecat.com</a>
                  </Link>
                </li>
                <li>
                  <Link href="mailto:sales@prospecat.com">
                    <a>sales@prospecat.com</a>
                  </Link>
                </li>
              </ul>
              <ul className="box">
                <li className="link_name">Ressources</li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="/faqs">FAQs</a>
                </li>
                <li>
                  <a href="/our-policy">Privacy policy</a>
                </li>
                <li>
                  <a href="/our-policy">Terms & condition</a>
                </li>
              </ul>
              <ul className="box input-box">
                <li className="link_name">Subscribe</li>
                <li>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${errEmail ? "is-invalid" : ""}`}
                    aria-describedby="emailErr"
                  />
                  <small id="emailErr" className={`invalid-feedback`}>
                    {errEmail}
                  </small>
                </li>
                <li>
                  <input
                    type="submit"
                    value={`${data === null ? "Subscribe" : "Subscribing..."}`}
                    onClick={onInputClick}
                    className="cursor"
                  />
                </li>
              </ul>
            </div>
          </div>
        )}
        {currentUser && (
          <div className="bottom-details footer-p">
            <div className="bottom_text">
              <span className="copyright_text">
                Copyright © 2021 All rights reserved
              </span>
            </div>
          </div>
        )}
      </footer>
    </>
  );
};
export default Footer;
