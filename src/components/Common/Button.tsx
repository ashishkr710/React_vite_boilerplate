import clsx from "clsx";
import * as React from "react";
import { CircularProgress } from "@mui/material";

const variants = {
  primary: "primary-btn",
  secondary: "secondary-btn",
};

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "reset" | "button";
  className?: string;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      type = "button",
      className = "",
      variant = "primary",
      isLoading = false,
      startIcon,
      endIcon,
      disabled = false,
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx("custom-btn", variants[variant], className)}
        disabled={isLoading || disabled}
        style={{
          width: "fit-content",
          position: "relative",
          ...style,
        }}
        {...props}
      >
        {isLoading && (
          <CircularProgress
            style={{
              background: "transparent",
              width: "1rem",
              height: "1rem",
              position: "absolute",
              left: "7px",
            }}
            color={"inherit"}
            size="sm"
            thickness={4}
          />
        )}
        {!isLoading && startIcon}
        {children ? <span>{children}</span> : null}
        {!isLoading && endIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
