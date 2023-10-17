import React from 'react';
import sellBannerImage from '../../../images/sell_property_home.webp';
import './UserPropertySell.css';
import UserPropertySellMid from './UserPropertySellMid';

const UserPropertySell = () => {
  return (
    <React.Fragment>
        <div className="row flex justify-center">
            <div className='sell-image-container'>
                <img src={sellBannerImage} alt="SellBannerImage" className='flex w-full box-border relative p-0' />
                <div className='overlay-text'>
                    <h3>MAKE AGENT FREE DEAL.<br />ENJOY THE BEST RATES</h3>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default UserPropertySell