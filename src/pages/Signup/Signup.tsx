import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { failed, success } from "@components/Common/Toastify";
import TextInput from "@components/Common/TextInput";
import Button from "@components/Common/Button";
import "./style.css";
import AuthPagesLayout from "@components/Layouts/AuthPagesLayout";
import SelectFiled from "@components/Common/SelectFiled";
import { signupUser } from "../../API/Auth";

export const Signup = () => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [isAcceptedTnc, setIsAcceptedTnc] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      doctorType: "MD",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      firstName: yup
        .string()
        .max(20)
        .required("First Name is required")
        .matches(/^$|^\S+.*/, "Only blankspaces is not valid."),
      lastName: yup
        .string()
        .max(20)
        .required("Last Name is required")
        .matches(/^$|^\S+.*/, "Only blankspaces is not valid."),
      doctorType: yup
        .string()
        .required("Doctor Type is required")
        .matches(/^$|^\S+.*/, "Only blankspaces is not valid."),
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
      confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      setBtnLoading(true);
      signupUser({ ...values, email: values.email?.toLowerCase() })
        .then((res: any) => {
          navigate(`/auth/verify-otp?email=${values.email?.toLowerCase()}`);
          success(res.data.message);
        })
        .catch((err) => {
          failed(err.response.data.message);
        })
        .finally(() => setBtnLoading(false));
    },
  });

  return (
    <AuthPagesLayout heading={"Sign Up"}>
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <div className="name-input">
          <div className="first-name-div">
            <TextInput
              keyField={"firstName"}
              label={"First name"}
              formik={formik}
              placeholder={"First name"}
            />
          </div>
          <div className="first-name-div">
            <TextInput
              keyField={"lastName"}
              label={"Last name"}
              formik={formik}
              placeholder={"Last name"}
            />
          </div>
        </div>
        <SelectFiled
          keyField={"doctorType"}
          label={"Doctor Type"}
          formik={formik}
          options={[
            { name: "MD", value: "MD" },
            { name: "OD", value: "OD" },
          ]}
        />
        <TextInput
          keyField={"email"}
          label={"Email Address"}
          formik={formik}
          placeholder={"Enter your email address"}
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
          label={"Confirm Password"}
          formik={formik}
          placeholder={"Confirm Password"}
        />
        <div className="terms-checkbox" style={{ marginTop: "10px" }}>
          <label>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={isAcceptedTnc}
              style={{ marginRight: "8px" }}
              onChange={(e) => setIsAcceptedTnc(e.target.checked)}
            />
            I agree to the{" "}
            <Link target="_blank" to="/auth/terms&condition">
              Terms & Conditions
            </Link>
          </label>
        </div>
        <div className="sign-up-btn">
          <Button
            type="submit"
            style={{ width: "100%" }}
            isLoading={btnLoading}
            disabled={!isAcceptedTnc}
          >
            Sign Up
          </Button>
        </div>
        <div className="bottom-sec">
          <p>
            Already have an account ?{" "}
            <span>
              <Link to="/auth/login" title="login">
                Login
              </Link>
            </span>
          </p>
        </div>
      </form>
    </AuthPagesLayout>
  );
};

export default Signup;
