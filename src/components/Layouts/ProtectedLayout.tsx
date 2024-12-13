import Header from "@components/Common/Header/Header";
import Sidebar from "@components/Common/Sidebar/Sidebar";
import React, { useState } from "react";

interface ProtectedLayoutProps {
  children?: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="layout-wrapper">
      <Header handleMenuToggle={handleMenuToggle} />
      <div className="main-layout">
        <div className="left-wrap">
          <Sidebar isOpen={isMenuOpen} />
        </div>
        <div
          className="right-wrap"
          style={{
            padding: location.pathname === "/app/chat" ? "0" : "30px",
          }}
        >
          {/*<a
                        href="#as"
                        className="logo"
                        title="Fonemed A Healthier Tomorrow"
                    ></a>*/}
          {children}
        </div>
      </div>
    </section>
  );
};
export default ProtectedLayout;
