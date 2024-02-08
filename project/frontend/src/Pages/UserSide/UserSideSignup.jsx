import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput
}
from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalContent,
  MDBModalBody,
} from 'mdb-react-ui-kit';
import auth_bg from '../../images/auth-bg.jpg';
import UserSideLogin from './UserSideLogin';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSignupModal } from '../../Redux/authModal/signupModalSlice';
import { setShowSigninModal } from '../../Redux/authModal/signinModalSlice';
import UserGoogleSignin from './UserGoogleSignin';
import UserGoogleSignout from './UserGoogleSignout';
import { gapi } from 'gapi-script';
import { GoogleClientId } from '../../Services/Keys';
import { constructApiUrl } from '../../Services/ApiUtils';
import { toast } from 'react-toastify';

const clientId = GoogleClientId;

export default function UserSideSignup() {
  const dispatch = useDispatch();
  const showSignupModal = useSelector(state => state.showSignupModal.value);
  const showSigninModal = useSelector(state => state.showSigninModal.value);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  let [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(null);

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
      case "success":
        toast.success(message, {
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

  const closeModalHandle = () => {
    dispatch(setShowSignupModal({
      showSignupModal: !showSignupModal
    }))
  }

  const handleSignup = async (event) => {
    event.preventDefault();
    setError('');
    phoneNumber = '+91' + phoneNumber;
    const userData = {username, email, phone_number: phoneNumber, password};
    console.log(userData);
    if (password !== confirmPassword) {
      return alert('enter a valid password')
    }
    try {
      const apiEndpoint = 'api/auth/register/';
      // const response = await fetch(`http://127.0.0.1:8000/api/auth/register/`, {
      const response = await fetch(constructApiUrl(apiEndpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Sigup successful');
        console.log(response)
        showToastMessage("Signup success", "success");
        dispatch(setShowSignupModal({showSignupModal: false}))
        window.location.href = '/';
      } else {
        const responseText = await response.text();
        // alert('Signup failed', responseText);
        setError('Signup failed.',);
        showToastMessage(`Signup failed. Please check your credentials: ${responseText}`, "warning");
        console.error('Signup failed', responseText);
      }
    } catch (error) {
      // alert("error in creating user", error);
      setError('An error occured while tring to signup');
      showToastMessage("Connection error, try again later", "error");
      console.error('An error occured:', error.response);
    }
  };

  const handleSignin = () => {
    dispatch(setShowSignupModal({
      showSignupModal: false
    }))
    dispatch(setShowSigninModal({
      showSigninModal: true
    }))
    console.log('signup:', showSignupModal, showSigninModal);
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  const googleSignin = () => {
    var accessToken = gapi.auth.getToken().access_token;
    console.log(accessToken);
    localStorage.setItem('accessToken', accessToken);
  }
  
  return (
    <>
      {/* <MDBBtn onClick={toggleShow}>SIGN UP</MDBBtn> */}
      <MDBModal staticBackdrop tabIndex='-1' show={showSignupModal} onHide={closeModalHandle}>
        <MDBModalDialog>
          <MDBModalContent style={{backgroundImage: `url(${auth_bg})`, backgroundSize: 'cover'}}>
            <div style={{backdropFilter: 'blur(2.5px)'}}>
            <MDBModalHeader>
              <MDBModalTitle className='h2 text-white'>Signup</MDBModalTitle>
              <MDBBtn className='btn-close' color='white' onClick={closeModalHandle}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <MDBContainer fluid className='d-flex align-items-center justify-content-center' >
                    {/* <div className='mask gradient-custom-3'></div> */}
                    <div className='m-5' style={{maxWidth: '450px', background:'none', border: 'none'}}>
                        <MDBCardBody className='px-1'>
                        <MDBInput placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} wrapperClass='mb-4' size='sm' id='form1' type='text'/>
                        <MDBInput placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} wrapperClass='mb-4' size='sm' id='form2' type='email'/>
                        <MDBInput placeholder='phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} wrapperClass='mb-4' size='sm' id='form3' type='email'/>
                        <MDBInput placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4' size='sm' id='form4' type='password'/>
                        <MDBInput placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} wrapperClass='mb-4' size='sm' id='form5' type='password'/>
                        {/* <MDBBtn className='mb-4 w-100 gradient-custom-4' onClick={handleSignup} size='sm'>Register</MDBBtn> */}
                        <button className='mb-4 h-7 rounded-md w-100 gradient-custom-4 bg-blue-200' onClick={handleSignup} size='sm'>Register</button>
                        {/* <UserGoogleSignin onClick={googleSignin} /> */}
                        {/* <UserGoogleSignout onClick={googleSignout} /> */}
                        </MDBCardBody>
                        <p className='text-white cursor-pointer' onClick={handleSignin}>Already user?</p>
                        {showSigninModal && <UserSideLogin />}
                    </div>
                </MDBContainer>
            </MDBModalBody>
            </div>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}