import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Mapbox from '../Mapbox/Mapbox';
import { removePropertyElement, resetPropertyAddress } from '../../../Redux/sellPropertyDetails/propertyAddressSlice';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserMarkProperty = () => {
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
  const transactionType = useSelector(state => state.showPropertyAddress.transactionType);
  const address = useSelector(state => state.showPropertyAddress.address);
  const unit = useSelector(state => state.showPropertyAddress.unit);
  const city = useSelector(state => state.showPropertyAddress.city);
  const state = useSelector(state => state.showPropertyAddress.state);
  const pincode = useSelector(state => state.showPropertyAddress.pincode);
  const coordinates = useSelector(state => state.showPropertyAddress.coordinates);
  
  const history = useHistory();
  const dispatch = useDispatch();

  const handleMapMark = () => {
    if (transactionType && address && unit && city && state && pincode && coordinates.lat !== undefined && coordinates.lng !== undefined) {
      // console.log('Data exists. Resetting the data...');
      // dispatch(resetPropertyAddress());
      // dispatch(removePropertyElement('address'));
      history.push('/postpropertydetails');
    } else if (coordinates.lat === undefined || coordinates.lng === undefined) {
      showToastMessage("Please mark property location", "warning");
      // alert('mark the property location');
      // console.log('Data does not exist. Removing a specific property...');
      // dispatch(removePropertyElement('address'));
    } else {
      history.push('/sellproperty')
    }
  }

  return (
    <React.Fragment>
      <div className='p-3'>
        <h3 className='text-2xl font-bold'>For {transactionType} By Owner Listing</h3>
        <p className='text-xl'>{address}, {unit}, {city}, {state}, {pincode}</p>
        <p className='text-base'>Is this an accurate location of your property ?</p>
      </div>
      {/* <div className='map-mark'></div> */}
      <Mapbox />
      <button onClick={handleMapMark} className='bg-red-500 p-3 rounded' style={{marginTop: '5rem'}}>CONFIRM</button>
    </React.Fragment>
  )
}

export default UserMarkProperty