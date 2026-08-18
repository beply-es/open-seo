import { Fragment, jsxDEV as reactJsxDev } from "react/jsx-dev-runtime";
import { translateUiProps } from "./spanish";

export { Fragment };
export type { JSX } from "react/jsx-dev-runtime";

// eslint-disable-next-line max-params -- React's jsxDEV runtime contract has six positional parameters.
export const jsxDEV = (
  type: Parameters<typeof reactJsxDev>[0],
  props: Record<string, unknown> | null,
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
  );
