import {useState, useRef} from "react";
import axios from "axios";
import {useDetectOutsideClick} from "../../utils/click-outside";
import {useRouter} from "next/router";
const HeaderLogin = ({currentUser}) => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const handleOnclick = async () => {
    await axios.post("/api/users/signout");
    router.push("/");
  };

  return (
    <>
      <div className="dashboard-header">
        <nav className="nav-bar">
          <div className="nav-bar-brand">
            <a href="/leads/domain">
              <img className="logo-lead-brand" src="/img/logo-p.png" />
            </a>
          </div>
          <div className="pull-left">
            <ul>
              <li
                className="navlink margin-right-4 cursor"
                id="dropdown-account-link"
                onClick={onClick}
              >
                <button onClick={onClick} className="menu-trigger">
                  <span>{currentUser.name}</span>
                  <img
                    src={currentUser.avatar}
                    alt="User avatar"
                    className="avatar-w-h"
                  />
                </button>
                <nav
                  ref={dropdownRef}
                  className={`menu ${isActive ? "active" : "inactive"}`}
                >
                  <ul>
                    <li>
                      <div className="account-detail">
                        <div class="used-requests-container">
                          <span class="pull-right current-search-requests">
                            0 / 25
                          </span>
                          <span>Searches</span>
                          <div class="used-requests-bar">
                            <div
                              class="used-requests-level used-search-requests-level"
                              style={{width: "0%"}}
                            ></div>
                          </div>
                        </div>
                        <div class="subscription-info">
                          Monthly quotas reset in 25 days.
                        </div>
                        <div class="upgrade-info">
                          <a
                            class="btn-orange full-width text-center-1"
                            href="/payment/choose-plan"
                          >
                            <div class="far fa-arrow-alt-circle-up"></div>
                            Upgrade
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="text-center-1">
                      <a onClick={handleOnclick}>
                        <i className="fas fa-sign-out-alt"></i>Log out
                      </a>
                    </li>
                  </ul>
                </nav>
              </li>
              <li className="navlink">
                <a className="" href="/leads/criteria" tabIndex="2">
                  <i className="fas fa-list"></i>
                  <span className="link-text">Criteria Search</span>
                </a>
              </li>
              <li className="navlink">
                <a className="" href="/leads/person" tabIndex="2">
                  <i className="fas fa-user-check"></i>
                  <span className="link-text">Find Person</span>
                </a>
              </li>
              <li className="navlink">
                <a className="" href="/leads/domain" tabIndex="2">
                  <div className="far fa-search"></div>
                  <span className="link-text">Search Domain</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};
export default HeaderLogin;
