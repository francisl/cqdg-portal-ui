import React from 'react';
import IoIosClose from 'react-icons/lib/io/close';

import AggregatedFilter from './AggregatedFilter';

import './Filter.css';

const Filter = ({ clearFilterAction = () => {}, filters, filterType }) => {
  return (
    <span className="Filter">
      <span className="FilterType">{filterType}</span>
      <span className="FilterSeparator">=</span>
      <AggregatedFilter className="AggregatedContainer" filters={filters} />
      <IoIosClose className="CloseIcon" onClick={clearFilterAction} />
    </span>
  );
};

export default Filter;
