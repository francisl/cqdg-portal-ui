/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ExactMatchFacet from 'cqdg-ui/core/containers/filters/types/ExactMatchFacet';

import SingleChoice from 'cqdg-ui/core/containers/filters/types/SingleChoice';
import MultipleChoice from 'cqdg-ui/core/containers/filters/types/MultipleChoice';
import RangeFilter from 'cqdg-ui/core/containers/filters/types/RangeFilter';
import t from '@cqdg/locales/intl';
import { IDictionary } from './types/dictionary';

export interface IFilterGroup {
  'doc_type': string;
  description: string;
  field: string;
  full: string;
  placeholder: string;
  title: string;
  type: string;
  visualType: string;
}

export interface IFilter {
  doc_count: number;
  key: string;
  name: string; // use for translated/todisplay string
  id: string; //  dash (-) separated key
}

export interface IFiltersOnChange {
  selectedFilter: IFilter[];
  filterGroup: IFilterGroup;
}

interface IFiltersProps {
  filterGroup: IFilterGroup;
  dictionary: IDictionary;
  collapsed: boolean;
  title: string;
  filters: IFilter[];
  selectedFilters: any;
  searchInputVisible: boolean;
  maxShowing: number;
  searchValue: string;
  onChange?: (obj: IFiltersOnChange) => void;
}

export const FilterComponent = ({
  collapsed,
  dictionary,
  filterGroup,
  filters,
  maxShowing,
  onChange,
  searchInputVisible,
  searchValue,
  selectedFilters,
  title,
}: IFiltersProps) => {
  const commonProps = {
    collapsed,
    title,
  };

  switch (filterGroup.visualType) {
    case 'choice': return (
      <SingleChoice
        {...commonProps}
        doctype={filterGroup.doc_type}
        field={filterGroup.full}
        fieldNoDoctype={filterGroup.field}
        filters={filters}
        placeholder={
          filterGroup.placeholder ? filterGroup.placeholder : `Enter ${commonProps.title}`
        }
        />
    );
    case 'exact': return (
      <ExactMatchFacet
        {...commonProps}
        doctype={filterGroup.doc_type}
        fieldNoDoctype={filterGroup.field}
        placeholder={
          filterGroup.placeholder ? filterGroup.placeholder : `Enter ${commonProps.title}`
        }
        />
    );
    case 'range': return (
      <RangeFilter
        convertDays={false}
        field={filterGroup.full}
        max={({ max: 0 }).max}
        min={({ min: 0 }).min}
        {...commonProps}
        />
    );
    case 'terms':
    default: return (
      <MultipleChoice
        dictionary={dictionary}
        filterGroup={filterGroup}
        {...commonProps}
        filters={filters}
        maxShowing={maxShowing}
        noResultsText={t('facet.no.result')}
        onChange={onChange}
        searchInputVisible={searchInputVisible}
        searchValue={searchValue}
        selectedFilters={selectedFilters}
        />
    );
  }
};
