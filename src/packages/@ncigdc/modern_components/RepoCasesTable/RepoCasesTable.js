/* @flow */

import React from 'react';
import { compose, setDisplayName, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import Pagination from '@ncigdc/components/Pagination';
import Showing from '@ncigdc/components/Pagination/Showing';
import { Row } from '@ncigdc/uikit/Flex';
import TableActions from '@ncigdc/components/TableActions';
import tableModels from '@ncigdc/tableModels';
import Table, { Tr } from '@ncigdc/uikit/Table';
import { CreateRepositoryCaseSetButton } from '@ncigdc/modern_components/withSetAction';
import { AppendRepositoryCaseSetButton } from '@ncigdc/modern_components/withSetAction';
import { RemoveFromRepositoryCaseSetButton } from '@ncigdc/modern_components/withSetAction';
import { theme } from '@ncigdc/theme';
import withSelectIds from '@ncigdc/utils/withSelectIds';
import timestamp from '@ncigdc/utils/timestamp';

export default compose(
  setDisplayName('RepoCasesTablePresentation'),
  connect(state => ({ tableColumns: state.tableColumns.cases })),
  branch(
    ({ viewer }) =>
      !viewer.Case.hits ||
      !viewer.Case.hits.edges.length,
    renderComponent(() => <div>No results found</div>)
  ),
  withSelectIds
)(
  ({
    viewer: { Case: { hits } },
    entityType = 'cases',
    tableColumns,
    variables,
    selectedIds,
    setSelectedIds,
    score,
    sort,
  }) => {
    const tableInfo = tableColumns.slice().filter(x => !x.hidden);

    return (
      <div className="test-cases-table">
        <Row
          style={{
            backgroundColor: 'white',
            padding: '1rem',
            justifyContent: 'space-between',
          }}
        >
          <Showing
            docType="cases"
            prefix={entityType}
            params={variables}
            total={hits.total}
          />
          <TableActions
            type="case"
            scope="repository"
            arrangeColumnKey={entityType}
            total={hits.total}
            endpoint="cases"
            downloadFields={tableInfo
              .filter(x => x.downloadable)
              .map(x => x.field || x.id)}
            sortOptions={tableInfo.filter(x => x.sortable)}
            tsvSelector="#repository-cases-table"
            tsvFilename={`repository-cases-table.${timestamp()}.tsv`}
            score={variables.score}
            sort={variables.cases_sort}
            currentFilters={variables.filters}
            // CreateSetButton={CreateRepositoryCaseSetButton}
            // AppendSetButton={AppendRepositoryCaseSetButton}
            // RemoveFromSetButton={RemoveFromRepositoryCaseSetButton}
            idField="cases.case_id"
            selectedIds={selectedIds}
            false
            false
          />
        </Row>
        <div style={{ overflowX: 'auto' }}>
          <Table
            id="repository-cases-table"
            headings={tableInfo
              .filter(x => !x.subHeading)
              .map(x => (
                <x.th
                  key={x.id}
                  nodes={hits.edges}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                />
              ))}
            subheadings={tableInfo
              .filter(x => x.subHeading)
              .map(x => <x.th key={x.id} />)}
            body={
              <tbody>
                {hits.edges.map((e, i) => (
                  <Tr
                    key={e.node.id}
                    index={i}
                    style={{
                      ...(selectedIds.includes(e.node.case_id) && {
                        backgroundColor: theme.tableHighlight,
                      }),
                    }}
                  >
                    {tableInfo
                      .filter(x => x.td)
                      .map(x => (
                        <x.td
                          key={x.id}
                          node={e.node}
                          index={i}
                          total={hits.total}
                          edges={hits.edges}
                          selectedIds={selectedIds}
                          setSelectedIds={setSelectedIds}
                        />
                      ))}
                  </Tr>
                ))}
              </tbody>
            }
          />
        </div>
        <Pagination prefix={entityType} params={variables} total={hits.total} />
      </div>
    );
  }
);
