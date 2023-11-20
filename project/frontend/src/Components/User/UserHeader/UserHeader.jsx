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
  
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(resetPropertyAddress());
    dispatch(setShowIsLoggedin({
      showIsLoggedin: false
    }));
    console.log('Data exists. Resetting the data...');
    localStorage.removeItem('accessToken');
    dispatch(removeUserData());
    window.location.href = '/';
  }

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
      const response = await axios.get('http://127.0.0.1:8000/api/property/myproperty/', {
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
        console.log('Response', response);
      }
    } catch(error) {
      if (error.response.status === 401) {
        console.log('nope');
        alert('Please login');
      }
      console.log('failed to sent the request', error.response);
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
        <Container width='100vw'>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
          <Navbar.Collapse id="basic-navbar-nav" className='row'>
            <Nav className="inline-flex justify-around columns-auto">
              <Nav.Link href="#features" className='text-white columns-1'>BUY</Nav.Link>
              {userId 
              ?
              <Link to="/sellproperty" className='text-white columns-1 mt-2'>SELL</Link>
              :
              <Link to="#" className='text-white columns-1 mt-2' onClick={() => handleModal('signin')}>SELL</Link>
              }
              <Link to="/" style={{letterSpacing: '12px', fontFamily: 'Koulen', fontSize: '20px', paddingBottom: '0rem', paddingTop: '0.2rem'}} className='text-white mx-4'>RYKERZ REAL ESTATES</Link>
              {/* <Navbar.Brand href="/" style={{letterSpacing: '12px', fontFamily: 'Koulen', fontSize: '20px', paddingBottom: '0rem', paddingTop: '0.2rem'}} className='text-white mx-4'>RYKERZ REAL ESTATES</Navbar.Brand> */}
              {showIsLoggedin ? (
                showIsGoogleLoggedin ? (
                  <UserGoogleSignout />
                ): (
                  <Link to="#" className='text-white columns-1 mt-2' onClick={handleLogout}>LOGOUT</Link>
                )
              ): (
                <>
                  {/* <Link to="#" className='text-white columns-1 mt-2' onClick={() => handleModal('signup')}>SIGN UP</Link> */}
                  {showSignupModal && <UserSideSignup />}
                  <Link to="#" className='text-white columns-1 mt-2' onClick={() => handleModal('signin')}>LOG IN</Link>
                  {showSigninModal && <UserSideLogin />}
                </>
              )}
              <NavDropdown title="MANAGE" id="basic-nav-dropdown" className='manage-text'>
                <NavDropdown.Item href="#action/3.1" className='main-bg' onClick={() => handleMyProperty()}>MY LISTING</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" className='main-bg'>MESSAGES</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" className='main-bg'>HISTORY</NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item href="#action/3.4" className='main-bg'>PAYMENT</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.5" className='main-bg'>PROFILE</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#deets" className='text-white columns-1'><BsFillBagHeartFill style={{width: '1.2rem', height: '1.2rem'}} /></Nav.Link>
              <Nav.Link href="#memes" className='text-white columns-1'><MdMessage style={{width: '1.4rem', height: '1.4rem', paddingTop: '0.1rem'}} /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default UserHeader;






// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { BsFillBagHeartFill } from 'react-icons/bs';
// import { MdMessage } from 'react-icons/md';
// import './UserHeader.css';
// import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import App from '../../../App';

// function UserHeader() {
//   const history = useHistory();

//   return (
//     <React.Fragment>
//       <Navbar collapseOnSelect expand="lg" className="bg-home-blue">
//         <Container width='100vw'>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
//           <Navbar.Collapse id="basic-navbar-nav" className='row'>
//             <Nav className="inline-flex justify-around columns-auto">
//               <Nav.Link href="#features" className='text-white columns-1'>BUY</Nav.Link>
//               <Nav.Link href="#pricing" className='text-white columns-1'>SELL</Nav.Link>
//               <Navbar.Brand href="#home" style={{letterSpacing: '12px', fontFamily: 'Koulen', fontSize: '20px', paddingBottom: '0rem', paddingTop: '0.2rem'}} className='text-white mx-4'>RYKERZ REAL ESTATES</Navbar.Brand>
//               <Link to='/usersignup' className="text-white columns-1 mt-2" >SIGN UP</Link>
//               <NavDropdown title="MANAGE" id="basic-nav-dropdown" className='manage-text'>
//                 <NavDropdown.Item href="#action/3.1" className='main-bg'>MY LISTING</NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.2" className='main-bg'>MESSAGES</NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.3" className='main-bg'>HISTORY</NavDropdown.Item>
//                 {/* <NavDropdown.Divider /> */}
//                 <NavDropdown.Item href="#action/3.4" className='main-bg'>PAYMENT</NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.5" className='main-bg'>PROFILE</NavDropdown.Item>
//               </NavDropdown>
//               <Nav.Link href="#deets" className='text-white columns-1'><BsFillBagHeartFill style={{width: '1.2rem', height: '1.2rem'}} /></Nav.Link>
//               <Nav.Link href="#memes" className='text-white columns-1'><MdMessage style={{width: '1.4rem', height: '1.4rem', paddingTop: '0.1rem'}} /></Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//     </React.Fragment>
//   );
// }

// export default UserHeader;