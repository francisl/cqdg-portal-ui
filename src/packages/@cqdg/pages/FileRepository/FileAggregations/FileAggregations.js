/* @flow */
/* eslint jsx-a11y/no-static-element-interactions: 0, max-len: 1 */

import React from 'react';

import reject from 'lodash/reject';

import {
  compose,
  withState,
  setDisplayName,
  withPropsOnChange,
} from 'recompose';

import FilterSearchInput from '@cqdg/components/inputs/FilterSearchInput';
import FilterContainer from '@ferlab-ui/core/containers/filters/FilterContainer';

import withFacetSelection from '@ncigdc/utils/withFacetSelection';
import escapeForRelay from '@ncigdc/utils/escapeForRelay';
import tryParseJSON from '@ncigdc/utils/tryParseJSON';

import { IBucket } from '@ncigdc/components/Aggregations/types';

import FileIcon from '@ncigdc/theme/icons/File';
import t from '@cqdg/locales/intl';
import StackLayout from '@ferlab-ui/core/layouts/StackLayout';

import features from '../../../../../features.json';

import '../Aggregations.css';

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

export type TProps = {
  relay: Record<string, any>;
  fileIdCollapsed: boolean;
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
  handleRequestRemoveFacet: Function;
  presetFacetFields: Array<string>;
};

const FileAggregations = ({
  fileIdCollapsed,
  handleRequestRemoveFacet,
  parsedFacets,
  relay,
  userSelectedFacets,
  viewer: { File: { aggregations } },
}: TProps) => {
  return (
    <div className="file-aggregations">
      {userSelectedFacets.map(facet => (
        <FilterContainer
          aggregation={parsedFacets[facet.field]}
          facet={facet}
          isRemovable
          key={facet.full}
          onRequestRemove={() => handleRequestRemoveFacet(facet)}
          relayVarName="repoFileCustomFacetFields"
          />
      ))}
      {features.filesearch && (
        <FilterSearchInput
          collapsed={fileIdCollapsed}
          doctype="files"
          dropdownItem={(x) => (
            <StackLayout>
              <FileIcon
                className="aggregations-search-icon"
                />
              <div>
                <div className="aggregations-search-id">{x.file_id}</div>
                <div className="aggregations-search-donor">{x.submitter_donor_id}</div>
                {x.file_name}
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
      {reject(presetFacets, { full: 'file_id' }).map(facet => {
        return (
          <FilterContainer
            additionalProps={facet.additionalProps}
            aggregation={
          aggregations[escapeForRelay(facet.field)]
        }
            facet={facet}
            key={facet.full}
            relay={relay}
            title={facet.title || t(`facet.${facet.field}`)}
            />
        );
      })}
    </div>
  );
};

export default enhance(FileAggregations);
