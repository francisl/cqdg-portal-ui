import React from 'react';
import './StackLayout.css';

export enum StackOrientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

interface IStackLayout {
  orientation?: StackOrientation;
  vertical?: boolean;
  horizontal?: boolean;
  children: React.ReactNode;
  className: string;
}

const StackLayout = ({
  children, className, horizontal, orientation, vertical,
}: IStackLayout) => {
  const definedOrientation = vertical
  ? StackOrientation.Vertical
  : horizontal
    ? StackOrientation.Horizontal
    : orientation || StackOrientation.Horizontal;
  return (
    <div className={`fui-stack-layout ${definedOrientation} ${className}`}>{children}</div>
  );
};

export default StackLayout;
