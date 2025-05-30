/**
 * Authorizes a connection to Commerce Karma by geting the api key from the url and saving it to cookies.
 * @param location The window location search object
 * @returns The API key for Commerce Karma
 */
export default function authorize(location?: string) {
  const windowLocation = location || window.location.search;
  const urlParams = new URLSearchParams(windowLocation);
  const apiKey = urlParams.get("CkApiKey");

  const cookieIndex = document.cookie.split(";").indexOf("commerce-karma-api-key");

  if (cookieIndex !== -1) {
    return document.cookie.split(";")[cookieIndex];
  } else if (!apiKey && cookieIndex === -1) {
    throw new Error("Error failed to authorized");
  }

  document.cookie = `commerce-karma-api-key=${apiKey};`;

  return apiKey;
}
