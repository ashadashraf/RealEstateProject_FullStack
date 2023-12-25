import React, { useState } from 'react'
import '../../../App.css';
import '../../../index.css';
import './UserHomeBanner.css';
import myImage from '../../../images/bg-home.jpg';
import Mapbox from '../Mapbox/Mapbox';
import UserHomeMid from './UserHomeMid';
import UserHomeBottom from './UserHomeBottom';
import { constructApiUrl } from '../../../Services/ApiUtils';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPropertiesList } from '../../../Redux/userProperty/propertiesListSlice'
import { toast } from 'react-toastify';

function UserHomeBanner() {
  const [ value, setValue ] = useState();
  console.log(value);
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.showIsLoggedin.userId);
  const showToastMessage = (message, type) => {
    switch (type) {
      case "error":
        toast.error(message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
      case "warning":
        toast.warning(message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
      default:
        toast(message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    }
  };
  const handleSearchProperty = async (e) => {
    e.preventDefault();
    try {
      const apiEndpoint = 'api/property/search/';
      // const response = await axios.get('http://127.0.0.1:8000/api/property/browsebytype/', {
        const response = await axios.get(constructApiUrl(apiEndpoint), {
        params: {
          search: value,
        },
      });
      if (response.status === 200) {
        console.log('success');
        console.log(response.data);
        dispatch(addPropertiesList({
          showPropertiesList: response.data.data
        }));
        history.push('/userlistproperties');
      } else {
        console.log('failed');
        console.log(response.data);
        const errorText = await response.text();
        console.log('Error Details:', errorText);
        console.log('Status', response.status);
        console.log('Response', response);
        showToastMessage("Failed to load data", "warning");
      }
    } catch(error) {
      console.log('failed to sent the request', error.response);
      showToastMessage("Connection error, try again later", "error");
    }
  }
  return (
    <React.Fragment>
      <div className='row w-100' style={{display:'flex', justifyContent:'center'}}>
        <div className="col-6 position-relative" >
          <img src={myImage} alt="Image" style={{width: '100%'}} className='image-container' />
          <form onSubmit={handleSearchProperty} className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">   
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <input type="search" id="default-search" value={value} onChange={(e) => setValue(e.target.value)} style={{height: '52px', width: '25vw'}} className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-blue-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-200 dark:border-gray-600 dark:placeholder-blue-950 dark:text-blue-950 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address, School, City, ZIP or Neighborhood" required />
                <button type="submit" style={{marginRight: '6px'}} className="text-white absolute end-0.5 bottom-2.5 font-medium rounded-lg text-sm px-3 py-3 dark:bg-blue-950 dark:hover:bg-blue-900 dark:focus:ring-blue-900">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                </button>
              </div>
          </form>
        </div>
        <div className="col-6 position-relative p-0">
          <Mapbox />
        </div>
      </div>
      <UserHomeMid />
      <UserHomeBottom />
    </React.Fragment>
  )
}

export default UserHomeBanner