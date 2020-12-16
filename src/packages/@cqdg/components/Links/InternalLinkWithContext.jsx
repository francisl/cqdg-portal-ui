/* @flow */
import React from 'react';

import isEqual from 'lodash/isEqual';
import every from 'lodash/every';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import mapValues from 'lodash/mapValues';
import some from 'lodash/some';

import { mergeQuery as mq } from '@cqdg/utils/filters';

import {
  getCurrentQuery,
} from '@cqdg/store/query';
import InternalLink from './InternalLink';

import { TLinkProps } from './types';

const InternalLinkWithContext = ({
  forceResetOffset = false,
  merge,
  mergeQuery = mq,
  pathname,
  query,
  whitelist,
  ...rest
}: TLinkProps) => {
  const { location } = window;

  const pn = pathname || location.pathname;
  const contextQuery = getCurrentQuery();
  const mergedQuery =
  merge && mergeQuery
    ? mergeQuery(query, contextQuery, merge, whitelist)
    : query;

  const hasFilterChanged = some([
    isEqual(
      get(mergedQuery, 'filters'),
      get(mergeQuery({}, contextQuery), 'filters'),
    ),
    every(
      [get(contextQuery, 'filters'), get(mergedQuery, 'filters')],
      isNil,
    ),
  ]);

  const queryWithOffsetsReset = hasFilterChanged && !forceResetOffset
  ? mergedQuery
  : mapValues(
    mergedQuery,
    (value, paramName) => (paramName.endsWith('offset') || paramName.endsWith('size') ? 0 : value),
  );

  return (
    <InternalLink pathname={pn} query={queryWithOffsetsReset} {...rest} />
  );
};

// InternalLinkWithContext.defaultProps = {
//   mergeQuery: mq,
// };

export default InternalLinkWithContext;
