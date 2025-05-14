"use client";

import { useEffect, useState } from "react";
import type { ButtonHTMLAttributes, JSX } from "react";
import { authorize, commerceKarmaURL } from "../";

export type JSXProps = { onClick: () => void; disabled: boolean };

/**
 * A simple unstyled pre-built connect component for clientside React. The component works out of the box saving a Commerce Karma API into cookies. Syncing the cookie accross browser needes to by done by the host application.
 * @param customJSX You can use your own custom JSX code for the button by passing a function that accepts a `props` attribute with type @see JSXProps and returns your desired JSX structure. Note you *must* spread these props somewhere in the JSX.
 * @param props Standard button element props. Note these props are not applied when using customJSX.
 */
export default function Connect({
  customJSX,
  ...props
}: { customJSX?: (props: JSXProps) => JSX.Element } & ButtonHTMLAttributes<any>) {
  const [isAuthed, setIsAuthed] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const apiKey = urlParams.get("CkApiKey");

  useEffect(() => {
    if (document.cookie.includes("commerce-karma-api-key")) {
      setIsAuthed(true);
    } else if (!document.cookie.includes("commerce-karma-api-key") && apiKey) {
      try {
        authorize();
        setIsAuthed(true);
      } catch (err) {
        setIsAuthed(false);
        alert(`Failed to connect to Commerce Karma! Please try again. Error: ${err}`);
      }
    }
  });

  const onConnect = () => {
    if (isAuthed) return;

    if (!apiKey) {
      window.location.replace(
        `${commerceKarmaURL}/integration?appDomain=${window.location.hostname}&redirectTo=${window.location.href}`
      );
    }
  };

  const jsxProps: JSXProps = { onClick: () => onConnect(), disabled: isAuthed };

  return typeof customJSX === "function" ? (
    customJSX(jsxProps)
  ) : (
    <button {...jsxProps} {...props}>
      {jsxProps.disabled ? "Connected" : "Connect"}
    </button>
  );
}
