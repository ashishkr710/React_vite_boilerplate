import { Skeleton } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";

interface FormikValues {
  [key: string]: unknown;
}

interface Props {
  label: string;
  keyField: string;
  formik: FormikProps<FormikValues>;
  options: unknown[];
  required?: boolean;
  selectLabel?: string;
  readOnly?: boolean;
  isLoading?: boolean;
  fieldWrapStyle?: unknown;
}

const SelectFiled: React.FC<Props> = ({
  label,
  options = [],
  keyField,
  formik,
  selectLabel = "Select",
  required = true,
  readOnly = false,
  isLoading = false,
  fieldWrapStyle = {},
  ...props
}) => {
  const hasValue = formik?.values?.[keyField];
  return (
    <div className="field-wrap" style={fieldWrapStyle}>
      {label ? (
        <label htmlFor={keyField} style={{ whiteSpace: "nowrap" }}>
          {label}
          {required ? <span style={{ color: "red" }}> *</span> : null}
        </label>
      ) : null}
      {isLoading ? (
        <Skeleton height={80} animation="wave" />
      ) : (
        <select
          id={keyField}
          style={{
            pointerEvents: readOnly ? "none" : "all",
            cursor: readOnly ? "auto" : "pointer",
            fontSize: "13.3px",
            color: hasValue ? "#333" : "#666666",
          }}
          {...formik?.getFieldProps(keyField)}
          {...props}
        >
          <option value={""} disabled>
            {options.length ? selectLabel : "No options"}
          </option>
          {options.map(({ value, name, disabled = false }, index) => (
            <option value={value} key={index} disabled={disabled}>
              {name}
            </option>
          ))}
        </select>
      )}
      <div>
        {formik?.touched[keyField] && formik?.errors[keyField] ? (
          <div className="error-text">{`${formik?.errors?.[keyField]}`}</div>
        ) : null}
      </div>
    </div>
  );
};

export default SelectFiled;
