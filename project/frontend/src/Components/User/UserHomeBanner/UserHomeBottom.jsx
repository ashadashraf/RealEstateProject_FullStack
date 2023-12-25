import React from 'react';
// import '../../../App.css';
// import '../../../index.css';
import './UserHomeBanner.css';
import buy from '../../../images/type-1.webp';
import rent from '../../../images/type-2.webp';
import sell from '../../../images/type-3.webp';
import lease from '../../../images/type-4.webp';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import { constructApiUrl } from '../../../Services/ApiUtils';
import axios from 'axios';
import { addPropertiesList } from '../../../Redux/userProperty/propertiesListSlice'

const UserHomeBottom = () => {
  const userId = useSelector(state => state.showIsLoggedin.userId);
  const history = useHistory();
  const dispatch = useDispatch();
  const showIsLoggedin = useSelector(state => state.showIsLoggedin.value);
  console.log(showIsLoggedin);
  const handleSellProperty = () => {
    if (showIsLoggedin) {
      history.push('/sellproperty');
    } else {
      showToastMessage("Please Login !", "warning");
    }
  };
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
  const handleBrowseByTransactionType = async (transactionType) => {
    try {
      const apiEndpoint = 'api/property/browsebytransactiontype/';
      // const response = await axios.get('http://127.0.0.1:8000/api/property/browsebytype/', {
        const response = await axios.get(constructApiUrl(apiEndpoint), {
        params: {
          transaction_type: transactionType,
          user_id: userId,
        },
      });
      if (response.status === 200) {
        console.log('success');
        console.log(response.data.data);
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
      <div className='row pl-1 pr-1 bottom-container'>
        <div onClick={() => handleBrowseByTransactionType('Sale')} className="col-2 bottom-image-container" >
          <img src={buy} alt="buy" className='bottom-img' />
          <div className='bottom-text p-2 font-semibold' style={{backgroundColor: '#C9C2F6'}}><span className='text-indigo-900'>BUY</span> PROPERTY</div>
        </div>
        <div onClick={() => handleBrowseByTransactionType('Rent')} className="col-2 bottom-image-container">
          <img src={rent} alt="rent" className='bottom-img'/>
          <div className='bottom-text p-2 font-semibold' style={{backgroundColor: '#C9C2F6'}}><span className='text-red-700'>RENT</span> PROPERTY</div>
        </div>
        <div onClick={handleSellProperty} className="col-2 bottom-image-container">
          <img src={sell} alt="sell" className='bottom-img' />
          <div className='bottom-text p-2 font-semibold' style={{backgroundColor: '#C9C2F6'}}><span className='text-green-800'>SELL</span> PROPERTY</div>
        </div>
        <div onClick={() => handleBrowseByTransactionType('Lease')} className="col-2 bottom-image-container">
          <img src={lease} alt="lease" className='bottom-img' />
          <div className='bottom-text p-2 font-semibold' style={{backgroundColor: '#C9C2F6'}}><span className='text-yellow-700'>LEASE</span> PROPERTY</div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default UserHomeBottom