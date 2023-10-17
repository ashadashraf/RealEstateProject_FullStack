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

const clientId = "326905070026-tf2q1rkmteq5ft6ssg0155k7s3m8l5uf.apps.googleusercontent.com";

export default function UserSideLogin() {
  const dispatch = useDispatch();
  const showSigninModal = useSelector(state => state.showSigninModal.value);
  const showSignupModal = useSelector(state => state.showSignupModal.value);
  const showIsLoggedin = useSelector(state => state.showIsLoggedin.value);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
  }

  const handleSignin = async () => {
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
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
        closeModalHandle();
        // window.location.href = '/';
      } else {
        setError('Login failed. Please check your credentials');
      }
    } catch (error) {
      setError('An error occured while tring to login');
    }
    console.log('signin:', showSignupModal, showSigninModal);
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
                    <UserGoogleSignin onClick={googleSignin} />
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
