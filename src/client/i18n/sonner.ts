import { toast as baseToast } from "sonner";
import { translateUiText } from "./spanish";

export { Toaster } from "sonner";

function translateFirstArgument(args: unknown[]): unknown[] {
  if (typeof args[0] !== "string") return args;
  return [translateUiText(args[0]), ...args.slice(1)];
}

export const toast: typeof baseToast = new Proxy(baseToast, {
  apply(target, thisArg, args: unknown[]) {
    return Reflect.apply(target, thisArg, translateFirstArgument(args));
  },
  get(target, property, receiver) {
    const value = Reflect.get(target, property, receiver);
    if (typeof value !== "function") return value;

    return (...args: unknown[]) =>
      Reflect.apply(value, target, translateFirstArgument(args));
  },
});
