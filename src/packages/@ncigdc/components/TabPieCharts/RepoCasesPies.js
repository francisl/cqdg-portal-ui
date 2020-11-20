// @flow
import React from 'react';
import Relay from 'react-relay/classic';
import _ from 'lodash';
import { compose } from 'recompose';

import withSize from '@ncigdc/utils/withSize';
import { IBucket } from '@ncigdc/components/Aggregations/types';
import withRouter from '@ncigdc/utils/withRouter';
import { parseFilterParam } from '@ncigdc/utils/uri';
import {
  ColumnCenter,
  WrappedRow,
  BottomBorderedBox,
  PieTitle,
  SelfFilteringPie,
} from './';

export type TProps = {
  push: Function,
  query: Object,
  aggregations: {
    study__short_name_keyword: { buckets: [IBucket] },
    gender: { buckets: [IBucket] },
    ethnicity: { buckets: [IBucket] },
    diagnoses__mondo_term_keyword: { buckets: [IBucket] },
    phenotypes__hpo_category_keyword: { buckets: [IBucket] },
  },
  size: { width: number },
};

const enhance = compose(withRouter, withSize());

const RepoCasesPiesComponent = ({ aggregations, query, push, size: { width }, }: TProps) => {
  const currentFilters =
    (query && parseFilterParam((query || {}).filters, {}).content) || [];
  const currentFieldNames = currentFilters.map(f => f.content.field);
  const pieColMinWidth = width / 5;

  return (
    <div className="test-repo-cases-pies">
      <BottomBorderedBox>
        <WrappedRow style={{ maxWidth: `${width}px`, width: '100%' }}>
          <ColumnCenter style={{ minWidth: `${pieColMinWidth}px` }} className="test-primary-site-pie">
            <PieTitle>Study</PieTitle>
            <SelfFilteringPie
              buckets={_.get(
                aggregations,
                'study__short_name_keyword.buckets'
              )}
              fieldName="study.short_name_keyword"
              docTypeSingular="file"
              currentFieldNames={currentFieldNames}
              currentFilters={currentFilters}
              query={query}
              push={push}
              path="doc_count"
              height={125}
              width={125}
            />
          </ColumnCenter>
          <ColumnCenter style={{ minWidth: `${pieColMinWidth}px` }} className="test-project-pie">
            <PieTitle>Gender</PieTitle>
            <SelfFilteringPie
              buckets={_.get(aggregations, 'gender.buckets')}
              fieldName="gender"
              docTypeSingular="case"
              currentFieldNames={currentFieldNames}
              currentFilters={currentFilters}
              query={query}
              push={push}
              path="doc_count"
              height={125}
              width={125}
            />
          </ColumnCenter>
          <ColumnCenter style={{ minWidth: `${pieColMinWidth}px` }} className="test-disease-type-pie">
            <PieTitle>Ethnicity</PieTitle>
            <SelfFilteringPie
              buckets={_.get(aggregations, 'ethnicity.buckets')}
              fieldName="ethnicity"
              docTypeSingular="case"
              currentFieldNames={currentFieldNames}
              currentFilters={currentFilters}
              query={query}
              push={push}
              path="doc_count"
              height={125}
              width={125}
            />
          </ColumnCenter>
          <ColumnCenter style={{ minWidth: `${pieColMinWidth}px` }} className="test-gender-pie">
            <PieTitle>Disease Type</PieTitle>
            <SelfFilteringPie
              buckets={_.get(aggregations, 'diagnoses__mondo_term_keyword.buckets')}
              fieldName="diagnoses.mondo_term_keyword"
              docTypeSingular="case"
              currentFieldNames={currentFieldNames}
              currentFilters={currentFilters}
              query={query}
              push={push}
              path="doc_count"
              height={125}
              width={125}
            />
          </ColumnCenter>
          <ColumnCenter style={{ minWidth: `${pieColMinWidth}px` }} className="test-vital-status-pie">
            <PieTitle>Phenotype Category</PieTitle>
            <SelfFilteringPie
              buckets={_.get(aggregations, 'phenotypes__hpo_category_keyword.buckets')}
              fieldName="phenotypes.hpo_category_keyword"
              docTypeSingular="case"
              currentFieldNames={currentFieldNames}
              currentFilters={currentFilters}
              query={query}
              push={push}
              path="doc_count"
              height={125}
              width={125}
            />
          </ColumnCenter>
        </WrappedRow>
      </BottomBorderedBox>
    </div>
  );
};

export const RepoCasesPiesQuery = {
  fragments: {
    aggregations: () => Relay.QL`
      fragment on CaseAggregations {
        study__short_name_keyword {
            buckets {
                doc_count
                key
            }
        }
        gender{
            buckets {
                doc_count
                key
            }
        }
        ethnicity{
            buckets {
                doc_count
                key
            }
        }
        diagnoses__mondo_term_keyword{
            buckets {
                doc_count
                key
            }
        }
        phenotypes__hpo_category_keyword{
            buckets {
                doc_count
                key
            }
        }
      }
    `,
  },
};

const RepoCasesPies = Relay.createContainer(
  enhance(RepoCasesPiesComponent),
  RepoCasesPiesQuery,
);

export default RepoCasesPies;
