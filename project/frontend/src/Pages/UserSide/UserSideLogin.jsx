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
  MDBModalFooter,
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
  const [sampleCredentials, setSampleCredentials] = useState(true);

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
                <div className="m-5" style={{ maxWidth: '450px', background: 'none', border: 'none' }}>
                  <MDBCardBody className="px-1">
                    <MDBInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} wrapperClass="mb-4" size="sm" id="login-form1" type="email" />
                    <MDBInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} wrapperClass="mb-4" size="sm" id="login-form2" type="password" />
                    {error && <div className='text-danger'>{error}</div>}
                    <button className='mb-4 h-7 rounded-md w-100 gradient-custom-4 bg-blue-200' onClick={handleSignin} size='sm'>Login</button>
                    {/* <UserGoogleSignin onClick={googleSignin} /> */}
                  </MDBCardBody>
                  <p className="text-white cursor-pointer" onClick={handleSignup}>Don't have an account? Sign up here.</p>
                </div>
                {sampleCredentials && <div id="alert-additional-content-1" className="p-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-green-500 dark:border-blue-800" role="alert">
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium">Sample Credentials</h3>
                  </div>
                  <div className="mt-2 mb-4 text-sm">
                    <p>Email: abc@gmail.com</p>
                    <p>Password: Abc@1234</p>
                  </div>
                  <div className="flex">
                    <button onClick={() => [setEmail('abc@gmail.com'), setPassword('Abc@1234')]} type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      {/* <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                      </svg> */}
                      Use
                    </button>
                    <button onClick={() => setSampleCredentials(false)} type="button" className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                      Dismiss
                    </button>
                  </div>
                </div>}
              </MDBContainer>
            </MDBModalBody>
            {/* <MDBModalFooter>
              <MDBContainer>
                
              </MDBContainer>
            </MDBModalFooter> */}
          </div>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
