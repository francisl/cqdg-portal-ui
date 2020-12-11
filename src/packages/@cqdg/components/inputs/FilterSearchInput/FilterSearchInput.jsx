/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// @flow

// Vendor
import React, { Fragment } from 'react';
import { get, trim } from 'lodash';
import {
  compose,
  pure,
  withState,
  withHandlers,
  renameProp,
  withPropsOnChange,
} from 'recompose';

import LocationSubscriber from '@ncigdc/components/LocationSubscriber';
import fetchFileHistory from '@ncigdc/utils/fetchFileHistory';
// Custom
import { parseFilterParam } from '@ncigdc/utils/uri';
import { getFilterValue } from '@ncigdc/utils/filters';
import { Row, Column } from '@ncigdc/uikit/Flex';
import withDropdown from '@ncigdc/uikit/withDropdown';
import styled from '@ncigdc/theme/styled';
import { dropdown } from '@ncigdc/theme/mixins';
import Link from '@ncigdc/components/Links/Link';
import CheckCircleOIcon from '@ncigdc/theme/icons/CheckCircleOIcon';
import withSelectableList from '@ncigdc/utils/withSelectableList';
import namespace from '@ncigdc/utils/namespace';
import GeneSymbol from '@ncigdc/modern_components/GeneSymbol';
import SetId from '@ncigdc/components/SetId';
import FileIcon from '@ncigdc/theme/icons/File';
import { isUUID } from '@ncigdc/utils/string';
import {
  CheckedLink,
} from '@ncigdc/components/Aggregations/';

import StackLayout from '@ferlab-ui/core/layouts/StackLayout';
import SearchInput from '@ferlab-ui/core/input/Search';
import './FilterSearchInput.css';

const StyledDropdownRow = styled(Row, {
  color: ({ theme }) => theme.greyScale4,
  padding: '1rem',
  textDecoration: 'none',
  fontStyle: 'italic',
});

const StyledDropdownLink = styled(Link, {
  padding: '1rem',
  color: ({ theme }) => theme.greyScale2,
  ':link': {
    textDecoration: 'none',
    color: ({ linkIsActive, theme }) =>
      (linkIsActive ? 'white' : theme.primary),
  },
  ':visited': {
    textDecoration: 'none',
    color: ({ linkIsActive, theme }) =>
      (linkIsActive ? 'white' : theme.primary),
  },
  backgroundColor: ({ linkIsActive }) =>
    (linkIsActive ? 'rgb(31, 72, 108)' : 'inherit'),
  width: '100%',
  textDecoration: 'none',
});

const extractNodes = (obj) => {
  const nodes = [];
  if (obj) {
    Object.keys(obj).forEach((key) => {
      if (key === 'node') {
        nodes.push(obj[key]);
      } else {
        nodes.push(...extractNodes(obj[key]));
      }
    });
  }
  return nodes;
};

const extractResults = (obj) => {
  const list = get(obj, 'results');
  const nodes = extractNodes(list);

  return nodes || 'results';
};


