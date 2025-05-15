export const removeFalsyValues = (obj: any) => {
  const returnObj: any = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] || (Array.isArray(obj[key]) && obj[key].length > 0)) {
      returnObj[key] = obj[key];
    }
  });

  return returnObj;
};
