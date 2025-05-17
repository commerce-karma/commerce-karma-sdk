import type { ButtonHTMLAttributes, JSX } from "react";
export type JSXProps = {
  onClick: () => void;
  disabled: boolean;
};
/**
 * A simple unstyled pre-built connect component for clientside React. The component works out of the box saving a Commerce Karma API into cookies. Syncing the cookie accross browser needes to by done by the host application.
 * @param customJSX You can use your own custom JSX code for the button by passing a function that accepts a `props` attribute with type @see JSXProps and returns your desired JSX structure. Note you *must* spread these props somewhere in the JSX.
 * @param props Standard button element props. Note these props are not applied when using customJSX.
 */
export default function Connect({
  customJSX,
  ...props
}: {
  customJSX?: (props: JSXProps) => JSX.Element;
} & ButtonHTMLAttributes<any>): JSX.Element;
//# sourceMappingURL=Connect.d.ts.map
