import React from 'react';
import UnionIcon from './UnionIcon';

import './AggregatedFilter.css';

const AggregatedFilter = ({ className, filters }) => {
  return (
    <div className={`AggregatedFilter ${className}`}>
      <div className="WrapperContainer">
        {
          filters.map((filter, index) => {
            return (
              index === filters.length - 1
              ? (
                <span className="FilterName" key="aggregated-filter">{filter}</span>
              )
              : (
                <React.Fragment>
                  <span className="FilterName" key="aggregated-filter">{filter}</span>
                  <UnionIcon />
                </React.Fragment>
              )
            );
          })
        }
      </div>
    </div>
  );
};

export default AggregatedFilter;
