import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { failed, success } from "@components/Common/Toastify";
import TextInput from "@components/Common/TextInput";
import Button from "@components/Common/Button";
import "./style.css";
import AuthPagesLayout from "@components/Layouts/AuthPagesLayout";
import { resetPassword } from "../../API/Auth";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const formik = useFormik({
    initialValues: {
      email: searchParams.get("email"),
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      otp: yup
        .string()
        .required("Otp is required")
        .matches(/^$|^\S+.*/, "Only blankspaces is not valid."),
      password: yup
        .string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
          "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
        ),
      confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      setBtnLoading(true);
      resetPassword({
        email: values.email?.toLowerCase(),
        otp: values.otp,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })
        .then((res: any) => {
          navigate("/auth/login");
          success(res.data?.message);
        })
        .catch((err) => {
          failed(err.response.data.message);
        })
        .finally(() => setBtnLoading(false));
    },
  });

  return (
    <AuthPagesLayout heading={"Verify & Reset password"}>
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <TextInput
          keyField={"otp"}
          label={"OTP"}
          formik={formik}
          placeholder={"123456"}
        />
        <TextInput
          type="password"
          keyField={"password"}
          label={"Enter your password"}
          formik={formik}
          placeholder={"Password"}
        />
        <TextInput
          type="password"
          keyField={"confirmPassword"}
          label={"Enter your confirm password"}
          formik={formik}
          placeholder={"Password"}
        />
        <div className="forget-div">
          <Link to="/auth/login" title="login">
            Back to login
          </Link>
        </div>
        <div className="btn-wrap">
          <Button
            type="submit"
            className="custom-btn"
            style={{ width: "100%" }}
            isLoading={btnLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </AuthPagesLayout>
  );
};

export default ResetPassword;
