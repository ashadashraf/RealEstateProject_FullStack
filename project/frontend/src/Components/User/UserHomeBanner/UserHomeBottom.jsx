import React from 'react';
// import '../../../App.css';
// import '../../../index.css';
import './UserHomeBanner.css';
import buy from '../../../images/type-1.webp';
import rent from '../../../images/type-2.webp';
import sell from '../../../images/type-3.webp';
import lease from '../../../images/type-4.webp';

const UserHomeBottom = () => {
  return (
    <React.Fragment>
      <div className='row pl-1 pr-1 bottom-container'>
        <div className="col-2 bottom-image-container" >
          <img src={buy} alt="buy" className='bottom-img' />
          <div className='bottom-text p-2 font-semibold' style={{backgroundColor: '#C9C2F6'}}><span className='text-indigo-900'>BUY</span> PROPERTY</div>
        </div>
        <div className="col-2 bottom-image-container">
          <img src={rent} alt="rent" className='bottom-img'/>
          <div className='bottom-text p-2 font-semibold' style={{backgroundColor: '#C9C2F6'}}><span className='text-red-700'>RENT</span> PROPERTY</div>
        </div>
        <div className="col-2 bottom-image-container">
          <img src={sell} alt="sell" className='bottom-img' />
          <div className='bottom-text p-2 font-semibold' style={{backgroundColor: '#C9C2F6'}}><span className='text-green-800'>SELL</span> PROPERTY</div>
        </div>
        <div className="col-2 bottom-image-container">
          <img src={lease} alt="lease" className='bottom-img' />
          <div className='bottom-text p-2 font-semibold' style={{backgroundColor: '#C9C2F6'}}><span className='text-yellow-700'>LEASE</span> PROPERTY</div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default UserHomeBottom