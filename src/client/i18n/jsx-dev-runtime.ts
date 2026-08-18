import { Fragment, jsxDEV as reactJsxDev } from "react/jsx-dev-runtime";
import { translateUiProps } from "./spanish";

export { Fragment };
export type { JSX } from "react/jsx-dev-runtime";

export const jsxDEV = ((
  type: Parameters<typeof reactJsxDev>[0],
  props: Parameters<typeof reactJsxDev>[1],
  key: Parameters<typeof reactJsxDev>[2],
  isStaticChildren: Parameters<typeof reactJsxDev>[3],
  source: Parameters<typeof reactJsxDev>[4],
  self: Parameters<typeof reactJsxDev>[5],
) =>
  reactJsxDev(
    type,
    translateUiProps(props),
    key,
    isStaticChildren,
    source,
    self,
  )) as typeof reactJsxDev;
