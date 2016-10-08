/* @flow */

import React from 'react';
import Relay from 'react-relay';

import CaseTBody from './CaseTBody';
import Pagination from './Pagination';

export type TProps = {
  hits: {
    edges: [],
    pagination: {
      count: number,
      total: number,
    },
  },
};

export const CaseTableComponent = (props: TProps) => (
  <div>
    <h2>{`Cases ${props.hits.pagination.count} : ${props.hits.pagination.total}`}</h2>
    <table>
      <thead>
        <tr>
          <th>Case UUID</th>
          <th>Project</th>
          <th>Primary Site</th>
          <th>Gender</th>
        </tr>
      </thead>
      <CaseTBody edges={props.hits.edges} />
    </table>
    <Pagination pagination={props.hits.pagination} />
  </div>
);

export const CaseTableQuery = {
  fragments: {
    hits: () => Relay.QL`
      fragment on CaseConnection {
        pagination {
          count
          total
          ${Pagination.getFragment('pagination')}
        }
        edges {
          ${CaseTBody.getFragment('edges')}
        }
      }
    `,
  },
};

const CaseTable = Relay.createContainer(
  CaseTableComponent,
  CaseTableQuery
);

export default CaseTable;
