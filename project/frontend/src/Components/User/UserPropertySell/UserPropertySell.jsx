import React from 'react';
import sellBannerImage from '../../../images/sell_property_home.webp';
import './UserPropertySell.css';
import UserPropertySellMid from './UserPropertySellMid';

const UserPropertySell = () => {
  return (
    <React.Fragment>
        {/* <div className="row flex justify-center">
            <div className='sell-image-container'>
                <img src={sellBannerImage} alt="SellBannerImage" className='flex w-full box-border relative p-0' />
                <div className='overlay-text'>
                    <h3>MAKE AGENT FREE DEAL.<br />ENJOY THE BEST RATES</h3>
                </div>
            </div>
        </div> */}
      <div class="relative overflow-hidden shadow-lg cursor-pointer">
        <img class="object-cover w-full h-48" src={sellBannerImage} alt="Sell background"/>
        <div class="absolute px-6 py-4" style={{left: '40%', top: '10px'}}>
          <h4 class="mb-3 flex text-2xl font-semibold tracking-tight text-black">MAKE AGENT FREE DEAL.<br />ENJOY THE BEST RATES</h4>
        </div>
      </div>
    </React.Fragment>
  )
}

export default UserPropertySell