// @flow
import React from 'react';

import QueryBuilder from '@cqdg/components/queryBuilder/QueryBuilder';
import SidePanel from 'cqdg-ui/core/panels/SidePanel';

import './QueryLayout.css';

type TProps = {
  sidePanelComponent?: React.Component | null;
  results?: mixed;
  showRepositoryQuery: boolean;
};

const QueryLayout = (
  {
    className = '',
    sidePanelComponent,
    results = <span />,
    filtersLinkProps,
  }: TProps = {},
) => (
  <div className={`${className} query-layout`}>
    <SidePanel>
      {sidePanelComponent}
    </SidePanel>
    <div className="query-layout-content">
      <QueryBuilder
        {...filtersLinkProps}
        />
      {results}
    </div>
  </div>
);

export default QueryLayout;
