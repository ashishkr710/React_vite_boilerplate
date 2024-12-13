import { info } from "@components/Common/Toastify";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../API/Auth";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];
interface Props {
  children?: React.ReactNode;
  timeout?: number; // Optional timeout in milliseconds (default to 10 minutes)
}

const InactivityLogout: React.FC<Props> = ({ children, timeout = 600000 }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Starts or resets the timer to log out the user after the specified inactivity timeout
  const startLogoutTimer = () => {
    // Clears any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // Sets a new timer
    timerRef.current = setTimeout(() => {
      // Clears the timer
      clearTimeout(timerRef.current as NodeJS.Timeout);
      timerRef.current = null;
      // Logs out the user
      logoutAction();
    }, timeout);
  };

  // Logs out the user by clearing auth token and redirecting to /signin page
  const logoutAction = () => {
    logout();
    info("You have been loged-out, due to in-activity!");
    navigate("/auth/login", { replace: true });
  };

  // Adds event listeners to reset the inactivity timer on any user activity
  useEffect(() => {
    const resetTimer = () => startLogoutTimer();

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Start the initial timer
    startLogoutTimer();

    // Clean up event listeners and timer on component unmount
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeout]);

  return <>{children}</>;
};

export default InactivityLogout;
