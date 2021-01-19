import includes from 'lodash/includes';
import some from 'lodash/some';

import { inCurrentFilters } from '@cqdg/utils/filters';
import { IFilterGroup, IFilter } from 'cqdg-ui/core/containers/filters/Filters';
import { getCurrentFilters } from '@cqdg/store/query';
import t from '@cqdg/locales/intl';

export const getFacetType = (facet: IFilterGroup) => {
  let type = 'terms';

  if (facet.type === 'choice' || facet.type === 'terms' || facet.type === 'exact') {
    type = facet.type;
  }

  if (some([
    '_id',
    '_uuid',
    'md5sum',
    'file_name',
  ], idSuffix => includes(facet.field, idSuffix))) {
    type = 'exact';
  }

  if (facet.type === 'long' || facet.type === 'float') {
    type = 'range';
  }

  facet.visualType = type;
  return facet;
};

interface IAggregation {
  buckets: any[];
}

export const getFilters = (aggregation: IAggregation) => (
  aggregation
    ? aggregation.buckets.map(f => ({
      ...f,
      name: t(`aggregation.${f.key.trim().toLowerCase().split(' ').join('.')}`) || f.key,
      id: f.key.trim().toLowerCase().split(' ').join('.'),
    }))
    : []);

interface ISqonFilter {
  content: { value: string | string[] };
}

const getCurrentFilters3 = () => {
  const currentFilters = getCurrentFilters([]).content;

  if (!currentFilters || currentFilters.length === 0) { return []; }

  return currentFilters.map((filter: ISqonFilter) => ({
    ...filter,
    content: {
      ...filter.content,
      value: typeof filter.content.value === 'string'
            ? filter.content.value.toLowerCase()
            : filter.content.value.map((val) => val.toLowerCase()),
    },
  }
  ));
};

export const getSelectedFilters = (filters: IFilter[], filterGroup: IFilterGroup) => {
  const selectedSqon = getCurrentFilters3();

  return filters.reduce((acc: string[], v) => {
    if (inCurrentFilters({
      currentFilters: selectedSqon,
      dotField: filterGroup.field,
      key: v.key.toLowerCase(),
    })) {
      acc.push(v.key);
    }
    return acc;
  }, []);
};
