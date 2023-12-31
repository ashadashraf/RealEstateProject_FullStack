import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalContent,
  MDBModalBody,
} from 'mdb-react-ui-kit';
import { useHistory } from 'react-router-dom';
import auth_bg from '../../images/auth-bg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSigninModal } from '../../Redux/authModal/signinModalSlice';
import { setShowSignupModal } from '../../Redux/authModal/signupModalSlice';
import UserGoogleSignin from './UserGoogleSignin';
import { gapi } from 'gapi-script';
import { setShowIsLoggedin, setUserId, setUsername } from '../../Redux/authModal/isLoggedinSlice';
import { GoogleClientId } from '../../Services/Keys';
import { constructApiUrl } from '../../Services/ApiUtils';
// import { SuccessNotification } from '../../assets/Notification';
import { toast } from 'react-toastify';

const clientId = GoogleClientId;

export default function UserSideLogin() {
  const dispatch = useDispatch();
  const showSigninModal = useSelector(state => state.showSigninModal.value);
  const showSignupModal = useSelector(state => state.showSignupModal.value);
  const showIsLoggedin = useSelector(state => state.showIsLoggedin.value);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
    dispatch(setShowSigninModal({
      showSigninModal: !showSigninModal
    }))
  }

  const handleSignup = (event) => {
    event.preventDefault();
    dispatch(setShowSigninModal({
      showSigninModal: false
    }))
    dispatch(setShowSignupModal({
      showSignupModal: true
    }))
  };

  const handleSignin = async () => {
    setError('');

    try {
      const apiEndpoint = 'api/auth/login/';
      // const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
      const response = await fetch(constructApiUrl(apiEndpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (response.ok) {
        console.log(response);
        const data = await response.json();
        const accessToken = data.access;
        // SuccessNotification('Login Success');

        localStorage.setItem('accessToken', accessToken);
        dispatch(setShowIsLoggedin({
          showIsLoggedin: true
        }))
        dispatch(setUserId({
          userId: data.user.user_id
        }))
        dispatch(setUsername({
          username: data.user.username
        }))
        showToastMessage("Login success", "success");
        closeModalHandle();
        // window.location.href = '/';
      } else {
        console.log(response)
        setError('Login failed. Please check your credentials');
        showToastMessage("Login failed. Please check your credentials", "warning");
      }
    } catch (error) {
      setError('An error occured while tring to login');
      showToastMessage("Connection error, try again later", "error");
    }
    console.log('signin:', showSignupModal, showSigninModal);
  };

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
    localStorage.setItem('accessToken', accessToken);
    console.log(1, accessToken);
  }

  const history = useHistory();

  return (
    <>
      <MDBModal staticBackdrop tabIndex="-1" show={showSigninModal} onHide={closeModalHandle}>
        <MDBModalDialog>
          <MDBModalContent style={{backgroundImage: `url(${auth_bg})`, backgroundSize: 'cover'}}>
          <div style={{backdropFilter: 'blur(2.5px)'}}>
            <MDBModalHeader>
              <MDBModalTitle className="h2 text-white">Login</MDBModalTitle>
              <MDBBtn className="btn-close" color="white" onClick={closeModalHandle}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBContainer fluid className="d-flex align-items-center justify-content-center">
                <MDBCard className="m-5" style={{ maxWidth: '450px', background: 'none', border: 'none' }}>
                  <MDBCardBody className="px-1">
                    <MDBInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} wrapperClass="mb-4" size="sm" id="login-form1" type="email" />
                    <MDBInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} wrapperClass="mb-4" size="sm" id="login-form2" type="password" />
                    {error && <div className='text-danger'>{error}</div>}
                    <button className='mb-4 h-7 rounded-md w-100 gradient-custom-4 bg-blue-200' onClick={handleSignin} size='sm'>Login</button>
                    {/* <UserGoogleSignin onClick={googleSignin} /> */}
                  </MDBCardBody>
                  <p className="text-white cursor-pointer" onClick={handleSignup}>Don't have an account? Sign up here.</p>
                </MDBCard>
              </MDBContainer>
            </MDBModalBody>
          </div>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
