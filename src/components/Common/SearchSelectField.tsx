import { Autocomplete, Skeleton, TextField } from "@mui/material";
import { FormikProps } from "formik";
import React, { useEffect, useState } from "react";

interface FormikValues {
  [key: string]: unknown;
}

interface Props {
  label: string;
  keyField: string;
  formik: FormikProps<FormikValues>;
  options: { label: string; id: number }[];
  required?: boolean;
  selectLabel?: string;
  placeholder?: string;
  readOnly?: boolean;
  isLoading?: boolean;
  fieldWrapStyle?: React.CSSProperties;
  defaultValue?: null | number;
}

const SearchSelectField: React.FC<Props> = ({
  label,
  options = [],
  keyField,
  formik,
  required = true,
  placeholder = "Select",
  readOnly = false,
  isLoading = false,
  fieldWrapStyle = {},
  defaultValue = null, // patientUserId
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  // Update inputValue when defaultValue changes
  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.find(
        (option) => option.id === defaultValue
      );
      if (defaultOption) {
        setInputValue(defaultOption.label);
        formik.setFieldValue(keyField, defaultOption.id);
      }
    }
  }, [defaultValue, options]);

  const handleChange = (
    event: any,
    newValue: { label: string; id: number } | null
  ) => {
    setInputValue(newValue ? newValue.label : "");
    formik.setFieldValue(keyField, newValue ? newValue.id : null);
  };

  const selectedValue = React.useMemo(() => {
    return options.find((v) => v.id === formik.values[keyField]) || null;
  }, [formik.values[keyField], options]);

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
        <Autocomplete
          id={keyField}
          options={options}
          readOnly={readOnly}
          value={selectedValue}
          onChange={handleChange}
          inputValue={inputValue}
          onInputChange={(event: any, newValue: string) => {
            setInputValue(newValue);
          }}
          onBlur={formik.handleBlur} // so formik can see the form's touched state
          getOptionLabel={(option) => option.label || ""}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{
            marginTop: "8px !important",
            "& input": {
              fontSize: "13.3px",
              padding: "9px 4px !important",
              textTransform: "capitalize",
              border: "0px solid transparent !important",
              marginTop: "0px !important",
            },
            "& fieldset": {
              border: "1px solid #ECF1F3 !important",
            },
            "& .MuiOutlinedInput-root:hover fieldset": {
              border: "1px solid #000 !important",
            },
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder={placeholder} />
          )}
        />
      )}

      <div>
        {formik?.touched[keyField] && formik?.errors[keyField] ? (
          <div className="error-text">{formik.errors[keyField]}</div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchSelectField;
