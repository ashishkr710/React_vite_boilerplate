import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { failed, success } from "@components/Common/Toastify";
import TextInput from "@components/Common/TextInput";
import Button from "@components/Common/Button";
import "./style.css";
import AuthPagesLayout from "@components/Layouts/AuthPagesLayout";
import { forgetPassword } from "../../API/Auth";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email()
        .required("Email is required")
        .matches(/^$|^\S+.*/, "Only blankspaces is not valid."),
    }),
    onSubmit: (values) => {
      setBtnLoading(true);
      forgetPassword({
        email: values.email?.toLowerCase(),
      })
        .then((res: any) => {
          navigate(`/auth/reset-password?email=${values.email?.toLowerCase()}`);
          success(res?.data?.message);
        })
        .catch((err) => {
          failed(err.response.data.message);
        })
        .finally(() => setBtnLoading(false));
    },
  });

  return (
    <AuthPagesLayout heading={"Forgot Password"}>
      {/* <p className="welcome-text">Please enter your Email </p> */}
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <TextInput
          keyField={"email"}
          label={"User email"}
          formik={formik}
          placeholder={"User email"}
        />
        <div className="back-login">
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

export default ForgotPassword;
