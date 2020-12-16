import { ReactNode } from 'react';
import { IUriQuery, IRawQuery } from '@cqdg/utils/uri/types';

export type TMergeEnum = boolean | 'toggle' | 'replace' | 'add';

export type TMergeQuery = (
  q: IUriQuery,
  c: IRawQuery,
  t: TMergeEnum,
  w?: string[]
) => IUriQuery;

export interface IListLinkProps {
  children?: ReactNode;
  merge?: TMergeEnum;
  mergeQuery?: TMergeQuery;
  pathname?: string;
  query?: IUriQuery;
  whitelist?: string[];
}

export interface IIdLinkProps {
  uuid?: string;
  style?: object;
}

export type TLinkProps = IListLinkProps & IIdLinkProps;
