import React, { useState } from 'react';
import './UserPropertySell.css';

const SellOptionsCard = ({method}) => {
    return (
        <React.Fragment>
            <div className='flex justify-center align-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16" className='svg-icon'>
                    <path d="M8.447.276a.5.5 0 0 0-.894 0L7.19 1H2.5A1.5 1.5 0 0 0 1 2.5V10h14V2.5A1.5 1.5 0 0 0 13.5 1H8.809L8.447.276Z" />
                    <text x="50%" y="37%" dy=".3em" textAnchor="middle" fontSize="3" fontWeight="bold" fill='#000' fontFamily='Arial, sans-serif'>{method}</text>
                    <path fill-rule="evenodd" d="M.5 11a.5.5 0 0 0 0 1h2.86l-.845 3.379a.5.5 0 0 0 .97.242L3.89 14h8.22l.405 1.621a.5.5 0 0 0 .97-.242L12.64 12h2.86a.5.5 0 0 0 0-1H.5Zm3.64 2 .25-1h7.22l.25 1H4.14Z"/>
                </svg>
            </div>
        </React.Fragment>
    )
}

export default SellOptionsCard