import React from "react";
import logoimg from "../../Assets/Images/new-logo-md.png";
import eyereferlogo from "../../Assets/Images/latest-logo.svg";
import "../Layouts/AuthPagesLayout.css";
import newlogoimg from "../../Assets/Images/new-logo-sm.png";

interface Props {
  children: React.ReactNode;
  heading: string;
}

const AuthPagesLayout: React.FC<Props> = ({ children, heading }) => {
  return (
    <section className="sign-up-section">
      <div className="main-sign-layout">
        <div className="parent-div">
          <div className="left-login-wrap">
            <div className="bg-img-div">
              <img src={logoimg} alt="new-logo" className="logo-img" />
              <img src={newlogoimg} alt="new-logo" className="new-logo-img" />
            </div>
          </div>
          <div className="right-content">
            <div className="sign-up-form">
              <div className="mobile-view-logo">
                <img
                  src={eyereferlogo}
                  alt="new-logo"
                  className="eye-refer-logo"
                />
              </div>
              <div className="form-heading">
                <h2>{heading}</h2>
              </div>
              {children}
            </div>
          </div>
        </div>
        <footer>@2024 Eye Refer</footer>
      </div>
    </section>
  );
};

export default AuthPagesLayout;
