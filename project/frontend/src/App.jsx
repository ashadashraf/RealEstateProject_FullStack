import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import './index.css';
import UserSideHome from './Pages/UserSide/UserSideHome';
import UserSideSignup from './Pages/UserSide/UserSideSignup';
// import UserSideLogin from './Pages/UserSide/UserSideLogin';
import NotFound from './Pages/NotFound';
import UserGoogleSignin from './Pages/UserSide/UserGoogleSignin';
import UserGoogleSignout from './Pages/UserSide/UserGoogleSignout';
import UserSideSellProperty from './Pages/UserSide/UserSideSellProperty';
import UserSideMarkProperty from './Pages/UserSide/UserSideMarkProperty';
import UserSideAddPropertyDetails from './Pages/UserSide/UserSideAddPropertyDetails';
import UserSideAddPropertyDocuments from './Pages/UserSide/UserSideAddPropertyDocuments';
import UserSideListProperties from './Pages/UserSide/UserSideListProperties';
import UserSidePropertyDetail from './Pages/UserSide/UserSidePropertyDetail';
import UserSideManageMyProperty from './Pages/UserSide/UserSideManageMyProperty';
import VideoChat from './Pages/UserSide/VideoChat';
// import { useDispatch, useSelector } from 'react-redux';
// import { setShowSocket } from './Redux/socketIO/socketSlice';
// import socketIO from 'socket.io-client';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <UserSideHome />
          </Route>
          <Route path='/sellproperty'>
            <UserSideSellProperty />
          </Route>
          <Route path="/markproperty">
            <UserSideMarkProperty />
          </Route>
          <Route path='/postpropertydetails'>
            <UserSideAddPropertyDetails />
          </Route>
          <Route path='/postpropertydocuments'>
            <UserSideAddPropertyDocuments />
          </Route>
          <Route path='/userlistproperties'>
            <UserSideListProperties />
          </Route>
          <Route path='/userpropertydetail'>
            <UserSidePropertyDetail />
          </Route>
          <Route path='/usermyproperty'>
            <UserSideManageMyProperty />
          </Route>
          <Route path='/room/:roomID'>
            <VideoChat />
          </Route>
          {/* <Route path='/usersignup'>
            <UserSideSignup />
          </Route> */}
          {/* <Route path='/userlogin'>
            <UserSideLogin />
          </Route> */}
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App