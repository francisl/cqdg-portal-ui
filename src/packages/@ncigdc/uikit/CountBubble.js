// @flow

import React from 'react';

const CountBubble = ({ children, style, ...props }) => (
  <a {...props}>
    {children}
  </a>
);

/*----------------------------------------------------------------------------*/

export default CountBubble;
