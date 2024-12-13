import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { failed, success } from "@components/Common/Toastify";
import TextInput from "@components/Common/TextInput";
import Button from "@components/Common/Button";
import "./style.css";
import AuthPagesLayout from "@components/Layouts/AuthPagesLayout";
import { loginUser } from "../../API/Auth";
import storage from "@utils/storage";
import { useAppContext } from "../../contexts/AppContextProvider";
import { socket } from "@utils/socket/socket";

export const Login = () => {
  const navigate = useNavigate();
  const { value, setValue } = useAppContext();
  const [btnLoading, setBtnLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email()
        .required("Email is required")
        .matches(/^$|^\S+.*/, "Only blankspaces is not valid."),
      password: yup
        .string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
          "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
        ),
    }),
    onSubmit: (values) => {
      setBtnLoading(true);
      loginUser({
        email: values.email?.toLowerCase(),
        password: values.password,
      })
        .then((res: any) => {
          storage.setToken(res?.data?.data?.token);
          storage.setUser(res?.data?.data);
          const contextValue = { ...value };
          contextValue.isUser = true;
          contextValue.user = res?.data?.data;
          setValue(contextValue);
          // Check if address exists
          if (
            res?.data?.data?.userType === "doctor" &&
            res?.data?.data?.doctorType === "MD" &&
            !res?.data?.data?.hasAddress
          ) {
            navigate("/app/profile");
          } else {
            navigate("/app/dashboard");
          }
          // Update socket auth and connect
          if (res?.data?.data?.userType === "doctor") {
            socket.auth = { token: res?.data?.data?.token };
            socket.connect();
          }
          success(res?.data?.message);
        })
        .catch((err) => {
          failed(err?.response?.data?.message);
        })
        .finally(() => setBtnLoading(false));
    },
  });

  return (
    <AuthPagesLayout heading={"Log In"}>
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <TextInput
          keyField={"email"}
          label={"User email"}
          formik={formik}
          placeholder={"User email"}
        />
        <TextInput
          type="password"
          keyField={"password"}
          label={"Password"}
          formik={formik}
          placeholder={"Password"}
        />
        <div className="forget-div">
          <Link to="/auth/forgot-password" title="Forgot Password">
            Forgot Password?
          </Link>
        </div>
        <div className="btn-wrap">
          <Button
            type="submit"
            className="custom-btn"
            style={{ width: "100%" }}
            isLoading={btnLoading}
          >
            Login
          </Button>
        </div>
        <div className="privacy-div">
          <p>
            {"Don't have an account?"}
            <span>
              <Link to="/auth/signup" title="signup">
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </form>
    </AuthPagesLayout>
  );
};

export default Login;
