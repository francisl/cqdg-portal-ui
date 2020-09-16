// @flow

import React from 'react';
import { graphql } from 'react-relay';
import { makeFilter } from '@ncigdc/utils/filters';
import {
  branch,
  compose,
  renderComponent,
  setDisplayName,
  withPropsOnChange,
} from 'recompose';
import Query from '@ncigdc/modern_components/Query';

export default (Component: ReactClass<*>) => compose(
  setDisplayName('EnhancedClinicalCard_Relay'),
  branch(
    ({ caseId }) => !caseId,
    renderComponent(() => (
      <div>
        <pre>caseId</pre>
        {' '}
must be provided
      </div>
    )),
  ),
  withPropsOnChange(['caseId'], ({ caseId }) => {
    return {
      variables: {
        fileFilters: makeFilter([
          {
            field: 'cases.case_id',
            value: [caseId],
          },
          {
            field: 'data_type',
            value: ['Clinical Supplement'],
          },
        ]),
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
        Component={Component}
        minHeight={249}
        parentProps={props}
        query={graphql`
          query ClinicalCard_relayQuery(
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
                        study{
                          hits(first: 1){
                            edges{
                              node{
                                study_id
                                name
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
        variables={props.variables}
        />
  );
});
