/* @flow */
/* eslint jsx-a11y/no-static-element-interactions: 0, max-len: 1 */

import React from 'react';

import _ from 'lodash';
import {
  compose,
  withState,
  setDisplayName,
  withPropsOnChange,
} from 'recompose';

import Modal from '@ncigdc/uikit/Modal';
import FilterSearchInput from '@cqdg/components/inputs/FilterSearchInput';
import FacetSelection from '@ncigdc/modern_components/FacetSelection';
import FilterContainer from '@ferlab-ui/core/containers/filters/FilterContainer';
import Header from '@ferlab-ui/core/containers/filters/FilterContainerHeader';

import withFacetSelection from '@ncigdc/utils/withFacetSelection';
import escapeForRelay from '@ncigdc/utils/escapeForRelay';
import tryParseJSON from '@ncigdc/utils/tryParseJSON';

import { IBucket } from '@ncigdc/components/Aggregations/types';

import { withTheme } from '@ncigdc/theme';
import FileIcon from '@ncigdc/theme/icons/File';
import t from '@cqdg/locales/intl';
import StackLayout from '@ferlab-ui/core/layouts/StackLayout';

import features from '../../../../../features.json';

const presetFacets = [
  {
    title: t('facet.file'),
    field: 'file_id',
    full: 'file_id',
    type: 'keyword',
  },
  {
    field: 'data_category',
    full: 'data_category',
    type: 'keyword',
  },
  {
    field: 'data_type',
    full: 'data_type',
    type: 'keyword',
  },
  {
    field: 'is_harmonized',
    full: 'is_harmonized',
    type: 'keyword',
  },
  {
    field: 'experimental_strategy',
    full: 'experimental_strategy',
    type: 'keyword',
  },
  {
    field: 'file_format',
    full: 'file_format',
    type: 'keyword',
  },
  {
    field: 'platform',
    full: 'platform',
    type: 'keyword',
  },
  {
    field: 'data_access',
    full: 'data_access',
    type: 'keyword',
  },
];

const presetFacetFields = presetFacets.map(x => x.field);
const entityType = 'Files';

const enhance = compose(
  setDisplayName('RepoFileAggregations'),
  withTheme,
  withFacetSelection({
    entityType,
    presetFacetFields,
    validFacetDocTypes: ['files'],
  }),
  withState('fileIdCollapsed', 'setFileIdCollapsed', false),
  withPropsOnChange(['viewer'], ({ viewer }) => ({
    parsedFacets: viewer.File.facets
      ? tryParseJSON(viewer.File.facets, {})
        : {},
  }))
);

const styles = {
  link: {
    textDecoration: 'underline',
    color: '#2a72a5',
  },
};

export type TProps = {
  relay: Record<string, any>;
  fileIdCollapsed: boolean;
  setFileIdCollapsed: Function;
  facets: { facets: string };
  parsedFacets: Record<string, any>;
  aggregations: {
    data_access: { buckets: [IBucket] };
    data_category: { buckets: [IBucket] };
    file_format: { buckets: [IBucket] };
    data_type: { buckets: [IBucket] };
    experimental_strategy: { buckets: [IBucket] };
    is_harmonized: { buckets: [IBucket] };
    workflow_type: { buckets: [IBucket] };
    platform: { buckets: [IBucket] };
  };
  theme: Record<string, any>;
  suggestions: Array<Record<string, any>>;
  setAutocomplete: Function;

  userSelectedFacets: Array<{
    description: string;
    doc_type: string;
    field: string;
    full: string;
    type: 'id' | 'string' | 'long';
  }>;
  handleSelectFacet: Function;
  handleResetFacets: Function;
  handleRequestRemoveFacet: Function;
  presetFacetFields: Array<string>;
  shouldShowFacetSelection: boolean;
  facetExclusionTest: Function;
  setShouldShowFacetSelection: Function;
};

const FileAggregations = ({
  facetExclusionTest,
  fileIdCollapsed,
  handleRequestRemoveFacet,
  handleResetFacets,
  handleSelectFacet,
  parsedFacets,
  relay,
  setFileIdCollapsed,
  setShouldShowFacetSelection,
  shouldShowFacetSelection,
  theme,
  userSelectedFacets,
  viewer: { File: { aggregations } },
}: TProps) => (
  <div className="file-aggregations">
    {features.fileFilter && (
      <div
        className="text-right"
        style={{
          padding: '10px 15px',
          borderBottom: `1px solid ${theme.greyScale5}`,
        }}
        >
        {!!userSelectedFacets.length && (
          <span>
            <a onClick={handleResetFacets} style={styles.link}>
            Reset
            </a>
            {' '}
          &nbsp;|&nbsp;
          </span>
        )}
        <a
          onClick={() => setShouldShowFacetSelection(true)}
          style={styles.link}
          >
        Add a File Filter
        </a>
      </div>
    )}
    <Modal
      isOpen={shouldShowFacetSelection}
      style={{
        content: {
          border: 0,
          padding: '15px',
          width: '65%',
        },
      }}
      >
      <FacetSelection
        additionalFacetData={parsedFacets}
        docType="files"
        excludeFacetsBy={facetExclusionTest}
        isCaseInsensitive
        onRequestClose={() => setShouldShowFacetSelection(false)}
        onSelect={handleSelectFacet}
        relay={relay}
        relayVarName="repoCustomFacetFields"
        title="Add a File Filter"
        />
    </Modal>

    {userSelectedFacets.map(facet => (
      <FilterContainer
        aggregation={parsedFacets[facet.field]}
        facet={facet}
        isRemovable
        key={facet.full}
        onRequestRemove={() => handleRequestRemoveFacet(facet)}
        relayVarName="repoFileCustomFacetFields"
        style={{ borderBottom: `1px solid ${theme.greyScale5}` }}
        />
    ))}
    {features.filesearch && (
      <Header
        collapsed={fileIdCollapsed}
        description="Enter File UUID or name"
        field="file_id"
        setCollapsed={setFileIdCollapsed}
        title="File"
        />
    )}
    {features.filesearch && (
      <FilterSearchInput
        collapsed={fileIdCollapsed}
        doctype="files"
        dropdownItem={(x) => (
          <StackLayout>
            <FileIcon
              style={{
	            paddingRight: '1rem',
	            paddingTop: '1rem',
              }}
              />
            <div>
              <div style={{ fontWeight: 'bold' }}>{x.file_id}</div>
              <div style={{ fontSize: '180%' }}>{x.submitter_donor_id}</div>
              {x.file_name}
              {' >>>> '}
            </div>
          </StackLayout>
        )}
        fieldNoDoctype="file_id"
        placeholder={t('facet.search')}
        queryType="file"
        title="File"
        tooltip={t('facet.search_suggest_tooltip')}
        />
    )}
    {_.reject(presetFacets, { full: 'file_id' }).map(facet => {
      return (
        <FilterContainer
          additionalProps={facet.additionalProps}
          aggregation={
          aggregations[escapeForRelay(facet.field)]
        }
          facet={facet}
          key={facet.full}
          relay={relay}
          style={{ borderBottom: `1px solid ${theme.greyScale5}` }}
          title={facet.title || t(`facet.${facet.field}`)}
          />
      );
    })}
  </div>
);

export default enhance(FileAggregations);
