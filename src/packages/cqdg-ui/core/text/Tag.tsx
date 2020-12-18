import React from 'react';
import './tag.css';

interface ITagProps {
  children: React.ReactNode;
  className: string;
}
const Tag = ({ children, className }: ITagProps) => (
  <div className={`fui-tag ${className || ''}`}>
    {children}
  </div>
);
export default Tag;
