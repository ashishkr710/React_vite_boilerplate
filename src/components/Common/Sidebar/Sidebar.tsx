import React, { useState } from "react";
import "./style.css";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../../contexts/AppContextProvider";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface ProtectedLayoutProps {
  children?: React.ReactNode;
  isOpen: boolean;
}

const sidebarData = (IsMD: boolean, isDoctor: boolean) => {
  const list = [
    {
      title: "Dashboard",
      to: "/app/dashboard",
      svg: (
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="#232A2E"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 16H5.34625V10.0578H10.6538V16H14V7L8 2.48075L2 7V16ZM0.5 17.5V6.25L8 0.605751L15.5 6.25V17.5H9.15375V11.5578H6.84625V17.5H0.5Z"
            fill=""
          />
        </svg>
      ),
    },
  ];
  if (IsMD) {
    list.splice(2, 0, {
      title: "Appointments",
      to: "/app/appointment",
      svg: (
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="#232A2E"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 11.9423C4.75517 11.9423 4.5465 11.8561 4.374 11.6838C4.20167 11.5113 4.1155 11.3026 4.1155 11.0577C4.1155 10.8129 4.20167 10.6042 4.374 10.4318C4.5465 10.2593 4.75517 10.173 5 10.173C5.24483 10.173 5.4535 10.2593 5.626 10.4318C5.79833 10.6042 5.8845 10.8129 5.8845 11.0577C5.8845 11.3026 5.79833 11.5113 5.626 11.6838C5.4535 11.8561 5.24483 11.9423 5 11.9423ZM9 11.9423C8.75517 11.9423 8.5465 11.8561 8.374 11.6838C8.20167 11.5113 8.1155 11.3026 8.1155 11.0577C8.1155 10.8129 8.20167 10.6042 8.374 10.4318C8.5465 10.2593 8.75517 10.173 9 10.173C9.24483 10.173 9.4535 10.2593 9.626 10.4318C9.79833 10.6042 9.8845 10.8129 9.8845 11.0577C9.8845 11.3026 9.79833 11.5113 9.626 11.6838C9.4535 11.8561 9.24483 11.9423 9 11.9423ZM13 11.9423C12.7552 11.9423 12.5465 11.8561 12.374 11.6838C12.2017 11.5113 12.1155 11.3026 12.1155 11.0577C12.1155 10.8129 12.2017 10.6042 12.374 10.4318C12.5465 10.2593 12.7552 10.173 13 10.173C13.2448 10.173 13.4535 10.2593 13.626 10.4318C13.7983 10.6042 13.8845 10.8129 13.8845 11.0577C13.8845 11.3026 13.7983 11.5113 13.626 11.6838C13.4535 11.8561 13.2448 11.9423 13 11.9423ZM2.30775 19.5C1.80258 19.5 1.375 19.325 1.025 18.975C0.675 18.625 0.5 18.1974 0.5 17.6923V4.30775C0.5 3.80258 0.675 3.375 1.025 3.025C1.375 2.675 1.80258 2.5 2.30775 2.5H3.69225V0.38475H5.23075V2.5H12.8077V0.38475H14.3077V2.5H15.6923C16.1974 2.5 16.625 2.675 16.975 3.025C17.325 3.375 17.5 3.80258 17.5 4.30775V17.6923C17.5 18.1974 17.325 18.625 16.975 18.975C16.625 19.325 16.1974 19.5 15.6923 19.5H2.30775ZM2.30775 18H15.6923C15.7692 18 15.8398 17.9679 15.9038 17.9038C15.9679 17.8398 16 17.7693 16 17.6923V8.30775H2V17.6923C2 17.7693 2.03208 17.8398 2.09625 17.9038C2.16025 17.9679 2.23075 18 2.30775 18ZM2 6.80775H16V4.30775C16 4.23075 15.9679 4.16025 15.9038 4.09625C15.8398 4.03208 15.7692 4 15.6923 4H2.30775C2.23075 4 2.16025 4.03208 2.09625 4.09625C2.03208 4.16025 2 4.23075 2 4.30775V6.80775Z"
            fill=""
          />
        </svg>
      ),
    });
  }
  if (isDoctor) {
    list.push({
      title: "Chat",
      to: "/app/chat",
      svg: (
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="#232A2E"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.35 17.6443L12.1807 14.45L13.225 13.4057L15.35 15.5307L19.6 11.2808L20.6443 12.35L15.35 17.6443ZM0.5 19.0385V2.30775C0.5 1.80258 0.675 1.375 1.025 1.025C1.375 0.675 1.80258 0.5 2.30775 0.5H17.6923C18.1974 0.5 18.625 0.675 18.975 1.025C19.325 1.375 19.5 1.80258 19.5 2.30775V9.25H18V2.30775C18 2.23075 17.9679 2.16025 17.9038 2.09625C17.8398 2.03208 17.7693 2 17.6923 2H2.30775C2.23075 2 2.16025 2.03208 2.09625 2.09625C2.03208 2.16025 2 2.23075 2 2.30775V15.3848L3.4 14H10.25V15.5H4.0385L0.5 19.0385Z"
            fill=""
          />
        </svg>
      ),
    });
  }
  return list;
};

