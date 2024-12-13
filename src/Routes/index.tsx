import React, { lazy, ReactElement, Suspense, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ProtectedRoutes from "./protected";
import storage from "@utils/storage";
import { FullPageSpinner } from "@components/Common/Spinner/FullPageSpinner";

export const ResetPassword = lazy(
  () => import("@pages/ResetPassword/ResetPassword")
);
export const Unauthorized = lazy(
  () => import("@pages/Unauthorized/Unauthorized")
);
export const Login = lazy(() => import("@pages/Login/Login"));
export const ForgotPassword = lazy(
  () => import("@pages/ForgotPassword/ForgotPassword")
);
export const Signup = lazy(() => import("@pages/Signup/Signup"));
export const TermsCondition = lazy(
  () => import("@pages/Signup/TermsCondition")
);
export const VerifyOtp = lazy(() => import("@pages/VerifyEmailOtp/VerifyOtp"));
export const ChangePassword = lazy(
  () => import("@pages/ChangePassword/ChangePassword")
);

export const NotificationList = lazy(
  () => import("@pages/Notification/NotificationList")
);
export const Dashboard = lazy(() => import("@pages/Dashboard/Dashboard"));
export const Profile = lazy(() => import("@pages/Profile/Profile"));

export const Chat = lazy(() => import("@pages/Chat/Chat"));

export const NewPassword = lazy(() => import("@pages/NewPassword/NewPassword"));

interface Routes {
  path: string;
  element: ReactElement;
  roles?: string[];
}

const authRoutes: Routes[] = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
  {
    path: "/auth/terms&condition",
    element: <TermsCondition />,
  },
  {
    path: "/auth/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/auth/new-password",
    element: <NewPassword />,
  },
];

const protectedRoutes: Routes[] = [
  {
    path: "/app/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/app/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/app/profile",
    element: <Profile />,
  },
  {
    path: "/app/chat",
    element: <Chat />,
  },
  {
    path: "/app/notification",
    element: <NotificationList />,
  },
];

export default function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const isUserLogedIn = !!storage.getToken();
  const navigatePath = isUserLogedIn ? "/app/dashboard" : "/auth/login";

  useEffect(() => {
    if (
      ![...protectedRoutes, ...authRoutes]
        .map((item) => item.path)
        .includes(location.pathname)
    ) {
      navigate(navigatePath);
    }
  }, [isUserLogedIn]);

  return (
    <Routes>
      <Route>
        {authRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              isUserLogedIn ? <Navigate to={"/app/dashboard"} /> : route.element
            }
          />
        ))}
        <Route path="/auth" element={<Navigate to={navigatePath} />} />
      </Route>
      {isUserLogedIn ? (
        <Route element={<ProtectedRoutes />}>
          {protectedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                isUserLogedIn ? (
                  <Suspense fallback={<FullPageSpinner />}>
                    {route.element}
                  </Suspense>
                ) : (
                  <Navigate to={"/auth/login"} replace={true} />
                )
              }
            />
          ))}
          <Route path="/app" element={<Navigate to={navigatePath} />} />
        </Route>
      ) : null}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to={navigatePath} />} />
    </Routes>
  );
}
