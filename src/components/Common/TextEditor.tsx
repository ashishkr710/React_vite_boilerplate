import React from "react";
import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormikProps, FormikValues } from "formik";

interface Props {
  keyField: string;
  formik: FormikProps<FormikValues>;
  label: string;
  readOnly?: boolean;
  required?: boolean;
}

const TextEditor = ({
  keyField,
  formik,
  label,
  readOnly = false,
  required = true,
}: Props) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: readOnly, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: formik.values[keyField] ? "" : "Start writing...",
    }),
    []
  );

  const handleChange = (newContent: string) => {
    setContent(newContent);
    formik.setFieldValue(keyField, newContent);
  };

  useEffect(() => {
    setContent(formik.values[keyField]);
  }, []);

  return (
    <div className="field-wrap">
      <label>
        {label}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </label>
      <JoditEditor
        ref={editorRef}
        value={content}
        config={config}
        //tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => handleChange(newContent)}
      />
      <div>
        {formik?.touched[keyField] && formik?.errors[keyField] ? (
          <div className="error-text">{`${formik?.errors[keyField]}`}</div>
        ) : null}
      </div>
    </div>
  );
};

export default TextEditor;
