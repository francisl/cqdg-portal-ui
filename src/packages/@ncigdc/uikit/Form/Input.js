// @flow

import React from 'react';
import PropTypes from 'prop-types';

/*----------------------------------------------------------------------------*/

const styles = {
  input: {
    width: '100%',
    minWidth: 0,
    height: '34px',
    padding: '6px 12px',
    fontSize: '14px',
    lineHeight: '1.42857143',
    color: '#555555',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
    transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
  },
};

const Input = ({ getNode = null, style, ...props }) => (
  <input
    aria-label="text"
    ref={getNode}
    type="text"
    {...props}
    />
);

Input.propTypes = {
  getNode: PropTypes.func,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

/*----------------------------------------------------------------------------*/

export default Input;
