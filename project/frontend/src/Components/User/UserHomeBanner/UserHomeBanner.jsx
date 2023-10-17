import React from 'react'
import Container from 'react-bootstrap/Container';
import '../../../App.css';
import '../../../index.css';
import './UserHomeBanner.css';
import myImage from '../../../images/bg-home.jpg';
import Mapbox from '../Mapbox/Mapbox';
import UserHomeMid from './UserHomeMid';
import UserHomeBottom from './UserHomeBottom';
import Form from 'react-bootstrap/Form';

function UserHomeBanner() {
  return (
    <React.Fragment>
      <div className='row' style={{display:'flex', justifyContent:'center'}}>
        <div className="col-6 position-relative" >
          <img src={myImage} alt="Image" style={{width: '100%'}} className='image-container' />
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
            <Form.Control type="text" placeholder="Address, School, City, ZIP or Neighborhood" className='m-5 border-0 bg-blue-200' />
          </div>
        </div>
        <div className="col-6 position-relative">
          <Mapbox />
        </div>
      </div>
      <UserHomeMid />
      <UserHomeBottom />
    </React.Fragment>
  )
}

export default UserHomeBanner