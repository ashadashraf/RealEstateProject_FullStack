import React from 'react'
import Container from 'react-bootstrap/Container';
import '../../../App.css';
import '../../../index.css';
import house from '../../../images/browse-house-1.jpg';
import apartment from '../../../images/browse-apartment-2.jpg';
import business_complex from '../../../images/browse-business_complex-3.jpg';
import land from '../../../images/browse-land-4.jpg';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPropertiesList } from '../../../Redux/userProperty/propertiesListSlice'

const UserHomeMid = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken')
  const handleBrowseProperty = async (browseType) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/property/browsebytype/', {
        params: {
          browse_type: browseType,
        },
      });
      if (response.status === 200) {
        console.log('success');
        console.log(response.data);
        dispatch(addPropertiesList({
          showPropertiesList: response.data.data
        }));
        history.push('/userlistproperties')
      } else {
        console.log('failed');
        console.log(response.data);
        const errorText = await response.text();
        console.log('Error Details:', errorText);
        console.log('Status', response.status);
        console.log('Response', response);
      }
    } catch(error) {
      console.log('failed to sent the request', error.response);
    }
  }

  return (
    <div style={{backgroundColor: '#C9C2F6'}}>
      <h1 className='text-lg font-semibold p-2 p-md-3 p-lg-4'>BROWSE PROPERTIES IN INDIA</h1>
      <div className='row ml-7 mr-7 mb-3 browse-container'>
        <div className="col-3 browse-image-container" onClick={() => handleBrowseProperty('house')} >
          <img src={house} alt="House" className='browse-img' />
          <div className="text-overlay">
            <div className='browse-text font-semibold'>HOUSES</div>
          </div>
        </div>
        <div className="col-3 browse-image-container" onClick={() => handleBrowseProperty('flat')}>
          <img src={apartment} alt="Apartment" className='browse-img'/>
          <div className="text-overlay">
            <div className='browse-text font-semibold'>FLAT <br /> & <br /> APARTMENT</div>
          </div>
        </div>
        <div className="col-3 browse-image-container" onClick={() => handleBrowseProperty('complex')}>
          <img src={business_complex} alt="Business_complex" className='browse-img' />
          <div className="text-overlay">
            <div className='browse-text font-semibold'>BUSINESS <br /> COMPLEX</div>
          </div>
        </div>
        <div className="col-3 browse-image-container" onClick={() => handleBrowseProperty('land')}>
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