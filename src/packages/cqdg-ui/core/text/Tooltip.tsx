import React from 'react';

import './Tooltip.css';

export enum TooltipPosition {
  topLeft = 'topLeft',
  top = 'top',
  topRight = 'topRight',
  left = 'left',
  bottom = 'bottom',
  bottomRight = 'bottomRight',
  bottomLeft = 'bottomLeft',
  right = 'right',
}

interface ITooltip {
  className: string;
  children: React.ReactNode;
  text: string;
  position?: TooltipPosition;
}

const Tooltip = ({
  children, className, position = TooltipPosition.top, text,
}: ITooltip) => (
  <div className={`fui-tooltip ${className || ''}`}>
    {children}
    <div className="fui-tooltip-wrapper">
      <span className={`fui-tooltip-text ${position}`}>
        {text}
      </span>
    </div>

  </div>
);

export default Tooltip;
