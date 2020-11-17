import React from 'react';
import FiExternalLink from 'react-icons/lib/fa/external-link';

import './button.css';

const Button = ({
  active,
  children,
  defaultIcon = true,
  disabled = false,
  onClick,
  shape = 'rect',
  type = 'normal',
}) => {
  const buttonAttr = {
    className: `${type} ${shape} ${active ? 'active' : ''}`,
    disabled,
    onClick,
  };

  return (
    <button {...buttonAttr}>
      {children}
      {' '}
      { type === 'link' && defaultIcon && <FiExternalLink className="link-icon" />}
    </button>
  );
};

export default Button;
