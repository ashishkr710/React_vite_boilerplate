import React from "react";
import "../Unauthorized/style.css";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <section className="authorize-section">
      <div className="container">
        <div className="main-author-div">
          <p className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="authorized-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </p>
          <h1 className="heading-authorize">You are not authorized</h1>
          <p className="text-authorize">
            You tried to access a page you did not have prior authorization for.
          </p>

          <div className="author-main-btn-div">
            <button className="back-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span onClick={() => navigate(-1)}>back</span>
            </button>

            <button onClick={() => navigate("/home")} className="home-btn">
              Take me home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Unauthorized;
