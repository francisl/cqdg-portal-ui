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
          fileFilters: makeFilter([
            { field: 'cases.case_id', value: [caseId] },
            {
              field: 'data_type',
              value: ['Biospecimen Supplement', 'Slide Image'],
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
          query BiospecimenCard_relayQuery(
            $filters: JSON
            $fileFilters: JSON
          ) {
            viewer {
                Case {
                  hits(first: 1, filters: $filters) {
                    edges {
                      node {
                        donor_id
                        submitter_donor_id
                        study {
                          hits(first: 1){
                              edges{
                                  node{
                                      study_id
                                  }
                              }
                          }
                        }
                        files{
                          hits(first: 99, filters: $fileFilters){
                            total
                            edges{
                              node{
                                data_type
                                data_category
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
