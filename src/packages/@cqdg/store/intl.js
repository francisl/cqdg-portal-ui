import { fetchTranslations } from '@cqdg/locales/intl';

const SUCCESS = 'LANGUAGE_SUCCESS';
const languageSuccess = (payload) => {
  return {
    type: SUCCESS,
    payload,
  };
};

export const setLanguageAction = (langCode) => {
  return async (dispatch) => {
    const strings = await fetchTranslations(langCode);
    dispatch(languageSuccess({
      langCode,
      strings,
    }));
  };
};

const defaultState = {
  langCode: 'fr',
  strings: fetchTranslations('fr'),
};

function intl(state = defaultState, action) {
  switch (action.type) {
    case SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export default intl;
