/* @flow */
/* eslint jsx-a11y/no-static-element-interactions: 0, max-len: 1 */

import React from 'react';
import Relay from 'react-relay/classic';

import _ from 'lodash';
import {
  compose,
  withState,
  setDisplayName,
  lifecycle,
  withPropsOnChange,
} from 'recompose';
import { connect } from 'react-redux';

import Modal from '@ncigdc/uikit/Modal';
import SuggestionFacet from '@ncigdc/components/Aggregations/SuggestionFacet';
import FacetSelection from '@ncigdc/components/FacetSelection';
import FacetWrapper from '@ncigdc/components/FacetWrapper';
import FacetHeader from '@ncigdc/components/Aggregations/FacetHeader';

import withFacetSelection from '@ncigdc/utils/withFacetSelection';
import escapeForRelay from '@ncigdc/utils/escapeForRelay';
import tryParseJSON from '@ncigdc/utils/tryParseJSON';

import { IBucket } from '@ncigdc/components/Aggregations/types';

import { withTheme } from '@ncigdc/theme';
import FileIcon from '@ncigdc/theme/icons/File';
import { Row } from '@ncigdc/uikit/Flex';
import t from '@cqdg/locales/intl';


const presetFacets = [
  {
    title: t('facet.File'),
    field: 'file_id',
    full: 'file_id',
    type: 'keyword',
  },
  {
    title: t('facet.data_category'),
    field: 'data_category',
    full: 'data_category',
    type: 'keyword',
  },
  {
    title: t('facet.data_type'),
    field: 'data_type',
    full: 'data_type',
    type: 'keyword',
  },
  {
    title: t('facet.experimental_strategy'),
    field: 'experimental_strategy',
    full: 'experimental_strategy',
    type: 'keyword',
  },
  {
    title: t('facet.file_format'),
    field: 'file_format',
    full: 'file_format',
    type: 'keyword',
  },
  {
    title: t('facet.is_harmonized'),
    field: 'is_harmonized',
    full: 'is_harmonized',
    type: 'boolean',
  },
  {
    title: t('facet.platform'),
    field: 'platform',
    full: 'platform',
    type: 'keyword',
  },
  {
    title: t('facet.data_access'),
    field: 'data_access',
    full: 'data_access',
    type: 'keyword',
  },
  {
    title: t('facet.sample_id'),
    field: 'sample_id',
    full: 'sample_id',
    type: 'keyword',
  },
];

const presetFacetFields = presetFacets.map(x => x.field);
const entityType = 'Files';

const enhance = compose(
  setDisplayName('RepoFileAggregations'),
  withFacetSelection({
    entityType,
    presetFacetFields,
    validFacetDocTypes: ['files'],
  }),
  connect((state, props) => ({
    userSelectedFacets: state.customFacets[entityType],
  })),
  withState('fileIdCollapsed', 'setFileIdCollapsed', false),
  withPropsOnChange(
    ['filters', 'userSelectedFacets'],
    ({ filters, relay, userSelectedFacets }) =>
      relay.setVariables({
        filters,
        filesCustomFacetFields: userSelectedFacets
          .map(({ field }) => field)
          .join(','),
      }),
  ),
  withPropsOnChange(['facets'], ({ facets }) => ({
    parsedFacets: facets.facets ? tryParseJSON(facets.facets, {}) : {},
  })),
  lifecycle({
    componentDidMount(): void {
      const { filters, relay, userSelectedFacets } = this.props;
      relay.setVariables({
        filters,
        filesCustomFacetFields: userSelectedFacets
          .map(({ field }) => field)
          .join(','),
      });
    },
  }),
);

const styles = {
  link: {
    textDecoration: 'underline',
    color: '#2a72a5',
  },
};

export type TProps = {
  relay: Object,
  fileIdCollapsed: boolean,
  setFileIdCollapsed: Function,
  facets: { facets: string },
  parsedFacets: Object,
  aggregations: {
    access: { buckets: [IBucket] },
    data_category: { buckets: [IBucket] },
    data_format: { buckets: [IBucket] },
    data_type: { buckets: [IBucket] },
    experimental_strategy: { buckets: [IBucket] },
    is_harmonized: { buckets: [IBucket] },
    platform: { buckets: [IBucket] },
    sample_id: { buckets: [IBucket] },
  },
  theme: Object,
  filters: Object,
  suggestions: Array<Object>,
  setAutocomplete: Function,

  userSelectedFacets: Array<{
    description: String,
    doc_type: String,
    field: String,
    full: String,
    type: 'id' | 'string' | 'long',
  }>,
  handleSelectFacet: Function,
  handleResetFacets: Function,
  handleRequestRemoveFacet: Function,
  presetFacetFields: Array<String>,
  shouldShowFacetSelection: Boolean,
  facetExclusionTest: Function,
  setShouldShowFacetSelection: Function,
};

