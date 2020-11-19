// @flow

import React from 'react';
import {
  compose,
  setDisplayName,
  withState,
} from 'recompose';

import { Row } from '@ncigdc/uikit/Flex';
import styled from '@ncigdc/theme/styled';
import CurrentFilters from '@ncigdc/components/CurrentFilters';
import TabbedLinks from '@ncigdc/components/TabbedLinks';
import UnstyledButton from '@ncigdc/uikit/UnstyledButton';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@ncigdc/theme/icons';
import SidePanel from '@ferlab-ui/core/panels/SidePanel';

import './QueryLayout.css';

const sidePadding = '2.5rem';

const ShowFacetsButton = styled.button({
  backgroundColor: ({ theme }) => theme.white,
  border: ({ theme }) => `1px solid ${theme.greyScale4}`,
  borderLeft: 'none',
  borderRadius: '0 0.4rem 0.4rem 0',
  flex: 'none',
  margin: `2.1rem 4rem auto -${sidePadding}`,
  outline: 'none',
  padding: 10,
});

type TProps = {
  facetTabs?: Array<Record<string, any>>;
  results?: mixed;
  showFacets: boolean;
  setShowFacets: Function;
  showRepositoryQuery: boolean;
};

const enhance = compose(
  setDisplayName('EnhancedSearchPage'),
  withState('showFacets', 'setShowFacets', true)
);

const QueryLayout = (
  {
    className = '',
    facetTabs = [],
    results = <span />,
    showFacets,
    setShowFacets,
    filtersLinkProps,
  }: TProps = {},
) => (
  <div className={`${className} query-layout`}>
    <SidePanel>
      <TabbedLinks
        defaultIndex={0}
        hideTabs={facetTabs.length <= 1}
        links={facetTabs}
        linkStyle={{
          paddingLeft: '1.2rem',
          paddingRight: '1.2rem',
        }}
        queryParam="facetTab"
        tabToolbar={(
          <UnstyledButton
            aria-label="Toggle Facet Panel Visibility"
            onClick={() => {
              setShowFacets(!showFacets);
            }}
            style={{ minHeight: 46 }}
            >
            <DoubleArrowLeftIcon />
          </UnstyledButton>
        )}
        />
    </SidePanel>
    <div className="query-layout-content">
      <Row style={{ marginBottom: '2rem' }}>
        {showFacets || (
          <ShowFacetsButton onClick={() => setShowFacets(!showFacets)}>
            <DoubleArrowRightIcon />
          </ShowFacetsButton>
        )}
        <CurrentFilters style={{ flex: 1 }} {...filtersLinkProps} />
      </Row>
      {results}
    </div>
  </div>
);

export default enhance(QueryLayout);
