import {
  parse,
} from 'query-string';
import { parseFilterParam } from '@cqdg/utils/uri';

export const updateQuery = (history, query) => {
  history.push(query);
};

export const getCurrentQuery = () => parse(window.location.search);

export const getCurrentFilters = (defaultValue = {}) => {
  const query = getCurrentQuery();
  return query && parseFilterParam((query || {}).filters, defaultValue);
};

export const removeFilter = (field, query) => {
  if (!query) {
    return null;
  } if (!field) {
    return query;
  } if (Object.keys(query).length === 0) {
    return null;
  }
  if (!Array.isArray(query.content)) {
    const fieldFilter =
      typeof field === 'function' ? field : (f: string) => f === field;
    return fieldFilter(query.content.field) ? null : query;
  }

  const filteredContent = query.content
    .map(q => removeFilter(field, q))
    .filter(Boolean);

  return filteredContent.length
    ? {
      op: query.op,
      content: filteredContent,
    }
    : null;
};

export const resetQuery = (fieldName) => {
  const newFilters = removeFilter(fieldName, getCurrentFilters());
  return {
    ...getCurrentQuery(),
    offset: 0,
    filters: newFilters,
  };
};
