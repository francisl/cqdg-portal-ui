// @flow

import React from 'react';
import { graphql } from 'react-relay';
import { makeFilter } from '@ncigdc/utils/filters';
import { compose, withPropsOnChange, branch, renderComponent } from 'recompose';
import Query from '@ncigdc/modern_components/Query';

export default (Component: ReactClass<*>) =>
  compose(
    branch(
      ({ caseId }) => !caseId,
      renderComponent(() => (
        <div>
          <pre>caseId</pre> must be provided
        </div>
      )),
    ),
    withPropsOnChange(['caseId'], ({ caseId }) => {
      return {
        variables: {
          filters: makeFilter([
            {
              field: 'cases.case_id',
              value: [caseId],
            },
          ]),
        },
      };
    }),
  )((props: Object) => {
    return (
      <Query
        parentProps={props}
        minHeight={249}
        variables={props.variables}
        Component={Component}
        query={graphql`
          query CaseSummary_relayQuery($filters: JSON) {
            viewer {
                Case {
                  hits(first: 1, filters: $filters) {
                    edges {
                      node {
                        donor_id
                        submitter_donor_id
                        files {
                          hits(first: 99) {
                            total
                            edges {
                              node {
                                file_id
                                data_type
                                data_access
                                file_id
                                file_size
                              }
                            }
                          }
                        }
                        study {
                          hits(first: 1){
                            edges{
                              node{
                                name
                                short_name_keyword
                              }
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
