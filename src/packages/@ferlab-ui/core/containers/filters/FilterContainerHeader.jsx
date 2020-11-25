/* @flow */

import React from 'react';
import {
  compose,
  defaultProps,
  setDisplayName,
} from 'recompose';
import { css } from 'glamor';

import { parseFilterParam } from '@ncigdc/utils/uri';
import LocationSubscriber from '@ncigdc/components/LocationSubscriber';
import styled from '@ncigdc/theme/styled';

import FacetResetButton from '@ncigdc/components/Aggregations/FacetResetButton';
import CloseIcon from '@ncigdc/theme/icons/CloseIcon';
import SearchIcon from '@ncigdc/theme/icons/SearchIcon';
import AngleIcon from '@ncigdc/theme/icons/AngleIcon';
import QuestionIcon from '@ncigdc/theme/icons/Question';
import GoSearch from 'react-icons/lib/go/search';

import { Row } from '@ncigdc/uikit/Flex';
import { Tooltip } from '@ncigdc/uikit/Tooltip';
import { internalHighlight } from '@ncigdc/uikit/Highlight';

import './FilterContainerHeader.css';

const Header = styled(Row, {
  color: ({ theme }) => theme.primary,
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'white',
});

const IconsRow = styled(Row, {
  color: ({ theme }) => theme.greyScale7,
  lineHeight: '1.48px',
  fontSize: '1.2em',
  ':link': {
    color: ({ theme }) => theme.greyScale7,
  },
  ':visited': {
    color: ({ theme }) => theme.greyScale7,
  },
});

const RemoveIcon = styled(CloseIcon, {
  ':hover::before': {
    textShadow: ({ theme }) => theme.textShadow,
  },
  color: ({ theme }) => theme.greyScale7,
  paddingLeft: '2px',
});

const MagnifyingGlass = styled(SearchIcon, {
  ':hover::before': {
    textShadow: ({ theme }) => theme.textShadow,
  },
});

const FacetHeader = ({
  angleIconRight = false,
  collapsed,
  description,
  DescriptionComponent,
  field,
  handleRequestRemove,
  hasValueSearch,
  isRemovable,
  searchValue,
  setCollapsed,
  setShowingValueSearch,
  showingValueSearch,
  title,
}) => (
  <LocationSubscriber>
    {(ctx) => {
      const currentFilters =
          ctx.query && parseFilterParam((ctx.query || {}).filters, {});
      const spanStyle = { cursor: 'pointer' };
      if (angleIconRight) {
        spanStyle.width = '100%';
      }
      return (
        <Header
          className={`fui-filters-container-header ${collapsed ? 'collapsed' : ''}`}
          >
          <Row onClick={() => setCollapsed(!collapsed)} style={{ flex: 8 }}>
            <Tooltip
              Component={
                  DescriptionComponent ? (
                    <div style={{ maxWidth: '24em' }}>{DescriptionComponent}</div>
                  ) : null
                }
              >
              {!angleIconRight && (
                <AngleIcon
                  style={{
                    paddingRight: '0.25rem',
                    transform: `rotate(${collapsed ? 270 : 0}deg)`,
                  }}
                  />
              )}
              {searchValue
                  ? internalHighlight(searchValue, title, {
                    backgroundColor: '#FFFF00',
                  })
                  : title}
              {angleIconRight && (
                <AngleIcon
                  style={{
                    display: 'flex',
                    float: 'right',
                    overflow: 'auto',
                    transform: `rotate(${collapsed ? 270 : 0}deg)`,
                  }}
                  />
              )}
            </Tooltip>
          </Row>
          <IconsRow
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
            >
            {description && (
              <Tooltip
                Component={description}
                {...css({ ':not(:last-child)': { marginRight: 8 } })}
                >
                <QuestionIcon />
              </Tooltip>
            )}
            {hasValueSearch && (
              <GoSearch
                onClick={() => setShowingValueSearch(!showingValueSearch)}
                />
            )}
            <FacetResetButton currentFilters={currentFilters} field={field} />
            {isRemovable && (
              <RemoveIcon
                aria-label="Close"
                onClick={handleRequestRemove}
                onKeyPress={event => event.key === 'Enter' && handleRequestRemove()}
                role="button"
                tabIndex="0"
                />
            )}
          </IconsRow>
        </Header>
      );
    }}
  </LocationSubscriber>
);

export default compose(
  setDisplayName('EnhancedFacetHeader'),
  defaultProps({
    handleRequestRemove: () => { },
    hasValueSearch: false,
    isRemovable: false,
    setShowingValueSearch: () => { },
  }),
)(FacetHeader);