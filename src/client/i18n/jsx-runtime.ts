import {
  Fragment,
  jsx as reactJsx,
  jsxs as reactJsxs,
} from "react/jsx-runtime";
import { translateUiProps } from "./spanish";

export { Fragment };
export type { JSX } from "react/jsx-runtime";

export const jsx = (
  type: Parameters<typeof reactJsx>[0],
  props: Record<string, unknown> | null,
  key?: Parameters<typeof reactJsx>[2],
) => reactJsx(type, translateUiProps(props), key);

export const jsxs = (
  type: Parameters<typeof reactJsxs>[0],
  props: Record<string, unknown> | null,
  key?: Parameters<typeof reactJsxs>[2],
) => reactJsxs(type, translateUiProps(props), key);
