/* @flow */

import React from 'react';
import Relay from 'react-relay';

import ProjectTable from './ProjectTable';
import ProjectAggregations from './ProjectAggregations';

export type TProps = {
  viewer: {
    projects: {
      aggregations: string,
      hits: string,
    },
  },
};

export const ProjectsPageComponent = (props: TProps) => (
  <div style={{ flex: 1 }}>
    <aside style={{ flex: '0 0 12em' }}>
      <ProjectAggregations aggregations={props.viewer.projects.aggregations} />
    </aside>
    <section style={{ flex: 1 }}>
      <ProjectTable hits={props.viewer.projects.hits} />
    </section>
  </div>
);

export const ProjectsPageQuery = {
  initialVariables: {
    first: 0,
    offset: 0,
    filters: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Root {
        projects {
          aggregations(filters: $filters) {
            ${ProjectAggregations.getFragment('aggregations')}
          }
          hits(first: $first offset: $offset, filters: $filters) {
            ${ProjectTable.getFragment('hits')}
          }
        }
      }
    `,
  },
};

const ProjectsPage = Relay.createContainer(
  ProjectsPageComponent,
  ProjectsPageQuery
);

export default ProjectsPage;