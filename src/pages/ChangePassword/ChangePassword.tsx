import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.css";
import { failed, success } from "@components/Common/Toastify";
import TextInput from "@components/Common/TextInput";
import { changePassword } from "../../API/User";
import Button from "@components/Common/Button";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContextProvider";

function ChangePassword() {
  const navigate = useNavigate();
  const { value } = useAppContext();
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const [isLoading, setIsLoading] = useState(false);

  // Formik hook for form handling
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      changePassword({
        oldPassword: values?.oldPassword,
        newPassword: values?.newPassword,
        confirmPassword: values?.confirmPassword,
      })
        .then((res: any) => {
          success(res?.data?.message);
          resetForm();
        })
        .catch((error) => {
          failed(error?.response?.data?.message);
        })
        .finally(() => setIsLoading(false));
    },
  });

  useEffect(() => {
    if (value?.user?.userType !== "doctor") {
      navigate(-1);
    }
  }, []);

  return (
    <Box className="change-password-wrapper">
      <Box>
        <Typography variant="h4" gutterBottom>
          Change Password
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextInput
              type="password"
              keyField={"oldPassword"}
              label={"Old Password"}
              placeholder={"Old Password"}
              formik={formik}
            />
          </Grid>

          <Grid item xs={12}>
            <TextInput
              type="password"
              keyField={"newPassword"}
              label={"New Password"}
              placeholder={"New Password"}
              formik={formik}
            />
          </Grid>

          <Grid item xs={12}>
            <TextInput
              type="password"
              keyField={"confirmPassword"}
              label={"Confirm Password"}
              placeholder={"Confirm Password"}
              formik={formik}
            />
          </Grid>
        </Grid>

        <Box className="password-btn-wrapper">
          <Button
            className="submit-btn"
            variant="secondary"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" className="submit-btn" isLoading={isLoading}>
            Change Password
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ChangePassword;
