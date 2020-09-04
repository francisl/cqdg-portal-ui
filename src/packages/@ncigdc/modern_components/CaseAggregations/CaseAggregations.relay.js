// @flow

import React from 'react';
import { graphql } from 'react-relay';
import { compose, withPropsOnChange } from 'recompose';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import Query from '@ncigdc/modern_components/Query';
import { parseFilterParam } from '@ncigdc/utils/uri';
import withRouter from '@ncigdc/utils/withRouter';

const entityType = 'Files';
export default (Component: ReactClass<*>) =>
  compose(
    withRouter,
    withPropsOnChange(
      ['location'],
      ({ location: { search }, defaultFilters = null }) => {
        const q = parse(search);
        const filters = parseFilterParam(q.filters, defaultFilters);
        return {
          filters,
        };
      },
    ),
    connect((state, props) => ({
      userSelectedFacets: state.customFacets[entityType],
    })),
    withPropsOnChange(
      ['userSelectedFacets', 'filters'],
      ({ userSelectedFacets, filters }) => {
        return {
          variables: {
            filters,
            repoCaseCustomFacetFields: userSelectedFacets
              .map(({ field }) => field)
              .join(','),
          },
        };
      },
    ),
  )((props: Object) => {

    /*


                    age_at_recruitment{
                      buckets{
                        doc_count
                        key
                      }
                    }
                    diagnoses__age_at_diagnosis{
                      buckets{
                        doc_counts
                        key
                      }
                    }
     */


    return (
      <Query
        parentProps={props}
        minHeight={578}
        variables={props.variables}
        Component={Component}
        query={graphql`
          query CaseAggregations_relayQuery(
            $filters: JSON
          ) {
            viewer {
              Case { 
                  aggregations(
                    filters: $filters
                    aggregations_filter_themselves: false
                  ) {
                    study__short_name_keyword{
                      buckets{
                        doc_count
                        key
                      }
                    }
                    study__study_id_keyword{
                      buckets{
                        doc_count
                        key
                      }
                    }
                    study__domain{
                      buckets{
                        doc_count
                        key
                      }
                    }
                    gender{
                      buckets{
                        doc_count
                        key
                      }
                    }
                    ethnicity{
                      buckets{
                        doc_count
                        key
                      }
                    }
                    vital_status{
                      buckets{
                        doc_count
                        key
                      }
                    }
                    diagnoses__icd_category_keyword{
                      buckets{
                        doc_count
                        key
                      }
                    }
                    phenotypes__hpo_category_keyword{
                      buckets{
                        doc_count
                        key
                      }
                    }
                    phenotypes__hpo_term_keyword{
                      buckets{
                        doc_count
                        key
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