export const FileAggregationsComponent = (props: TProps) => (
  <div className="test-file-aggregations">
    <div
      className="text-right"
      style={{
        padding: '10px 15px',
        borderBottom: `1px solid ${props.theme.greyScale5}`,
      }}
      >
      {!!props.userSelectedFacets.length && (
        <span>
          <a onClick={props.handleResetFacets} style={styles.link}>
            Reset
          </a>
          {' '}
          &nbsp;|&nbsp;
        </span>
      )}
      <a
        onClick={() => props.setShouldShowFacetSelection(true)}
        style={styles.link}
        >
        Add a File Filter
      </a>
    </div>
    <Modal
      isOpen={props.shouldShowFacetSelection}
      style={{
        content: {
          border: 0,
          padding: '15px',
        },
      }}
      >
      <FacetSelection
        additionalFacetData={props.parsedFacets}
        docType="files"
        excludeFacetsBy={props.facetExclusionTest}
        onRequestClose={() => props.setShouldShowFacetSelection(false)}
        onSelect={props.handleSelectFacet}
        title="Add a File Filter"
        />
    </Modal>

    {props.userSelectedFacets.map(facet => {
      return (
        <FacetWrapper
          aggregation={props.parsedFacets[facet.field]}
          facet={facet}
          isRemovable
          key={facet.full}
          onRequestRemove={() => props.handleRequestRemoveFacet(facet)}
          relay={props.relay}
          relayVarName="filesCustomFacetFields"
          style={{ borderBottom: `1px solid ${props.theme.greyScale5}` }}
          />
      );
    })}
    <FacetHeader
      collapsed={props.fileIdCollapsed}
      description="Enter File UUID or name"
      field="file_id"
      setCollapsed={props.setFileIdCollapsed}
      title="File"
      />
    <SuggestionFacet
      collapsed={props.fileIdCollapsed}
      doctype="files"
      dropdownItem={x => (
        <Row>
          <FileIcon
            style={{
              paddingRight: '1rem',
              paddingTop: '1rem',
            }}
            />
          <div>
            <div style={{ fontWeight: 'bold' }}>{x.file_id}</div>
            <div style={{ fontSize: '80%' }}>{x.submitter_donor_id}</div>
            {x.file_name}
          </div>
        </Row>
      )}
      fieldNoDoctype="file_id"
      hits={props.suggestions}
      placeholder="e.g. 142682.bam, 4f6e2e7a-b..."
      setAutocomplete={props.setAutocomplete}
      style={{ borderBottom: `1px solid ${props.theme.greyScale5}` }}
      title="File"
      />
    {_.reject(presetFacets, { full: 'file_id' }).map(facet => {
      return (
        <FacetWrapper
          additionalProps={facet.additionalProps}
          aggregation={props.aggregations[escapeForRelay(facet.field)]}
          facet={facet}
          key={facet.full}
          relay={props.relay}
          style={{ borderBottom: `1px solid ${props.theme.greyScale5}` }}
          title={facet.title}
          />
      );
    })}
  </div>
);

export const FileAggregationsQuery = {
  initialVariables: {
    filesCustomFacetFields: '',
    filters: null,
  },
  fragments: {
    facets: () => Relay.QL`
      fragment on Files {
        facets(facets: $filesCustomFacetFields filters: $filters)
      }
    `,
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
        experimental_strategy {
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

        data_access {
          buckets {
            doc_count
            key
          }
        }
        
        is_harmonized {
        	buckets {
        		doc_count
        		key
        	}
        }
        
        platform {
        	buckets {
        		doc_count
        		key
        	}
        }
        		
      }
    `,
  },
};

const FileAggregations = Relay.createContainer(
  enhance(withTheme(FileAggregationsComponent)),
  FileAggregationsQuery,
);

export default FileAggregations;
