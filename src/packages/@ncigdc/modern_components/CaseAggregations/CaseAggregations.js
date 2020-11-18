/* @flow */
import React from 'react';
import _, {get} from 'lodash';
import {
  compose, setDisplayName, withPropsOnChange, withState,
} from 'recompose';

import Modal from '@ncigdc/uikit/Modal';
import SuggestionFacet from '@ncigdc/modern_components/SuggestionFacet';
import FacetSelection from '@ncigdc/modern_components/FacetSelection';
import FacetWrapper from '@ncigdc/components/FacetWrapper';
import UploadSetButton from '@ncigdc/components/UploadSetButton';
import { withTheme } from '@ncigdc/theme';
import withFacetSelection from '@ncigdc/utils/withFacetSelection';
import escapeForRelay from '@ncigdc/utils/escapeForRelay';
import tryParseJSON from '@ncigdc/utils/tryParseJSON';
import FacetHeader from '@ncigdc/components/Aggregations/FacetHeader';
import { UploadCaseSet } from '@ncigdc/components/Modals/UploadSet';
import { Row } from '@ncigdc/uikit/Flex';
import CaseIcon from '@ncigdc/theme/icons/Case';

import { IBucket } from '@ncigdc/components/Aggregations/types';
import t from '@cqdg/locales/intl';
import features from '../../../../features';

