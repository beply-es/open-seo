import { toast as baseToast } from "sonner";
import { translateUiText } from "./spanish";

export { Toaster } from "sonner";

type SuccessMessage = Parameters<typeof baseToast.success>[0];
type SuccessOptions = Parameters<typeof baseToast.success>[1];
type ErrorMessage = Parameters<typeof baseToast.error>[0];
type ErrorOptions = Parameters<typeof baseToast.error>[1];
type InfoMessage = Parameters<typeof baseToast.info>[0];
type InfoOptions = Parameters<typeof baseToast.info>[1];

export const toast = {
  success(message: SuccessMessage, options?: SuccessOptions) {
    return baseToast.success(
      typeof message === "string" ? translateUiText(message) : message,
      options,
    );
  },
  error(message: ErrorMessage, options?: ErrorOptions) {
    return baseToast.error(
      typeof message === "string" ? translateUiText(message) : message,
      options,
    );
  },
  info(message: InfoMessage, options?: InfoOptions) {
    return baseToast.info(
      typeof message === "string" ? translateUiText(message) : message,
      options,
    );
  },
};
