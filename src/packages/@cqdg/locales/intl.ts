import { store } from '../../../Root';

const interpolate = (str: string, obj: object) => {
  const [keys, values] = [Object.keys(obj), Object.values(obj)];
  return new Function(...keys, `return \`${str}\`;`)(...values);
};

// flatten the nested key to be access like `key['global.action.goto']`
const flatLocale = (locale: object, path: string[] = [], data = {}) => {
  Object.entries(locale).forEach((d) => {
    const [key, value] = d;
    if (typeof value === 'object') {
      flatLocale(value, path.concat(key), data);
    } else {
      data[path.concat(key).join('.')] = value;
    }
  });
  return data;
};

const getDictionary = () => {
  const { intl } = store.getState();
  return flatLocale(intl.strings);
};

export const fetchTranslations = (langCode = 'fr') =>
  import(`@cqdg/locales/${langCode}/translation.json`).then((strings) => strings);

export const getBrowserLanguage = () => navigator.languages[0].split('-')[0];

// translate string
const t = (key: string, values: object | null = null) => {
  const dictionary = getDictionary();
  const translation = dictionary[key];
  return values === null ? translation : interpolate(translation, values);
};

export default t;
