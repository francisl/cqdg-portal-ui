/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { get } from 'lodash';

import LocationSubscriber from '@ncigdc/components/LocationSubscriber';
import { Tab } from '@ferlab-ui/core/containers/tabs';
import Link from '@ncigdc/components/Links/Link';
import '@ferlab-ui/core/containers/tabs/Tabs.css';

type TTabbedLinksProps = {
  defaultIndex?: number;
  panes: Array<Record<string, any>>;
  queryParam: string;
  tabToolbar?: React.Element<>;
  side?: boolean;
  defaultContent?: React.Element<{}>;
};

type TTabbedLinks = (props: TTabbedLinksProps) => React.Element<{}>;

const Tabs: TTabbedLinks = ({
  defaultContent,
  defaultIndex = 0,
  panes,
  queryParam,
  side,
  tabToolbar,
} = {}) => (
  <LocationSubscriber>
    {(ctx: { pathname: string; query: IRawQuery }) => {
      const foundIndex = panes.findIndex(
        x => x.id === (ctx.query || {})[queryParam],
      );

      const activeIndex = defaultContent
        ? foundIndex
        : foundIndex < 0 ? defaultIndex : foundIndex;

      return (
        <Tab
          activeKey={ctx.query[queryParam]}
          panes={panes}
          side={side}
          tabsKey={queryParam}
          tabToolbar={tabToolbar}
          >
          {get(panes, [activeIndex, 'component'], defaultContent)}
        </Tab>
      );
    }}
  </LocationSubscriber>
);

export default Tabs;
