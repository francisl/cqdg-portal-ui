// @flow

import React from 'react';
import { graphql } from 'react-relay';
import { makeFilter } from '@ncigdc/utils/filters';
import { compose, withPropsOnChange, branch, renderComponent } from 'recompose';
import { BaseQuery } from '@ncigdc/modern_components/Query';

export default (Component: ReactClass<*>) =>
  compose(
    branch(
      ({ viewer }) => !viewer.repository.files.hits.edges[0],
      renderComponent(() => <div>No case found.</div>),
    ),
    withPropsOnChange(
      ['viewer'],
      ({ viewer: { repository: { files: { hits: { edges } } } } }) => {
        const p = edges[0].node;
        return {
          variables: {
            first: p.files.hits.total,
            filters: makeFilter([
              {
                field: 'files.file_id',
                value: [p.case_id],
              },
            ]),
          },
        };
      },
    ),
  )((props: Object) => {
    return (
      <BaseQuery
        parentProps={props}
        variables={props.variables}
        Component={Component}
        query={graphql`
          query AddOrRemoveAllFilesButton_relayQuery(
            $filters: JSON
            $first: Int
          ) {
            filesViewer: viewer {
              repository {
                files {
                  hits(first: $first, filters: $filters) {
                    edges {
                      node {
                        acl
                        state
                        data_access
                        file_id
                        file_size
                        cases {
                          demographics {
                          	sex
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `}
      />
    );
  });
