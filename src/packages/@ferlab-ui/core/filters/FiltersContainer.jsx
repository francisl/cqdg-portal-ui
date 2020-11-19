import React from 'react';
import IoIosCloseCircleOutline from 'react-icons/lib/io/ios-close-outline';

import Filter from './Filter';

import './FiltersContainer.css';

const FiltersContainer = ({ clearAllAction = () => {}, clearFilterAction }) => {
  return (
    <div className="FiltersContainer">
      <div className="WrapperContainer">
        <IoIosCloseCircleOutline className="close-icon" onClick={clearAllAction} />
        <div className="WrapperFilters">
          <Filter clearFilterAction={clearFilterAction} filters={['Congénital']} filterType="Type de maladie" />
          <Filter clearFilterAction={clearFilterAction} filters={['Santé générale', 'Cancer']} filterType="Domaine" />
          <Filter clearFilterAction={clearFilterAction} filters={['Pédiatrique']} filterType="Populations" />
          <Filter clearFilterAction={clearFilterAction} filters={['CQDG']} filterType="Champ" />
        </div>
      </div>
    </div>
  );
};

export default FiltersContainer;
