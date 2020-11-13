import React from 'react';
import FiExternalLink from 'react-icons/lib/fa/external-link';

import './button.css';

const Button = ({
  children,
  defaultIcon = true,
  disabled = false,
  href,
  mode = '',
  onclick,
  shape = 'rect',
  type = 'button',
}) => {
  const inputType = href ? 'link' : type;
  const buttonAttr = {
    className: `button ${mode} ${shape}`,
    disabled,
    type: inputType,
  };
  if (href) {
    buttonAttr.onClick = () => window.open(href);
    type = 'link';
  }

  return (
    <button {...buttonAttr}>
      {children}
      {' '}
      { type === 'link' && defaultIcon && <FiExternalLink className="link-icon" />}
    </button>
  );
};

export default Button;
