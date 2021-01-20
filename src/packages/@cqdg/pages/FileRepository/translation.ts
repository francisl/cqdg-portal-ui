import { IDictionary } from 'cqdg-ui/core/containers/filters/types/dictionary';
import t from '@cqdg/locales/intl';


const getTranslatedText = (): IDictionary => ({
  actions: {
    all: t('global.select.all'),
    apply: 'void',
    clear: t('facet.actions.reset'),
    less: t('global.less'),
    more: t('global.more'),
    none: t('global.none'),
    searchPlaceholder: 'void',
  },
  globalSearch: {
    infoTooltip: 'void',
    placeholder: 'void',
  },
  messages: {
    errorNoData: t('no.data.for.field'),
    errorNotFound: t('no.matching.values'),
  },
  multiChoice: {
    searchPlaceholder: t('search.search'),
  },
});

export default getTranslatedText;
