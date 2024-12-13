import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const success = (
  msg: string,
  autoClose = 3000,
  position = "top-right"
) =>
  toast.success(msg, {
    //position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: false,
    progress: undefined,
  });
export const failed = (msg: string, autoClose = 3000, position = "top-right") =>
  toast.error(msg, {
    //position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: false,
    progress: undefined,
  });
export const info = (msg: string, autoClose = 3000, position = "top-right") =>
  toast.info(msg, {
    //position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: false,
    progress: undefined,
  });
