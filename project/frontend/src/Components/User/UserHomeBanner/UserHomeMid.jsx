import React from 'react'
import Container from 'react-bootstrap/Container';
import '../../../App.css';
import '../../../index.css';
import house from '../../../images/browse-house-1.jpg';
import apartment from '../../../images/browse-apartment-2.jpg';
import business_complex from '../../../images/browse-business_complex-3.jpg';
import land from '../../../images/browse-land-4.jpg';

const UserHomeMid = () => {
  return (
    <div style={{backgroundColor: '#C9C2F6'}}>
      <h1 className='text-lg font-semibold p-2 p-md-3 p-lg-4'>BROWSE PROPERTIES IN INDIA</h1>
      <div className='row ml-7 mr-7 mb-3 browse-container'>
        <div className="col-3 browse-image-container" >
          <img src={house} alt="House" className='browse-img' />
          <div className="text-overlay">
            <div className='browse-text font-semibold'>HOUSES</div>
          </div>
        </div>
        <div className="col-3 browse-image-container">
          <img src={apartment} alt="Apartment" className='browse-img'/>
          <div className="text-overlay">
            <div className='browse-text font-semibold'>FLAT <br /> & <br /> APARTMENT</div>
          </div>
        </div>
        <div className="col-3 browse-image-container">
          <img src={business_complex} alt="Business_complex" className='browse-img' />
          <div className="text-overlay">
            <div className='browse-text font-semibold'>BUSINESS <br /> COMPLEX</div>
          </div>
        </div>
        <div className="col-3 browse-image-container">
          <img src={land} alt="Land" className='browse-img' />
          <div className="text-overlay">
            <div className='browse-text font-semibold'>LAND</div>
          </div>
        </div>
      </div>
      <br />
    </div>
  )
}

export default UserHomeMid