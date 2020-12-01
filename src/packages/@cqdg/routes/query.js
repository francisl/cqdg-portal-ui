import pick from 'lodash/pick';

import { stringifyJSONParam } from '@ncigdc/utils/uri';
import removeEmptyKeys from '@ncigdc/utils/removeEmptyKeys';
import validAttributes from '@ncigdc/theme/utils/validAttributes';
import { stringify } from 'query-string';

const reactRouterLinkProps = [
  'to',
  'replace',
  'activeClassName',
  'activeStyle',
  'exact',
  'strict',
  'isActive',
];

export const genereQuery = (query, ...rest) => {
  const q0 = query || {};
  const f0 = q0.filters ? stringifyJSONParam(q0.filters) : null;

  const q1 = {
    ...q0,
    filters: f0,
  };

  const q = removeEmptyKeys(q1);

  const validAttrProps = validAttributes(rest);
  const validLinkProps = pick(rest, reactRouterLinkProps);

  console.log('q : ', q);
  return stringify(q);
};


export const requestQuery = (history, query) => {
  console.log('push to : ', query);
  history.push(query);
};
