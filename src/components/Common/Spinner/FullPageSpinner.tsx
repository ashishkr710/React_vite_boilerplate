import React from "react";
//import { CircularProgress } from '@mui/material';
import { Style } from "@typing/global";
import { CircularProgress } from "@mui/material";

interface Root {
  loadingText?: string;
  style?: React.CSSProperties;
}

export const FullPageSpinner = ({
  loadingText = "loading",
  style = {},
}: Root) => {
  const customStyle: Style = {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "99999",
    display: "flex",
    //backgroundColor: 'rgb(0 0 0 / 20%)',
    color: "#000",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    ...style,
  };
  return (
    <div style={customStyle}>
      <CircularProgress size={"5rem"} thickness={4} />
      <span style={{ textTransform: "capitalize", fontSize: "2rem" }}>
        {loadingText}
      </span>
    </div>
  );
};
