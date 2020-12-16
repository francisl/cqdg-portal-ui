/* @flow */

import React from 'react';
import _ from 'lodash';
import { NavLink as Link } from 'react-router-dom';
import { stringify } from 'query-string';
import { stringifyJSONParam } from '@cqdg/utils/uri';
import { removeEmptyKeys } from '@cqdg/utils/object';

import validAttributes from '@cqdg/components/Links/validAttributes';
import { scrollToId } from '@cqdg/components/Links/deepLink';

import { TLinkProps } from './types';

const reactRouterLinkProps = [
  'to',
  'replace',
  'activeClassName',
  'activeStyle',
  'exact',
  'strict',
  'isActive',
];

const InternalLink = ({
  deepLink,
  pathname,
  query,
  search,
  ...rest
}: TLinkProps) => {
  const q0 = query || {};
  const f0 = q0.filters ? stringifyJSONParam(q0.filters) : null;

  const q1 = {
    ...q0,
    filters: f0,
  };

  const q = removeEmptyKeys(q1);

  const validAttrProps = validAttributes(rest);
  const validLinkProps = _.pick(rest, reactRouterLinkProps);

  return (
    <Link
      to={{
        pathname,
        search: search || stringify(q),
      }}
      {...validAttrProps}
      {...validLinkProps}
      onClick={event => {
        if (validAttrProps.onClick) {
          validAttrProps.onClick(event);
        }
        if (deepLink) {
          scrollToId(deepLink);
        }
      }}
      />
  );
};

export default InternalLink;
