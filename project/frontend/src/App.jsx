import React, { useEffect } from 'react';
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

const App = () => {
  // Private Route
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