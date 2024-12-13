import React from "react";
import { CircularProgress } from "@mui/material";
import { Style } from "@typing/global";

interface Root {
  size: string | number;
  className: string;
  style: Style;
}

export const Spinner = ({
  size = "5rem",
  className = "",
  style = {},
}: Root) => {
  return (
    <div className={className}>
      <CircularProgress size={size} thickness={4} style={style} />
      <span className="sr-only">Loading</span>
    </div>
  );
};