const Sidebar: React.FC<ProtectedLayoutProps> = ({ isOpen }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const {
    value: { user },
  } = useAppContext();
  const IsMD = user?.doctorType === "MD";
  const isDoctor = user?.userType === "doctor";
  const sidebarList = sidebarData(IsMD, isDoctor);
  return (
    <div className={`main-sidebar-div ${isOpen ? "show" : ""}`}>
      <div className="outer-wrapper">
        <div
          className="inner-wrapper"
          style={{
            width: isMenuOpen ? "fit-content" : "50px",
          }}
        >
          <div
            className="toggle-icon-div"
            title={isMenuOpen ? "Close" : "Show"}
          >
            {isMenuOpen ? (
              <ChevronLeft
                className="menu-icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            ) : (
              <ChevronRight
                className="menu-icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            )}
          </div>

          <div className="listItem">
            <ul>
              <div
                className="li-main-div"
                style={{
                  padding: isMenuOpen ? "0px 50px" : "0",
                }}
              >
                {sidebarList.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={location.pathname === item.to ? "active" : ""}
                    >
                      <NavLink
                        to={item.to}
                        style={{
                          justifyContent: isMenuOpen ? "" : "center",
                        }}
                      >
                        {item.svg}{" "}
                        <p
                          style={{
                            display: isMenuOpen ? "block" : "none",
                          }}
                        >
                          {item.title}
                        </p>
                      </NavLink>
                    </li>
                  );
                })}
              </div>
            </ul>
          </div>
          <div className="sidebar-footer">
            <div className="footer-ul">
              <ul>
                <li>
                  {/*<NavLink
                                        to="/auth/login"
                                        onClick={handleLogout}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="#232A2E"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M2.30775 17.5C1.80258 17.5 1.375 17.325 1.025 16.975C0.675 16.625 0.5 16.1974 0.5 15.6923V2.30775C0.5 1.80258 0.675 1.375 1.025 1.025C1.375 0.675 1.80258 0.5 2.30775 0.5H9.0095V2H2.30775C2.23075 2 2.16025 2.03208 2.09625 2.09625C2.03208 2.16025 2 2.23075 2 2.30775V15.6923C2 15.7692 2.03208 15.8398 2.09625 15.9038C2.16025 15.9679 2.23075 16 2.30775 16H9.0095V17.5H2.30775ZM13.2308 13.2692L12.1923 12.1845L14.627 9.75H6.09625V8.25H14.627L12.1923 5.8155L13.2308 4.73075L17.5 9L13.2308 13.2692Z"
                                                fill=""
                                            />
                                        </svg>
                                        <p>Logout</p>
                                    </NavLink>*/}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
