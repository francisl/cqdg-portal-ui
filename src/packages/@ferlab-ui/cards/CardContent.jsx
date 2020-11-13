import React from 'react'

import './CardContent.css';

const CardContent = ({children, cardType, className = ''}) => {
    return (
        <div className={`${cardType} ${className}`}>
            {children}
        </div>
    )
}

export default CardContent;
