/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { css } from 'glamor';
import { withTheme } from '@ncigdc/theme';
import { Column } from '@ncigdc/uikit/Flex';
import Link from '@ncigdc/components/Links/Link';

import './Tab.css';

const borderStyle = theme => `1px solid ${theme.greyScale4}`;

const tabBorder = (theme, side) => ({
  borderBottom: side && borderStyle(theme),
  borderLeft: borderStyle(theme),
  borderRight: !side && borderStyle(theme),
  borderTop: borderStyle(theme),
});

const styles = {
  active: (theme, side) => css({
    backgroundColor: '#fff',
    ...tabBorder(theme, side),
    ':hover': {
      backgroundColor: 'white',
    },
    left: '0px',
    position: 'relative',
    zIndex: 2,
  }),
  content: theme => ({
    backgroundColor: '#fff',
    border: borderStyle(theme),
  }),
  inactive: (theme, side) => css({
    ':hover': {
      backgroundColor: Color(theme.greyScale6)
        .darken(0.05)
        .rgbString(),
      color: '#000',
      ...tabBorder(theme, side),
      textDecoration: 'none',
    },
  }),
  margin: side => css({
    marginLeft: !side && '0.4rem',
    marginTop: side && '0.4rem',
  }),
};

const Tabs = ({
  activeKey,
  children,
  contentStyle = {},
  onTabClick,
  panes,
  tabToolbar,
  tabsKey,
  theme,
}) => (
  <div className="containers-tab-layout">
    <div className="containers-tab-nav">
      {panes.map(({
        filters = null,
        id,
        merge,
        text,
      }) => (
        <div
          className={`containers-tab ${activeKey === id ? 'active' : ''}`}
          key={id}
          onClick={() => (onTabClick ? onTabClick(activeKey) : () => {})}
          >
          <Link
            className="containers-tab-link"
            key={id}
            merge={merge || true}
            query={{
              filters,
              [tabsKey]: id,
            }}
            >
            {text}
          </Link>
        </div>
      ))}
      {tabToolbar && <span style={{ marginLeft: 'auto' }}>{tabToolbar}</span>}
    </div>
    <Column>
      {children}
    </Column>
  </div>
);

Tabs.propTypes = {
  activeIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  style: PropTypes.object,
  tabs: PropTypes.node,
};

export default withTheme(Tabs);
