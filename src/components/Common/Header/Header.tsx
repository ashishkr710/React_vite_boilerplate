import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import logo from "@images/logo.svg";
import NoImage from "@images/no-image.png";
import downarrow from "@images/down-arrow.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../contexts/AppContextProvider";
import useOnClickOutside from "@hooks/useOnClickOutside";
import { socket } from "@utils/socket/socket";
import { getNotificationsCount } from "../../../API/Notification";
import { logout } from "../../../API/Auth";

interface ProtectedLayoutProps {
  children?: React.ReactNode;
  handleMenuToggle: () => void;
}

const Header: React.FC<ProtectedLayoutProps> = ({ handleMenuToggle }) => {
  const { value, setValue } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(
    value?.user?.profileImage || null
  );
  const ref = useRef(null);
  const userId = value.user?.userId;

  useEffect(() => {
    if (userId) {
      getNotificationsCount().then((res: any) => {
        setNotificationsCount(res.data);
      });
      // Listen for notificationsCount from the server
      socket.on("notificationsCount", (count) => {
        setNotificationsCount(count);
      });

      return () => {
        socket.off("notificationsCount");
      };
    }
  }, [userId]);

  useEffect(() => {
    setProfileImage(value?.user?.profileImage);
  }, [value?.user?.profileImage]);

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleLogout = () => {
    logout();
  };

  const navigateToNotification = () => {
    navigate("/app/notification");
  };

  return (
    <div className="main-header-div">
      <div className="main-header-flex">
        <div className="logo-main-div">
          <NavLink rel="stylesheet" to="/app/dashboard">
            <img src={logo} alt="logo" className="logo-icon" />
          </NavLink>
          {/*<MenuIcon
                        className="menu-icon"
                        onClick={handleMenuToggle}
                    />*/}
          <h4>EYE REFER</h4>
        </div>

        <div className="header-profile">
          <div className="notification-icon" onClick={navigateToNotification}>
            {/*<Badge
                            badgeContent={notificationsCount}
                            color="primary"
                        >
                            <NotificationsIcon />
                        </Badge>*/}
          </div>

          <div
            className="dropdown"
            ref={ref}
            onClick={() => setIsOpen(!isOpen)}
          >
            <button className="dropdown-button">
              <div className="inner-wrapper-profile">
                <img
                  src={profileImage || NoImage}
                  alt="profile"
                  className="profile-icon"
                  height={40}
                  width={40}
                />
                <div className="profile-content">
                  <h4 style={{ textTransform: "capitalize" }}>
                    Hi, {value?.user?.firstName} {value?.user?.lastName}
                  </h4>
                  <p>Welcome Back</p>
                </div>
                <div className="dropdown-img">
                  <img src={downarrow} alt="profile" />
                </div>
              </div>
            </button>
            <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
              {value?.user?.userType === "doctor" ? (
                <NavLink to="/app/profile">Profile</NavLink>
              ) : null}
              {value?.user?.userType === "doctor" ? (
                <NavLink to="/app/change-password">Change Password</NavLink>
              ) : null}
              <NavLink
                to="/auth/login"
                replace={true}
                onClick={handleLogout}
                style={{ display: "flex" }}
              >
                <p style={{ marginRight: "1rem" }}>Logout</p>
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
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