export type TProps = {
  caseIdCollapsed: boolean,
  setCaseIdCollapsed: Function,
  relay: Object,
  facets: { facets: string },
  parsedFacets: Object,
  aggregations: {
    study__short_name_keyword: { buckets: [IBucket] },
    study__study_id_keyword: { buckets: [IBucket] },
    study__domain: { buckets: [IBucket] },
    gender: { buckets: [IBucket] },
    ethnicity: { buckets: [IBucket] },
    age_at_recruitment: { buckets: [IBucket] },
    diagnoses__age_at_diagnosis: { buckets: [IBucket] },
    vital_status: { buckets: [IBucket] },
    diagnoses__icd_category_keyword: { buckets: [IBucket] },
    phenotypes__hpo_category_keyword: { buckets: [IBucket] },
    phenotypes__hpo_term_keyword: { buckets: [IBucket] },
  },
  setAutocomplete: Function,
  theme: Object,
  suggestions: Array<Object>,

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

const presetFacets = [
  {
    title: t('facet.study.name'),
    field: 'study.short_name_keyword',
    full: 'study.short_name_keyword',
    type: 'keyword',
  },
  /* {
    title: 'Study Id',
    field: 'study.study_id_keyword',
    full: 'study.study_id_keyword',
    type: 'keyword',
  }, */
  {
    title: t('facet.study.domain'),
    field: 'study.domain',
    full: 'study.domain',
    type: 'keyword',
  },
  {
    title: t('facet.gender'),
    field: 'gender',
    full: 'gender',
    type: 'keyword',
  },
  {
    title: t('facet.ethnicity'),
    field: 'ethnicity',
    full: 'ethnicity',
    type: 'keyword',
  },
  {
    title: t('facet.age.at.recruitment'),
    field: 'age_at_recruitment',
    full: 'age_at_recruitment',
    type: 'long',
  },
  {
    title: t('facet.age.at.diagnosis'),
    field: 'diagnoses.age_at_diagnosis',
    full: 'diagnoses.age_at_diagnosis',
    type: 'long',
  },
  {
    title: t('facet.vital.status'),
    field: 'vital_status',
    full: 'vital_status',
    type: 'keyword',
  },
  {
    title: t('facet.icd.category'),
    field: 'diagnoses.icd_category_keyword',
    full: 'diagnoses.icd_category_keyword',
    type: 'keyword',
  },
  {
    title: t('facet.hpo.category'),
    field: 'phenotypes.hpo_category_keyword',
    full: 'phenotypes.hpo_category_keyword',
    type: 'keyword',
  },
  {
    title: t('facet.hpo.term'),
    field: 'phenotypes.hpo_term_keyword',
    full: 'phenotypes.hpo_term_keyword',
    type: 'keyword',
  },
];

const presetFacetFields = presetFacets.map(x => x.field);
const entityType = 'Cases';

const enhance = compose(
  setDisplayName('RepoCaseAggregations'),
  withFacetSelection({
    entityType,
    presetFacetFields,
  }),
  withTheme,
  withState('caseIdCollapsed', 'setCaseIdCollapsed', false),
  withPropsOnChange(['viewer'], ({ viewer }) => ({
    parsedFacets: viewer.File
      ? tryParseJSON(viewer.File, {})
      : {},
  })),
);

const styles = {
  link: {
    textDecoration: 'underline',
    color: '#2a72a5',
  },
};

const CaseAggregationsComponent = (props: TProps) => (
  <div className="test-case-aggregations">
    { features.caseAggregations && (
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
          Add a Case/Biospecimen Filter
        </a>
      </div>
    )}
    { features.caseAggregations && (
      <Modal
        isOpen={props.shouldShowFacetSelection}
        style={{
          content: {
            border: 0,
            padding: '15px',
            width: '65%',
          },
        }}
        >
        <FacetSelection
          additionalFacetData={props.parsedFacets}
          docType="cases"
          excludeFacetsBy={props.facetExclusionTest}
          isCaseInsensitive
          onRequestClose={() => props.setShouldShowFacetSelection(false)}
          onSelect={props.handleSelectFacet}
          title="Add a Case/Biospecimen Filter"
          />
      </Modal>
    )}
    {props.userSelectedFacets && props.userSelectedFacets.map(facet => (
      <FacetWrapper
        aggregation={props.parsedFacets[facet.field]}
        facet={facet}
        isRemovable
        key={facet.full}
        onRequestRemove={() => props.handleRequestRemoveFacet(facet)}
        relayVarName="repoCaseCustomFacetFields"
        style={{ borderBottom: `1px solid ${props.theme.greyScale5}` }}
        />
    ))}

    { features.searchByCaseId && (
      <FacetHeader
        collapsed={props.caseIdCollapsed}
        description="Enter UUID or ID of Case, Sample, Portion, Slide, Analyte or Aliquot"
        field="cases.case_id"
        setCollapsed={props.setCaseIdCollapsed}
        title="Case"
        />
    )}
     { features.searchByCaseId &&
      <SuggestionFacet
        collapsed={props.caseIdCollapsed}
        doctype="cases"
        dropdownItem={x => (
          <Row>
            <CaseIcon style={{
              paddingRight: '1rem',
              paddingTop: '1rem',
            }}/>
            <div>
              <div style={{ fontWeight: 'bold' }}>{x.submitter_donor_id}</div>
              <div style={{ fontSize: '80%' }}>
                {
                    _.get(x, 'files.hits.edges', []).map(f => f.node.file_name).join(", ")
                }
              </div>
              {
                _.get(x, 'study.hits.edges', []).map(s => s.node.study_id).join(" | ")
              }
            </div>
          </Row>
        )}
        fieldNoDoctype="submitter_donor_id"
        placeholder={t(`facet.file_suggest_placeholder`)}
        queryType="case"
        title="Case"
        />
     }
    { features.uploadCaseSet && (
      <UploadSetButton
        defaultQuery={{
          pathname: '/repository',
          query: { searchTableTab: 'cases' },
        }}
        idField="cases.case_id"
        style={{
          width: '100%',
          borderBottom: `1px solid ${props.theme.greyScale5}`,
          padding: '0 1.2rem 1rem',
        }}
        type="case"
        UploadModal={UploadCaseSet}
        >
        Upload Case Set
      </UploadSetButton>
    )}
    {_.reject(presetFacets, { full: 'donor_id' }).map(facet => (
      <FacetWrapper
        additionalProps={facet.additionalProps}
        aggregation={
          props.viewer.Case.aggregations[
            escapeForRelay(facet.field)
        ]
        }
        facet={facet}
        key={facet.full}
        relay={props.relay}
        title={facet.title}
        />
    ))}
  </div>

);

export default enhance(CaseAggregationsComponent);
