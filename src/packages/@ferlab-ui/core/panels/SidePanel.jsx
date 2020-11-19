import React from 'react';
import { compose, withStateHandlers } from 'recompose';

import GoThreeBar from 'react-icons/lib/go/three-bars';
import Button from '@ferlab-ui/core/buttons/button';
import './SidePanel.css';

type SidePanelProps = {
  children: React.children;
  collapsedStatus: boolean;
  toggleCollapseStatus: () => {};
}

const SidePanel = ({ children, collapsedStatus, toggleCollapseStatus }: SidePanelProps) => {
  return (
    <div className={`side-panel ${collapsedStatus ? 'side-panel-collapsed' : ''}`}>
      <div className="side-panel-header">
        <Button onClick={() => toggleCollapseStatus()} type="text">
          <GoThreeBar />
        </Button>
      </div>
      <div className="side-panel-content">{children}</div>
    </div>
  );
};

export default compose(
  withStateHandlers(
    (props) => ({
      collapsedStatus: props.isCollapsed || false,
    }),
    {
      toggleCollapseStatus: ({ collapsedStatus }) => () => ({
        collapsedStatus: !collapsedStatus,
      }),
    }
  )
)(SidePanel);
