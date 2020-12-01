import jsurl from 'jsurl';

export const parseIntParam = (str, defaults = null) =>
  (str ? Math.max(parseInt(str, 10), 0) : defaults);

export const parseJSONParam: TParseJSONParam = (str, defaults = {}) => {
  if (str) {
    try {
      return JSON.parse(str) || defaults;
    } catch (err) {
      return jsurl.parse(str) || defaults;
    }
  } else {
    return defaults;
  }
};

export const stringifyJSONParam = (str, defaults) =>
  (str ? JSON.stringify(str) : defaults);

export const parseFilterParam = parseJSONParam;
