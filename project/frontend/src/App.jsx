import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import './index.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserSideHome from './Pages/UserSide/UserSideHome';
import UserSideSignup from './Pages/UserSide/UserSideSignup';
// import UserSideLogin from './Pages/UserSide/UserSideLogin';
import NotFound from './Pages/NotFound';
import UserGoogleSignin from './Pages/UserSide/UserGoogleSignin';
import UserGoogleSignout from './Pages/UserSide/UserGoogleSignout';
// import UserSideSellProperty from './Pages/UserSide/UserSideSellProperty';
// import UserSideMarkProperty from './Pages/UserSide/UserSideMarkProperty';
// import UserSideAddPropertyDetails from './Pages/UserSide/UserSideAddPropertyDetails';
// import UserSideAddPropertyDocuments from './Pages/UserSide/UserSideAddPropertyDocuments';
import UserSideListProperties from './Pages/UserSide/UserSideListProperties';
import UserSidePropertyDetail from './Pages/UserSide/UserSidePropertyDetail';
// import UserSideEditProperty from './Pages/UserSide/UserSideEditProperty';
// import UserSideManageMyProperty from './Pages/UserSide/UserSideManageMyProperty';
// import VideoChat from './Pages/UserSide/VideoChat';
// import UserSideFavourites from './Pages/UserSide/UserSideFavourites';
// import { useDispatch, useSelector } from 'react-redux';
// import { setShowSocket } from './Redux/socketIO/socketSlice';
// import socketIO from 'socket.io-client';

const UserSideSellProperty = lazy(() => import('./Pages/UserSide/UserSideSellProperty'));
const UserSideMarkProperty = lazy(() => import('./Pages/UserSide/UserSideMarkProperty'));
const UserSideAddPropertyDetails = lazy(() => import('./Pages/UserSide/UserSideAddPropertyDetails'));
const UserSideAddPropertyDocuments = lazy(() => import('./Pages/UserSide/UserSideAddPropertyDocuments'));
// const UserSideListProperties = lazy(() => import('./Pages/UserSide/UserSideListProperties'));
// const UserSidePropertyDetail = lazy(() => import('./Pages/UserSide/UserSidePropertyDetail'));
const UserSideManageMyProperty = lazy(() => import('./Pages/UserSide/UserSideManageMyProperty'));
const VideoChat = lazy(() => import('./Pages/UserSide/VideoChat'));
const UserSideEditProperty = lazy(() => import('./Pages/UserSide/UserSideEditProperty'));
const UserSideFavourites = lazy(() => import('./Pages/UserSide/UserSideFavourites'));

const App = () => {
  const loader = (
    <div class="flex items-center justify-center w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" style={{height:'370px'}}>
        <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Suspense fallback={loader}>
          <ToastContainer />
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
            <Route path='/editproperty/:propertyId'>
              <UserSideEditProperty />
            </Route>
            <Route path='/favourites'>
              <UserSideFavourites />
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
        </Suspense>
      </div>
    </Router>
  )
}

export default App