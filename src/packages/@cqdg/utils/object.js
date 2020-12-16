export const removeEmptyKeys = (obj) =>
  Object.entries(obj || {}).reduce((acc, [key, value]) => (value
    ? {
      ...acc,
      [key]: value,
    }
    : acc
  ), {});
