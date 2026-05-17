// toastService.js
import { Toaster, toast } from "sonner";

export const ToastService = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  warning: (msg) => toast.warning(msg),
  info: (msg) => toast.info(msg),
};
