import { toast } from "react-toastify";

const success = "success";
const error = "error";
const warn = "warn";
const info = "info";

const toastify = (type = success, msg) => {
  switch (type) {
    case success:
      return toast.success(msg, {
        position: "top-center",
      });

    case error:
      return toast.error(msg, {
        position: "top-center",
      });

    case warn:
      return toast.warn(msg, {
        position: "top-center",
      });

    case info:
      return toast.info(msg, {
        position: "top-center",
      });
    default:
      return toast.success(msg, {
        position: "top-center",
      });
  }
};

export default toastify;
