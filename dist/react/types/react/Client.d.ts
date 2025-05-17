import type { JSX, HTMLAttributes } from "react";
import type { Client as ClientT } from "../types/client";
import type { FindClient } from "../client";
/**
 * Displays a client's name and rating. The component has 2 states one renders the client the other renders a link to create a client if one is not found.
 * @param query A query object for finding a client. @see findClient
 * @param customJSX A function for rendering a custom JSX structure. Provides all client information via a `params` argument.
 * @param linkProps Props for the link on the customer widget.
 * @param ratingLinkProps Props for the link to create a client when one isn't found.
 * @param nameProps Props for the `span` container element of the name.
 * @param ratingProps Props for the `span` container element of the rating.
 */
export default function Client({ query, customJSX, linkProps, ratingLinkProps, nameProps, ratingProps }: {
    query: FindClient;
    customJSX?: (props: ClientT | undefined) => JSX.Element;
    linkProps?: HTMLAttributes<HTMLAnchorElement>;
    ratingLinkProps?: HTMLAttributes<HTMLAnchorElement>;
    nameProps?: HTMLAttributes<HTMLSpanElement>;
    ratingProps?: HTMLAttributes<HTMLSpanElement>;
}): JSX.Element;
//# sourceMappingURL=Client.d.ts.map