const FilterSearchInput = compose(
  withDropdown,
  withState('inputValue', 'setInputValue', ''),
  withState('historyResults', 'setHistoryResults', []),
  withPropsOnChange(
    ['facetSearchHits'],
    async ({
      facetSearch, facetSearchHits, queryType, setHistoryResults,
    }) => {
      if (
        facetSearch &&
        queryType === 'file' &&
        !facetSearchHits.files.length &&
        isUUID(facetSearch)
      ) {
        const history = await fetchFileHistory(trim(facetSearch));
        await setHistoryResults(history);
        return null;
      }
      return facetSearchHits;
    },
  ),
  renameProp('facetSearchHits', 'results'),
  withHandlers({
    // TODO: use router push
    handleSelectItem: () => item => {
      document.querySelector(`[data-link-id="${item.id}"]`).click();
    },
  }),
  namespace(
    'selectableList',
    withSelectableList(
      {
        keyHandlerName: 'handleKeyEvent',
        listSourcePropPath: extractResults,
      },
      {
        onSelectItem: (item, { handleSelectItem }) => handleSelectItem(item),
      },
    ),
  ),
  pure,
)(
  ({
    active,
    collapsed,
    doctype,
    dropdownItem,
    facetSearch,
    fieldNoDoctype,
    historyResults,
    inputValue,
    loading,
    placeholder,
    results,
    selectableList,
    setActive,
    setFacetSearch,
    setInputValue,
    tooltip,
  }) => {
    const query = v => ({
      offset: 0,
      filters: {
        op: 'and',
        content: [
          {
            op: 'in',
            content: {
              field: `${doctype}.${fieldNoDoctype}`,
              value: [v],
            },
          },
        ],
      },
    });

    const getCheckedValue = v => {
      if (v.includes('set_id:')) {
        return <SetId set={v} />;
      }
      if (fieldNoDoctype === 'gene_id') {
        return <GeneSymbol geneId={v} />;
      }
      return v;
    };

    return (
      <LocationSubscriber>
        {(ctx) => {
          const { filters } = ctx.query || {};
          const currentFilters = parseFilterParam(filters, { content: [] })
            .content;
          const currentValues = getFilterValue({
            currentFilters,
            dotField: `${doctype}.${fieldNoDoctype}`,
          }) || { content: { value: [] } };

          return (
            <StackLayout className="filter-search-input" vertical>
              {!collapsed && (
                <Fragment>
                  {[].concat(currentValues.content.value || []).map(v => (
                    // added search items
                    <CheckedLink
                      className="filter-search-selected-item"
                      key={v}
                      merge="toggle"
                      query={{
                        offset: 0,
                        filters: {
                          op: 'and',
                          content: [
                            {
                              op: 'in',
                              content: {
                                field: `${doctype}.${fieldNoDoctype}`,
                                value: [v],
                              },
                            },
                          ],
                        },
                      }}
                      title={v}
                      >
                      <CheckCircleOIcon style={{ paddingRight: '0.5rem' }} />
                      {getCheckedValue(v)}
                    </CheckedLink>
                  ))}
                  <Fragment>
                    <SearchInput
                      aria-activedescendant={
                        active
                          ? get(
                            selectableList,
                              `focusedItem.${fieldNoDoctype}`,
                          )
                          : null // false gets stringify, so value needs to be `null` or `undefined`
                      }
                      autoComplete="off"
                      id={fieldNoDoctype}
                      name={fieldNoDoctype}
                      onChange={e => {
                        const { value } = e.target;
                        setInputValue(value);
                        setActive(!!value);
                        if (value) {
                          setFacetSearch(value);
                        }
                      }}
                      onKeyDown={selectableList.handleKeyEvent}
                      placeholder={placeholder}
                      position="topRight"
                      tooltip={tooltip}
                      value={inputValue}
                      {...active && {
                        'aria-owns': `${fieldNoDoctype}-options`,
                      }}
                      />
                    {active && (
                      <Column
                        id={`${fieldNoDoctype}-options`}
                        onClick={e => e.stopPropagation()}
                        style={{
                          ...dropdown,
                          marginTop: 0,
                          top: '49px',
                          left: 1,
                          width: '100%',
                          wordBreak: 'break-word',
                        }}
                        >
                        {
                          get(results, `[${doctype}][${Object.keys(results[doctype])[0]}].hits.edges`, []).map(x => (
                            <StackLayout
                              key={x.node.id}
                              onClick={() => {
                                setInputValue('');
                                setActive(false);
                              }}
                              onMouseOver={() => selectableList.setFocusedItem(x.node)}
                              style={{ alignItems: 'center' }}
                              vertical
                              >
                              <StyledDropdownLink
                                className="filter-search-results-list"
                                data-link-id={x.node.id}
                                id={x.node[fieldNoDoctype]}
                                linkIsActive={selectableList.focusedItem === x.node}
                                merge="add"
                                query={query(x.node[fieldNoDoctype])}
                                >
                                {dropdownItem(x.node)}
                              </StyledDropdownLink>
                            </StackLayout>
                          ))
}
                        {!(results[doctype] || []).length &&
                          !!(historyResults || []).length &&
                          historyResults
                            .filter(result => result.file_change === 'released')
                            .map((result) => (
                              <Row
                                key={result.uuid}
                                onClick={() => {
                                  setInputValue('');
                                  setActive(false);
                                }}
                                onMouseOver={() =>
                                  selectableList.setFocusedItem(result)}
                                style={{ alignItems: 'center' }}
                                >
                                <StyledDropdownLink
                                  data-link-id={result.uuid}
                                  id={result.uuid}
                                  linkIsActive={
                                    selectableList.focusedItem === result
                                  }
                                  merge="add"
                                  query={query(result.uuid)}
                                  >
                                  <FileIcon
                                    style={{
                                      paddingRight: '1rem',
                                      paddingTop: '1rem',
                                    }}
                                    />
                                  {result.uuid}
                                  <br />
                                  File version
                                  {' '}
                                  {' '}
                                  <span style={{ fontWeight: 'bold' }}>
                                    {facetSearch}
                                  </span>
                                  {' '}
                                  was updated
                                </StyledDropdownLink>
                              </Row>
                            ))}
                        {(!!results && get(results, doctype, [])).length === 0 &&
                          historyResults.length === 0 && (
                            <StyledDropdownRow>
                              {loading ? 'Loading' : 'No matching items found'}
                            </StyledDropdownRow>
                        )}
                      </Column>
                    )}
                  </Fragment>
                </Fragment>
              )}
            </StackLayout>
          );
        }}
      </LocationSubscriber>
    );
  },
);

export default FilterSearchInput;
