/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { withTheme } from '@ncigdc/theme';
import Link from '@ncigdc/components/Links/Link';
import StackLayout from '@ferlab-ui/core/layouts/StackLayout';

import './Tab.css';

const Tabs = ({
  activeKey,
  children,
  panes,
  tabsKey, // should be removed and use a callback instead, leaky abstraction
  tabToolbar,
}) => (
  <div className="containers-tab-layout">
    <div className="containers-tab-nav">
      {panes.map((pane) => {
        return (
          <div
            className={`containers-tab ${activeKey === pane.id ? 'active' : ''}`}
            key={pane.id}
            >
            <Link
              className="containers-tab-link"
              key={pane.id}
              merge
              query={{
                [tabsKey]: pane.id,
              }}
              >
              {pane.text}
            </Link>
          </div>
        );
      })}
      {tabToolbar && <span style={{ marginLeft: 'auto' }}>{tabToolbar}</span>}
    </div>
    <StackLayout>
      {children}
    </StackLayout>
  </div>
);

export default withTheme(Tabs);
