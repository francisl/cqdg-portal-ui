// @flow

import React from 'react';
import { compose, branch, renderComponent } from 'recompose';
import Column from '@ncigdc/uikit/Flex/Column';
import EntityPageVerticalTable from '@ncigdc/components/EntityPageVerticalTable';
import Card from '@ncigdc/uikit/Card';
import CaseLink from '@ncigdc/components/Links/CaseLink';
import ProjectLink from '@ncigdc/components/Links/ProjectLink';
import FullWidthLayout from '@ncigdc/components/Layouts/FullWidthLayout';
import NotFound from '@ncigdc/components/NotFound';
import { withTheme } from '@ncigdc/theme';

export default compose(
  branch(
    ({ viewer }) => !viewer.annotations.hits.edges[0],
    renderComponent(() => <NotFound />),
  ),
  withTheme,
)(
  ({
    theme,
    viewer: { annotations: { hits: { edges } } },
    node = edges[0].node,
  }) => (
    <FullWidthLayout
      title={node.entity_id}
      entityType="AN"
      className="test-annotation-page"
    >
      <Column spacing={theme.spacing} className="test-annotation">
        <EntityPageVerticalTable
          id="summary"
          title={
            <span>
              <i className="fa fa-table" /> Summary
            </span>
          }
          thToTd={[
            { th: 'Annotation UUID', td: node.annotation_id },
            {
              th: 'Entity UUID',
              td: (
                <CaseLink
                  uuid={node.case_id}
                  query={
                    node.entity_type !== 'case' ? { bioId: node.entity_id } : {}
                  }
                  deepLink={
                    node.entity_type !== 'case' ? 'biospecimen' : undefined
                  }
                >
                  {node.entity_id}
                </CaseLink>
              ),
            },
            { th: 'Entity ID', td: node.entity_submitter_donor_id },
            { th: 'Entity type', td: node.entity_type },
            {
              th: 'Case UUID',
              td: <CaseLink uuid={node.case_id}>{node.case_id}</CaseLink>,
            },
            { th: 'Case ID', td: node.case_submitter_donor_id },
            {
              th: 'Project',
              td: (
                <ProjectLink uuid={node.project.project_id}>
                  {node.project.project_id}
                </ProjectLink>
              ),
            },
            { th: 'Classification', td: node.classification },
            { th: 'Category', td: node.category },
            { th: 'Created On', td: node.created_datetime },
            { th: 'Status', td: node.status },
          ]}
          style={{ flex: 1 }}
        />
        <Card title="NOTES">
          <div style={{ padding: 10 }}>{node.notes}</div>
        </Card>
      </Column>
    </FullWidthLayout>
  ),
);
