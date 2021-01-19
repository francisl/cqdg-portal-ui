/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  compose, withState, withPropsOnChange, pure,
} from 'recompose';

import OverflowTooltippedLabel from '@cqdg/components/Tooltip/OverflowTooltippedLabel';
import { internalHighlight } from '@cqdg/components/Highlight';
import { inCurrentFilters } from '@cqdg/utils/filters';
import { getCurrentFilters } from '@cqdg/store/query';

import CloseIcon from 'react-icons/lib/md/close';

import Button from 'cqdg-ui/core/buttons/button';
import Tag from 'cqdg-ui/core/text/Tag';
import StackLayout from 'cqdg-ui/core/layouts/StackLayout';

import './MultipleChoice.css';

const getCurrentFilters3 = () => {
  const currentFilters = getCurrentFilters([]).content;

  if (!currentFilters || currentFilters.length === 0) return [];

  return currentFilters.map(filter => ({
    ...filter,
    content: {
      ...filter.content,
      value: typeof filter.content.value === 'string'
            ? filter.content.value.toLowerCase()
            : filter.content.value.map(val => val.toLowerCase()),
    },
  }
  ));
};

let input;
const MultipleChoice = (props) => {
  const {
    dictionary,
    filterGroup,
    filters,
    maxShowing,
    noResultsText,
    onChange,
    searchInputVisible,
    selectedFilters,
    setShowingMore,
    showingMore,
  } = props;

  const dotField = filterGroup.field;
  const currentFilters = getCurrentFilters3();

  return (
    <Fragment>
      {searchInputVisible && (
        <StackLayout>
          <input
            aria-label={dictionary.multiChoice.searchPlaceholder}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onChange={() => props.setFilter(input.value)}
            placeholder={dictionary.multiChoice.searchPlaceholder}
            ref={node => {
              input = node;
            }}
            />
          {input && input.value && (
            <CloseIcon
              className="fui-mc-search-reset-icon"
              onClick={() => {
                props.setFilter('');
                input.value = '';
              }}
              />
          )}
        </StackLayout>
      )}
      {filters.length > 0 && (
        <StackLayout vertical>
          <StackLayout className="fui-filters-actions">
            <Button className="fui-filters-links" onClick={() => onChange(filterGroup, selectedFilters)} type="text">
              {dictionary.actions.all}
            </Button>

            <div className="separator" />
            <Button className="fui-filters-links" onClick={() => onChange(filterGroup, [])} type="text">{dictionary.actions.none}</Button>
          </StackLayout>
          {filters
            .sort((a, b) => (b.doc_count - a.doc_count))
            .slice(0, showingMore ? Infinity : maxShowing)
            .map(bucket => (
              <StackLayout className="fui-mc-item" horizontal key={`${filterGroup.field}-${bucket.id}-${bucket.doc_count}`}>
                <Button className="fui-mv-item-checkbox" onClick={() => onChange(filterGroup, [bucket.name])} type="text">
                  <input
                    checked={inCurrentFilters({
                      key: bucket.key,
                      dotField,
                      currentFilters,
                    })}
                    id={`input-${props.title}-${bucket.key}`}
                    name={`input-${props.title}-${bucket.id}`}
                    readOnly
                    style={{
                      pointerEvents: 'none',
                      marginRight: '5px',
                      flexShrink: 0,
                      verticalAlign: 'middle',
                    }}
                    type="checkbox"
                    />
                  <OverflowTooltippedLabel
                    htmlFor={`input-${props.title}-${bucket.id}`}
                    style={{
                      marginLeft: '0.3rem',
                      verticalAlign: 'middle',
                    }}
                    >
                    {props.searchValue
                            ? internalHighlight(
                              props.searchValue,
                              bucket.name,
                              {
                                backgroundColor: '#FFFF00',
                              },
                            )
                            : bucket.name}
                  </OverflowTooltippedLabel>

                </Button>
                <Tag>
                  {bucket.doc_count.toLocaleString()}
                </Tag>
              </StackLayout>
            ))}
          {filters.length > maxShowing && (
            <Button
              className="fui-filters-types-mc-footer"
              onClick={() => setShowingMore(!props.showingMore)}
              onKeyPress={() => setShowingMore(!props.showingMore)}
              role="button"
              tabIndex="0"
              type="text"
              >
              {showingMore
                      ? dictionary.actions.less
                      : filters.length - 5 &&
                      `${filters.length - 5} ${dictionary.actions.more}...`}
            </Button>
          )}

          {filters.length === 0 && (
            <span>
              {(input || { value: '' }).value
                      ? dictionary.messages.errorNotFound
                      : dictionary.messages.errorNoData}
            </span>
          )}
        </StackLayout>
      )}
      {filters.length === 0 && (
        <StackLayout className="fui-no-filters" vertical>
          <span className="no-results-text">{noResultsText}</span>
        </StackLayout>
      )}
    </Fragment>
  );
};

const enhance = compose(
  withState('showingMore', 'setShowingMore', false),
  withState('filter', 'setFilter', ''),
  connect(state => ({
    addAllToCart: state.cart.addAllToCart,
  })),
  withPropsOnChange(
    [
      'filters',
      'filter',
      'searchValue',
    ],
    ({
      filter, filters, searchValue = '',
    }) => {
      return {
        filters: filters.filter(
          b =>
            b.key.toLowerCase().includes(filter.toLowerCase()) &&
          (b.key.toLowerCase().includes(searchValue.toLowerCase())),
        ),
      };
    },
  ),
  pure,
);

export default enhance(MultipleChoice);
