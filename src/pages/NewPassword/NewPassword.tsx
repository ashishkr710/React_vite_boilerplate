import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { failed, success } from "@components/Common/Toastify";
import TextInput from "@components/Common/TextInput";
import Button from "@components/Common/Button";
import AuthPagesLayout from "@components/Layouts/AuthPagesLayout";
import { setnewPassword } from "../../API/Auth";

export const NewPassword = () => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [searchParams] = useSearchParams();

  // Extract email and oldPassword from query parameters
  const email = searchParams.get("email");
  const oldPassword = searchParams.get("oldPassword");

  const formik = useFormik({
    initialValues: {
      email: email,
      oldPassword: oldPassword,
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
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
      setnewPassword({
        email: values.email?.toLowerCase(),
        oldPassword: values?.oldPassword,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })
        .then((res: any) => {
          navigate("/auth/login");
          success(res?.data?.message);
        })
        .catch((err) => {
          failed(err.res?.data?.message);
        })
        .finally(() => setBtnLoading(false));
    },
  });

  return (
    <AuthPagesLayout heading={"Set New password"}>
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <TextInput
          type="password"
          keyField={"password"}
          label={"Enter your new password"}
          formik={formik}
          placeholder={"Password"}
        />
        <TextInput
          type="password"
          keyField={"confirmPassword"}
          label={"Enter your confirm password"}
          formik={formik}
          placeholder={"Confirm Password"}
        />
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

export default NewPassword;
