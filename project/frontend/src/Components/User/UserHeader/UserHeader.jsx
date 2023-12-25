import React, { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { MdMessage } from 'react-icons/md';
import './UserHeader.css';
import UserSideSignup from '../../../Pages/UserSide/UserSideSignup';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSignupModal } from '../../../Redux/authModal/signupModalSlice';
import UserSideLogin from '../../../Pages/UserSide/UserSideLogin';
import { setShowSigninModal } from '../../../Redux/authModal/signinModalSlice';
import UserGoogleSignout from '../../../Pages/UserSide/UserGoogleSignout';
import { removeUserData, setShowIsLoggedin } from '../../../Redux/authModal/isLoggedinSlice';
import { Link } from 'react-router-dom';
import { resetPropertyAddress } from '../../../Redux/sellPropertyDetails/propertyAddressSlice';
import {useHistory} from 'react-router-dom';
import { addPropertiesList } from '../../../Redux/userProperty/propertiesListSlice';
import axios from 'axios';
import UserMessages from '../UserMessages/UserMessages';
import { constructApiUrl } from '../../../Services/ApiUtils';
import { toast } from 'react-toastify';

function UserHeader() {
  // const [showSignupModal, setShowSignupModal] = useState(false);
  const showSignupModal = useSelector(state => state.showSignupModal.value);
  const showSigninModal = useSelector(state => state.showSigninModal.value);
  const showIsLoggedin = useSelector(state => state.showIsLoggedin.value);
  const showIsGoogleLoggedin = useSelector(state => state.showIsGoogleLoggedin.value);
  const userId = useSelector(state => state.showIsLoggedin.userId);
  const history = useHistory();
  
  const dispatch = useDispatch()
  const user_id = useSelector(state => state.showIsLoggedin.userId);
  const token = localStorage.getItem('accessToken')
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
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
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(resetPropertyAddress());
    dispatch(setShowIsLoggedin({
      showIsLoggedin: false
    }));
    console.log('Data exists. Resetting the data...');
    localStorage.removeItem('accessToken');
    dispatch(removeUserData());
    showToastMessage("Logout success", "success");
    history.push('/');
    // window.location.href = '/';
  };

  const handleModal = useCallback((modalType) => {
    if (modalType === 'signup') {
      dispatch(setShowSignupModal({
        showSignupModal:true
      }), setShowSigninModal({
        showSigninModal: false
      }));
    } else if (modalType === 'signin') {
      dispatch(setShowSigninModal({
        showSigninModal:true
      }), setShowSignupModal({
        showSignupModal: false
      }));
    }
  }, [dispatch]);

  const handleMyProperty = async () => {
    try {
      const apiEndpoint = 'api/property/myproperty/';
      const response = await axios.get(constructApiUrl(apiEndpoint), {
        params: {
            user_id: user_id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log('success');
        console.log(response.data);
        dispatch(addPropertiesList({
            showPropertiesList: response.data
        }));
        history.push('/usermyproperty');
      } else {
        console.log('failed');
        console.log(response.data);
        const errorText = await response.text();
        console.log('Error Details:', errorText);
        console.log('Status', response.status);
        showToastMessage(errorText, "error");
        console.log('Response', response);
      }
    } catch(error) {
      if (error.response?.status === 401) {
        console.log('nope');
        showToastMessage("Please Login !", "warning");
      } else {
        showToastMessage("Connection error, try again later", "error");
      }
      console.log('failed to sent the request', error.response);
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
  useEffect(() => {
    dispatch(setShowIsLoggedin({
      showIsLoggedin: !!token
    }));
    console.log(showIsLoggedin, !!token);
    // setIsLoggedIn(!!token);
  }, [dispatch]);

  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" className="bg-home-blue">
        <Container width='100vw' style={{marginLeft: '100px'}}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
          <Navbar.Collapse id="basic-navbar-nav" className='row'>
            <Nav className="inline-flex justify-around columns-auto">
              <Nav.Link href="" onClick={() => handleBrowseByTransactionType('Sale')} className='text-white columns-1'>BUY</Nav.Link>
              {userId 
              ?
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/sellproperty" className='text-white columns-1 mt-2'>SELL</Link>
              :
              <Link style={{ textDecoration: 'none', color: 'white' }} to="#" className='text-white columns-1 mt-2' onClick={() => handleModal('signin')}>SELL</Link>
              }
              <Link to="/" style={{textDecoration: 'none', color: 'white', letterSpacing: '12px', fontFamily: 'Koulen', fontSize: '20px', paddingBottom: '0rem', paddingTop: '0.2rem'}} className='text-white mx-4'>RYKERZ REAL ESTATES</Link>
              {/* <Navbar.Brand href="/" style={{letterSpacing: '12px', fontFamily: 'Koulen', fontSize: '20px', paddingBottom: '0rem', paddingTop: '0.2rem'}} className='text-white mx-4'>RYKERZ REAL ESTATES</Navbar.Brand> */}
              {showIsLoggedin ? (
                showIsGoogleLoggedin ? (
                  <UserGoogleSignout />
                ): (
                  <Link style={{ textDecoration: 'none', color: 'white' }} to="#" className='text-white columns-1 mt-2' onClick={handleLogout}>LOGOUT</Link>
                )
              ): (
                <>
                  {/* <Link to="#" className='text-white columns-1 mt-2' onClick={() => handleModal('signup')}>SIGN UP</Link> */}
                  {showSignupModal && <UserSideSignup />}
                  <Link style={{ textDecoration: 'none', color: 'white' }} to="#" className='text-white columns-1 mt-2' onClick={() => handleModal('signin')}>LOG IN</Link>
                  {showSigninModal && <UserSideLogin />}
                </>
              )}
              <NavDropdown title="MANAGE" id="basic-nav-dropdown" className='manage-text'>
                <NavDropdown.Item href="#action/3.1" className='main-bg' onClick={() => handleMyProperty()}>MY LISTING</NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.2" className='main-bg'>MESSAGES</NavDropdown.Item> */}
                {/* <NavDropdown.Item href="#action/3.3" className='main-bg'>HISTORY</NavDropdown.Item> */}
                {/* <NavDropdown.Divider /> */}
                {/* <NavDropdown.Item href="#action/3.4" className='main-bg'>PAYMENT</NavDropdown.Item> */}
                {/* <NavDropdown.Item href="#" data-popover-target="popover-user-profile" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className='main-bg'>PROFILE</NavDropdown.Item> */}
                {/* <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">User profile</button> */}
                {/* <div style={{ display: open ? 'block' : 'none' }} data-popover id="popover-user-profile" role="tooltip" className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
                    <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                            <a href="#">
                                <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese Leos">
                            </a>
                            <div>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Follow</button>
                            </div>
                        </div>
                        <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                            <a href="#">Jese Leos</a>
                        </p>
                        <p className="mb-3 text-sm font-normal">
                            <a href="#" className="hover:underline">@jeseleos</a>
                        </p>
                        <p className="mb-4 text-sm">Open-source contributor. Building <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">flowbite.com</a>.</p>
                        <ul className="flex text-sm">
                            <li className="me-2">
                                <a href="#" className="hover:underline">
                                    <span className="font-semibold text-gray-900 dark:text-white">799</span>
                                    <span>Following</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    <span className="font-semibold text-gray-900 dark:text-white">3,758</span>
                                    <span>Followers</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div data-popper-arrow></div>
                </div> */}
              </NavDropdown>
              <Nav.Link href="/favourites" className='text-white columns-1'><BsFillBagHeartFill style={{width: '1.2rem', height: '1.2rem'}} /></Nav.Link>
              <Nav.Link href="" className='text-white columns-1' data-drawer-target="drawer-right-card-list" data-drawer-show="drawer-right-card-list" data-drawer-placement="right" aria-controls="drawer-right-card-list"><MdMessage style={{width: '1.4rem', height: '1.4rem', paddingTop: '0.1rem'}} /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div id="drawer-right-card-list" className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-black w-50 md:w-75 dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-right-label">
          <button type="button" data-drawer-hide="drawer-right-card-list" aria-controls="drawer-right-card-list" className="pb-3 text-gray-400 bg-transparent hover:bg-black hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close menu</span>
          </button>
          <UserMessages />
      </div>
    </React.Fragment>
  );
}

export default UserHeader;