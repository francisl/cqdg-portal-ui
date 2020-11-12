/* @flow */

import React from 'react';
import Relay from 'react-relay/classic';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import { Row } from '@ncigdc/uikit/Flex';
import SearchPage from '@ncigdc/components/SearchPage';
import TabbedLinks from '@ncigdc/components/TabbedLinks';
import NoResultsMessage from '@ncigdc/components/NoResultsMessage';
import RepoCasesTable from '@ncigdc/modern_components/RepoCasesTable';
import CaseAggregations from '@ncigdc/modern_components/CaseAggregations';
import FileAggregations from '@ncigdc/modern_components/FileAggregations';

import FilesTable from '@ncigdc/modern_components/FilesTable';
import { SaveIcon } from '@ncigdc/theme/icons';
import withFilters from '@ncigdc/utils/withFilters';
import formatFileSize from '@ncigdc/utils/formatFileSize';

import withRouter from '@ncigdc/utils/withRouter';
import ActionsRow from '@ncigdc/components/ActionsRow';
import t from '@cqdg/locales/intl';
import features from '../../../features';


export type TProps = {
  push: Function,
  relay: Object,
  dispatch: Function,
  filters: any,
  cases_sort: any,
  viewer: {
    autocomplete_case: {
      hits: Array<Object>,
    },
    autocomplete_file: {
      hits: Array<Object>,
    },
    cart_summary: {
      aggregations: {
        fs: {
          value: number,
        },
      },
    },
    repository: {
      customCaseFacets: {
        facets: {
          facets: string,
        },
      },
      customFileFacets: {
        facets: {
          facets: string,
        },
      },
      cases: {
        aggregations: {},
        pies: {},
        hits: {
          total: number,
        },
      },
      files: {
        aggregations: {},
        pies: {},
        hits: {
          total: number,
        },
      },
    },
  },
  showFacets: boolean,
  setShowFacets: Function,
};

const enhance = compose(
  setDisplayName('RepositoryPage'),
  connect(),
  withFilters(),
  withRouter,
);

export const RepositoryPageComponent = (props: TProps) => {
  const { filters, relay, viewer } = props;
  const fileCount = viewer.File.hits.total;
  const caseCount = viewer.Case.hits.total;
  /* const fileSize = props.viewer.cart_summary.aggregations.fs.value; */

  // PLA : hardcoding this to get page to load
  // const caseCount = 1;
  const fileSize = 0;

  const facetTabs = [
    {
      id: 'participants',
      text: t('global.participants'),
      component: <CaseAggregations relay={relay} />,
    },
    {
      id: 'files',
      text: t('global.files.title'),
      component: <FileAggregations relay={relay} />,
    },
  ];

  return (
    <div className="test-repository-page">
      <SearchPage
        facetTabs={facetTabs}
        filtersLinkProps={{
          hideLinkOnEmpty: false,
          linkPathname: '/query',
          linkText: t('search.advanced.search'),
        }}
        results={(
          <span>
            <ActionsRow
              filters={filters}
              totalCases={caseCount}
              totalFiles={fileCount}
              />
            <TabbedLinks
              defaultIndex={0}
              links={[
                {
                  id: 'files',
                  text: t('repo.tabs.files', { count: fileCount.toLocaleString() }),
                  component: viewer.File.hits.total ? (
                    <div>
                      <FilesTable />
                    </div>
                  ) : (
                    <NoResultsMessage>
                      {t('search.no.results')}
                    </NoResultsMessage>
                  ),
                },
                {
                  id: 'cases',
                  text: t('repo.tabs.cases', { count: caseCount.toLocaleString() }),
                  component: viewer.Case.hits.total ? (
                    <div>
                      {/* <RepoCasesPies */}
                      {/*  aggregations={props.viewer.File.pies} */}
                      {/* /> */}
                      <RepoCasesTable />
                    </div>
                 ) : (
                   <NoResultsMessage>
                     {t('search.no.results')}
                   </NoResultsMessage>
                 ),
                },
              ]}
              queryParam="searchTableTab"
              tabToolbar={
                features.saveIcon && (
                  <Row spacing="2rem" style={{ alignItems: 'center' }}>
                    <span style={{ flex: 'none' }}>
                      <SaveIcon style={{ marginRight: 5 }} />
                      {' '}
                      <strong>{formatFileSize(fileSize)}</strong>
                    </span>
                  </Row>
              )
              }
              />
          </span>
        )}
        />
    </div>
  );
};

export const RepositoryPageQuery = {
  initialVariables: {
    cases_offset: null,
    cases_size: null,
    cases_sort: null,
    files_offset: null,
    files_size: null,
    files_sort: null,
    fileFilters: null,
    caseFilters: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Root {
          File {
            hits(first: $files_size offset: $files_offset, filters: $fileFilters, sort: $files_sort) {
              total
            }
          }
          Case {
              hits(first: $files_size offset: $files_offset, filters: $caseFilters, sort: $files_sort) {
                  total
              }
          }
      }
    `,
  },
};

const RepositoryPage = Relay.createContainer(
  enhance(RepositoryPageComponent),
  RepositoryPageQuery,
);

export const repoPageCaseToFileFiltersMapping:Map = new Map([
  ['gender', 'cases.gender'],
  ['ethnicity', 'cases.ethnicity'],
  ['age_at_recruitment', 'cases.age_at_recruitment'],
  ['vital_status', 'cases.vital_status'],
]);

export const repoPageFileToCaseFiltersMapping:Map = new Map([
  ['data_category', 'files.data_category'],
  ['data_type', 'files.data_type'],
  ['file_format', 'files.file_format'],
  ['data_access', 'files.data_access'],
  ['platform', 'files.platform'],
  ['experimental_strategy', 'files.experimental_strategy'],
  ['is_harmonized', 'files.is_harmonized'],
]);

export default RepositoryPage;
