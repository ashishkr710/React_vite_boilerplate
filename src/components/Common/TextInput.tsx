import React, { useRef, useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FormikProps } from "formik";

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
  rightIcon?: React.ReactNode | string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: any;
  error?: string;
}

const TextInput: React.FC<Props> = ({
  label,
  icon = false,
  type = "text",
  keyField,
  formik,
  disabled = false,
  rightIcon = false,
  required = true,
  className = "",
  placeholder = "",
  style = {},
  error = "",
  ...props
}) => {
  const [showPass, setShowPass] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (formik?.touched?.[keyField] && formik?.errors?.[keyField] && inputRef.current) {
      inputRef.current.focus();
    }
  }, [formik?.touched?.[keyField], formik?.errors?.[keyField]]);

  const inputTypeWise = (type: string) => {
    switch (type) {
      case "phone":
        return (
          <PhoneInput
            country={"us"}
            value={formik?.values?.[keyField] as string}
            onChange={(phone) => {
              formik?.setFieldValue?.(keyField, phone);
            }}
            inputStyle={{
              width: "100%",
              border: "1px solid #ECF1F3",
              height: "100%",
            }}
            containerStyle={{
              height: "56px",
              border: "1px solid transparent",
              borderRadius: "4px",
            }}
            placeholder={placeholder}
            disabled={disabled}
            {...props}
          />
        );
      case "password":
        return (
          <div className="password-info">
            <input
              type={showPass ? "text" : "password"}
              placeholder={placeholder}
              className="input-password"
              {...formik?.getFieldProps?.(keyField)}
              {...props}
              ref={inputRef as React.RefObject<HTMLInputElement>}
              disabled={disabled}
            />
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                className="eye-icon"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          </div>
        );
      default:
        return (
          <input
            id={keyField}
            type={type}
            placeholder={placeholder}
            {...formik?.getFieldProps?.(keyField)}
            {...props}
            ref={inputRef}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <div className={`field-wrap ${className}`} style={style}>
      <label htmlFor={keyField}>
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </label>
      <div className={`${icon ? "input-icon" : ""}`}>
        {icon && (typeof icon === "object" ? icon : <img src={icon as string} alt="" title="" />)}
        {inputTypeWise(type)}
        {rightIcon &&
          (typeof rightIcon === "object" ? rightIcon : <img src={rightIcon as string} alt="" title="" />)}
      </div>
      <div>
        {error ? (
          <div className="error-text">{error}</div>
        ) : formik?.touched?.[keyField] && formik?.errors?.[keyField] ? (
          <div className="error-text">{formik?.errors?.[keyField]}</div>
        ) : null}
      </div>
    </div>
  );
};

export default TextInput;
