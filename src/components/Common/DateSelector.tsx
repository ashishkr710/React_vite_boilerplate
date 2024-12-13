import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormikProps } from "formik";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

interface FormikValues {
  [key: string]: unknown;
}

interface Props {
  label: string;
  icon?: React.ReactNode | string;
  type?: string;
  keyField: string;
  formik: FormikProps<FormikValues>;
  disabled?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  required?: boolean;
  hasValue?: boolean;
  readOnly?: boolean;
}

function DateSelector({
  keyField,
  formik,
  label,
  minDate = dayjs().subtract(10, "years"),
  maxDate = dayjs().add(20, "years"),
  required = true,
  hasValue = false,
  readOnly = false,
}: Props) {
  const [value, setValue] = useState<Dayjs | null>(
    formik.values[keyField]
      ? dayjs(`${formik.values[keyField]}`, "MM-DD-YYYY")
      : null // Set to null if no initial value exists
  );
  const [open, setOpen] = useState(false);

  const handleChange = (val: Dayjs | null) => {
    if (!val) return;

    const currentDate = value ? dayjs(value) : dayjs(); // Default to today if value is null
    const newDate = currentDate
      .set("year", val.year())
      .set("month", val.month())
      .set("date", val.date());

    setValue(newDate);
    formik.setFieldValue(keyField, newDate.format("MM-DD-YYYY"));
  };

  return (
    <div className="field-wrap">
      <label htmlFor={keyField}>
        {label}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          format="MM-DD-YYYY"
          className="custom-date-selector"
          minDate={minDate}
          maxDate={maxDate}
          value={
            hasValue ? dayjs(`${formik.values[keyField]}`, "MM-DD-YYYY") : value
          }
          onChange={handleChange}
          readOnly={readOnly}
          closeOnSelect
          onOpen={() => !readOnly && setOpen(true)}
          onClose={() => !readOnly && setOpen(false)}
          open={open}
          slotProps={{
            textField: {
              placeholder: value ? "" : "MM-DD-YYYY", // Add placeholder directly
              InputLabelProps: {
                shrink: false, // Prevents label from floating to the top
              },
            },
            popper: {
              sx: {
                ".MuiPickersYear-yearButton": {
                  padding: 0,
                },
              },
            },
          }}
          sx={{
            ".MuiOutlinedInput-input": {
              height: "100%",
              margin: "0px",
              border: "1px solid transparent",
              padding: "0 10px !important",
              width: "100% !important",
            },
            ".MuiOutlinedInput-input:hover": {
              border: "1px solid transparent",
            },
            ".MuiOutlinedInput-root": {
              height: "57px",
              border: "1px solid transparent",
              color:
                hasValue || (value && dayjs(value).isValid())
                  ? "#000"
                  : "#666666",
              fontSize: "13.3px",
              minHeight: "auto", // Remove default min height if necessary
            },
            ".MuiOutlinedInput-root:hover": {
              border: "1px solid #000",
            },
            // Prevent placeholder color change on focus
            "& .MuiInputBase-input::placeholder": {
              opacity: 1, // Ensure consistent visibility
            },
            "& .Mui-focused .MuiInputBase-input::placeholder": {
              color: "#666666", // Keep same color on focus
            },
            border: "1px solid #ECF1F3",
            marginTop: "8px",
            borderRadius: "4px",
          }}
        />
      </LocalizationProvider>
      <div>
        {formik?.touched[keyField] && formik?.errors[keyField] ? (
          <div className="error-text">{`${formik?.errors?.[keyField]}`}</div>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
