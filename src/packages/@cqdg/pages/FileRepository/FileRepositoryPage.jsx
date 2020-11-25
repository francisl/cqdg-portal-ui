/* @flow */

import React from 'react';
import Relay from 'react-relay/classic';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import { Row } from '@ncigdc/uikit/Flex';
import QueryLayout from '@cqdg/components/layouts/QueryLayout';
import TabbedLinks from '@ncigdc/components/TabbedLinks';
import NoResultsMessage from '@ncigdc/components/NoResultsMessage';
import RepoCasesTable from '@cqdg/pages/FileRepository/RepoCasesTable';
import CaseAggregations from '@cqdg/pages/FileRepository/CaseAggregations';
import FileAggregations from '@cqdg/pages/FileRepository/FileAggregations';

import FilesTable from '@cqdg/pages/FileRepository/FilesTable';
import { SaveIcon } from '@ncigdc/theme/icons';
import withFilters from '@ncigdc/utils/withFilters';
import formatFileSize from '@ncigdc/utils/formatFileSize';

import RepoCasesPies from '@cqdg/components/charts/RepoCasesPies';
import RepoFilesPies from '@cqdg/components/charts/RepoFilesPies';

import withRouter from '@ncigdc/utils/withRouter';
import ActionsRow from '@ncigdc/components/ActionsRow';
import t from '@cqdg/locales/intl';
import Tabs from '@ferlab-ui/core/containers/tabs';

import features from '../../../../features.json';

import './FileRepositoryPage.css';

export type TProps = {
  push: Function;
  relay: Record<string, any>;
  dispatch: Function;
  filters: any;
  cases_sort: any;
  viewer: {
    autocomplete_case: {
      hits: Array<Record<string, any>>;
    };
    autocomplete_file: {
      hits: Array<Record<string, any>>;
    };
    cart_summary: {
      aggregations: {
        fs: {
          value: number;
        };
      };
    };
    repository: {
      customCaseFacets: {
        facets: {
          facets: string;
        };
      };
      customFileFacets: {
        facets: {
          facets: string;
        };
      };
      cases: {
        aggregations: {};
        pies: {};
        hits: {
          total: number;
        };
      };
      files: {
        aggregations: {};
        pies: {};
        hits: {
          total: number;
        };
      };
    };
  };
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


  const facetTabPanes: TabPanes = [
    {
      component: <CaseAggregations relay={relay} />,
      id: 'participants',
      text: t('global.participants'),
    },
    {
      component: <FileAggregations relay={relay} />,
      id: 'files',
      text: t('global.files.title'),
    },
  ];

  const SidePanelComponent = (
    <Tabs
      defaultIndex={0}
      panes={facetTabPanes}
      queryParam="facetTab"
      />
  );

  return (
    <div id="RepositoryPage">
      <QueryLayout
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
                  id: 'cases',
                  text: t('repo.tabs.cases', { count: caseCount.toLocaleString() }),
                  component: viewer.Case.hits.total ? (
                    <div>
                      <RepoCasesPies
                        aggregations={viewer.Case.pies}
                        />

                      <RepoCasesTable />
                    </div>
                  ) : (
                    <NoResultsMessage>
                      {t('search.no.results')}
                    </NoResultsMessage>
                  ),
                },
                {
                  id: 'files',
                  text: t('repo.tabs.files', { count: fileCount.toLocaleString() }),
                  component: viewer.File.hits.total ? (
                    <div>
                      <RepoFilesPies
                        aggregations={viewer.File.pies}
                        />

                      <FilesTable />
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
        sidePanelComponent={SidePanelComponent}
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
            pies: aggregations(filters: $fileFilters, aggregations_filter_themselves: true) {
                ${RepoFilesPies.getFragment('aggregations')}
            }              
            hits(first: $files_size offset: $files_offset, filters: $fileFilters, sort: $files_sort) {
              total
            }
          }
          Case {
            pies: aggregations(filters: $caseFilters, aggregations_filter_themselves: true) {
                ${RepoCasesPies.getFragment('aggregations')}
            }
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

export default RepositoryPage;
