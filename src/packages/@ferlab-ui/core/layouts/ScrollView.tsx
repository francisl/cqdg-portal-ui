import React from 'react';
import './ScrollView.css';

export enum StackOrientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

interface IScrollView {
  orientation?: StackOrientation;
  vertical?: boolean;
  horizontal?: boolean;
  children: React.ReactNode;
  className: string;
}

const ScrollView = ({
  children, className, horizontal, orientation, vertical,
}: IScrollView) => {
  // default to Vertical
  const definedOrientation = vertical
  ? StackOrientation.Vertical
  : horizontal
    ? StackOrientation.Horizontal
    : orientation || StackOrientation.Vertical;
  return (
    <div className={`fui-scroll-view ${definedOrientation} ${className || ''}`}>{children}</div>
  );
};

export default ScrollView;
