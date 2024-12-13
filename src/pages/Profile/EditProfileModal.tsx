import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import "./style.css";
import { useAppContext } from "../../contexts/AppContextProvider";
import { failed, success } from "@components/Common/Toastify";
import { updateUser } from "../../API/User";
import TextInput from "@components/Common/TextInput";
import Button from "@components/Common/Button";
import { useFormik } from "formik";
import SelectFiled from "@components/Common/SelectFiled";

const EditProfileModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { value, setValue } = useAppContext();

  const formik = useFormik({
    //...profileIntialAndValidations(value?.user),
    initialValues:{},
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      updateUser(values)
        .then((response: any) => {
          onClose();
          setValue({ ...value, user: response?.data?.data });
          success(response?.data?.message);
        })
        .catch((error: any) => {
          failed(error?.response?.data?.message);
        })
        .finally(() => actions.setSubmitting(false));
    },
  });

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      disableEscapeKeyDown={true}
      fullWidth={true}
    >
      <DialogTitle>
        Edit Profile
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            keyField={"firstName"}
            label={"First Name"}
            className="inputfield-text"
            formik={formik}
            placeholder={"Enter first name"}
          />
          <TextInput
            keyField={"lastName"}
            label={"Last Name"}
            className="inputfield-text"
            required={false}
            formik={formik}
            placeholder={"Enter Last name"}
          />
          <SelectFiled
            keyField={"gender"}
            label={"Gender"}
            formik={formik}
            required={false}
            options={[
              { name: "Male", value: "male" },
              { name: "Female", value: "female" },
              { name: "Other", value: "other" },
            ]}
          />
          <TextInput
            label="Phone Number"
            type="phone"
            keyField={"phoneNumber"}
            formik={formik}
            value={formik.values.phoneNumber}
            onChange={(value: string) =>
              formik.setFieldValue("phoneNumber", value)
            }
            style={{ margin: "8px 0" }}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            fullWidth
            disabled
          />
          <DialogActions>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={formik.isSubmitting}>
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
