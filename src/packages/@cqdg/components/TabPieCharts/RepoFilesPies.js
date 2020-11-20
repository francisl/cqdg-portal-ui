// @flow
import React from 'react';
import Relay from 'react-relay/classic';
import _ from 'lodash';
import { compose, withState } from 'recompose';

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
} from './index';

export type TProps = {
  push: Function,
  query: Object,
  aggregations: {
    data_category: { buckets: [IBucket] },
    data_type: { buckets: [IBucket] },
    study__short_name_keyword: { buckets: [IBucket] },
    file_format: { buckets: [IBucket] },
  },
  setShowingMore: Function,
  showingMore: boolean,
  size: { width: number },
};

const enhance = compose(
  withRouter,
  withState('showingMore', 'setShowingMore', false),
  withSize(),
);

const RepoFilesPiesComponent = ({
  aggregations,
  query,
  push,
  size: { width },
}: TProps) => {
  const currentFilters =
    (query && parseFilterParam((query || {}).filters, {}).content) || [];
  const currentFieldNames = currentFilters.map(f => f.content.field);
  const pieColMinWidth = width / 4;
  return (
    <div className="test-repo-files-pies">
      <BottomBorderedBox>
        <WrappedRow style={{ maxWidth: `${width}px`, width: '100%' }}>
          <ColumnCenter
            style={{ minWidth: `${pieColMinWidth}px` }}
            className="test-primary-site-pie"
          >
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
          <ColumnCenter
            style={{ minWidth: `${pieColMinWidth}px` }}
            className="test-data-category-pie"
          >
            <PieTitle>Data Category</PieTitle>
            <SelfFilteringPie
              buckets={_.get(aggregations, 'data_category.buckets')}
              fieldName="data_category"
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
          <ColumnCenter
            style={{ minWidth: `${pieColMinWidth}px` }}
            className="test-data-type"
          >
            <PieTitle>Data Type</PieTitle>
            <SelfFilteringPie
              buckets={_.get(aggregations, 'data_type.buckets')}
              fieldName="data_type"
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
          <ColumnCenter
            style={{ minWidth: `${pieColMinWidth}px` }}
            className="test-file-format"
          >
            <PieTitle>Data Format</PieTitle>
            <SelfFilteringPie
              buckets={_.get(aggregations, 'file_format.buckets')}
              fieldName="file_format"
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
        </WrappedRow>
      </BottomBorderedBox>
    </div>
  );
};

export const RepoFilesPiesQuery = {
  fragments: {
    aggregations: () => Relay.QL`
      fragment on FileAggregations {
        data_category {
          buckets {
            doc_count
            key
          }
        }
        data_type {
          buckets {
            doc_count
            key
          }
        }
        study__short_name_keyword {
          buckets {
            doc_count
            key
          }
        }
        file_format {
          buckets {
            doc_count
            key
          }
        }
      }
    `,
  },
};

const RepoFilesPies = Relay.createContainer(
  enhance(RepoFilesPiesComponent),
  RepoFilesPiesQuery,
);

export default RepoFilesPies;
