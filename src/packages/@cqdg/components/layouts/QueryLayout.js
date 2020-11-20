// @flow
import React from 'react';

import CurrentFilters from '@ncigdc/components/CurrentFilters';
import SidePanel from '@ferlab-ui/core/panels/SidePanel';

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
      <CurrentFilters
        style={{
          backgroundColor: '#D8E1EB',
          color: '#18486B',
          fontSize: '14px',
          flex: 1,
          padding: '0px 10px',
        }}
        {...filtersLinkProps}
        />
      {results}
    </div>
  </div>
);

export default QueryLayout;
