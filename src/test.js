const commerceKarmaBackendURL = "https://7o1h60hh44.execute-api.us-east-1.amazonaws.com";

export const removeFalsyValues = (obj) => {
  const returnObj = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] || (Array.isArray(obj[key]) && obj[key].length > 0)) {
      returnObj[key] = obj[key];
    }
  });

  return returnObj;
};

/**
 * Authorizes a connection to Commerce Karma by geting the api key from the url and saving it to cookies.
 * @param location The window location search object
 * @returns The API key for Commerce Karma
 */
export default function authorize(location) {
  const windowLocation = location || window.location.search;
  const urlParams = new URLSearchParams(windowLocation);
  const apiKey = urlParams.get("CkApiKey");

  const cookieIndex = document.cookie.split(";").indexOf("commerce-karma-api-key");

  if (cookieIndex !== -1) {
    return document.cookie.split(";")[cookieIndex];
  }

  document.cookie = `commerce-karma-api-key=${apiKey};`;

  return apiKey;
}

