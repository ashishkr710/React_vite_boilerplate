import { default as dayjs } from "dayjs";
import parse from "html-react-parser";

export const formatDate = (date: number) =>
  dayjs(date).format("MMMM D, YYYY h:mm A");

export const HtmlParser = (content: string) => {
  return parse(content);
};
export function formatFileSize(bytes: number, decimalPoint: number = 2) {
  if (bytes == 0) return "0 Bytes";
  const k = 1000,
    dm = decimalPoint,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
