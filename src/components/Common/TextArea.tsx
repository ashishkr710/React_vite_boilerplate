import React from "react";
import { FormikProps } from "formik";
interface FormikValues {
  [key: string]: any;
}

interface Props {
  label: string;
  keyField: string;
  formik: FormikProps<FormikValues>;
  required?: boolean;
  placeholder?: string;
  className?: string;
  outerDivStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}
const TextArea: React.FC<Props> = ({
  label,
  keyField,
  formik,
  required = true,
  placeholder,
  outerDivStyle = {},
  ...props
}) => {
  return (
    <div className="field-wrap" style={outerDivStyle}>
      {label ? (
        <label htmlFor={keyField}>
          {label}
          {required ? <span style={{ color: "red" }}> *</span> : null}
        </label>
      ) : null}
      <div>
        <textarea
          style={{
            minHeight: "5rem",
            padding: "5px 10px",
            width: "100%",
          }}
          id={keyField}
          placeholder={placeholder}
          {...formik?.getFieldProps(keyField)}
          {...props}
        />
      </div>
      <div>
        {formik?.touched?.[keyField] && formik?.errors?.[keyField] ? (
          <div className="error-text">{`${formik?.errors?.[keyField]}`}</div>
        ) : null}
      </div>
    </div>
  );
};

export default TextArea;
