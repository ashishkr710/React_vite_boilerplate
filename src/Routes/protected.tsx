import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import ProtectedLayout from "../components/Layouts/ProtectedLayout";
import storage from "@utils/storage";
import Notification from "@pages/Notification/Notification";
import InactivityLogout from "@components/Layouts/InactivityLogout";
import { useAppContext } from "../contexts/AppContextProvider";

type ProtectedRoutesProps = object;

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = () => {
  const { value } = useAppContext();
  const location = useLocation();
  const isUserLogedIn = !!storage.getToken();

  if (!isUserLogedIn) {
    return (
      <Navigate to="/auth/login" state={{ from: location }} replace={true} />
    );
  }

  return (
    <ProtectedLayout>
      <InactivityLogout>
        <Outlet />
        {value?.user?.userType === "doctor" ? <Notification /> : null}
      </InactivityLogout>
    </ProtectedLayout>
  );
};
export default ProtectedRoutes;
