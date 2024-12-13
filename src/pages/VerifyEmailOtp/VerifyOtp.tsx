import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { failed, success } from "@components/Common/Toastify";
import TextInput from "@components/Common/TextInput";
import Button from "@components/Common/Button";
import "./style.css";
import AuthPagesLayout from "@components/Layouts/AuthPagesLayout";
import { resendOtp, verifyEmailOtp } from "../../API/Auth";
import { CircularProgress, Link as MuiLink } from "@mui/material";

export const VerifyOtp = () => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false); // Added state
  const [searchParams] = useSearchParams();

  const formik = useFormik({
    initialValues: {
      email: searchParams.get("email"),
      otp: "",
    },
    validationSchema: yup.object({
      otp: yup
        .string()
        .required("Otp is required")
        .matches(/^$|^\S+.*/, "Only blankspaces is not valid."),
    }),
    onSubmit: (values) => {
      setBtnLoading(true);
      verifyEmailOtp({
        email: values.email?.toLowerCase(),
        otp: values.otp,
      })
        .then((res: any) => {
          navigate("/auth/login");
          success(res?.data?.message);
        })
        .catch((err) => {
          failed(err?.res?.data?.message);
        })
        .finally(() => setBtnLoading(false));
    },
  });

  const handleResendOtp = () => {
    setResendLoading(true);
    const email = searchParams.get("email");
    resendOtp({ email: email.toLowerCase() })
      .then((res: any) => {
        success(res?.data?.message);
      })
      .catch((err) => {
        failed(err.res?.data?.message || "Failed to resend OTP");
      })
      .finally(() => setResendLoading(false));
  };

  return (
    <>
      <AuthPagesLayout heading={"Verify Otp"}>
        <form
          className="auth-form"
          onSubmit={formik.handleSubmit}
          style={{ pointerEvents: resendLoading ? "none" : "auto" }}
        >
          <TextInput
            keyField={"otp"}
            label={"OTP"}
            formik={formik}
            placeholder={"123456"}
          />
          <div className="resend-div">
            <MuiLink
              title="resendOtp"
              onClick={handleResendOtp}
              sx={{ cursor: "pointer" }}
            >
              {resendLoading ? (
                <CircularProgress size={20} /> // Loader for resend OTP
              ) : (
                "Resend OTP?"
              )}
            </MuiLink>
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
    </>
  );
};

export default VerifyOtp;
