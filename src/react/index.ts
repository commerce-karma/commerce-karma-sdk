if (!window || !document) {
  throw new Error(
    "The Commerce Karma React integration must run on the browser with access to the window and document. If you are seeing this error you could be using server components."
  );
}

export { default as Connect } from "./Connect";
export { default as Client } from "./Client";
