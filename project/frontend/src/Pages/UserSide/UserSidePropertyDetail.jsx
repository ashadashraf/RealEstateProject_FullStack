import React from 'react'
import UserHeader from '../../Components/User/UserHeader/UserHeader';
import UserDisplayProperty from '../../Components/User/UserDisplayProperty/UserDisplayProperty';
import UserFooter from '../../Components/User/UserFooter/UserFooter';

const UserSidePropertyDetail = () => {
  return (
    <React.Fragment>
        <UserHeader />
        <UserDisplayProperty />
        <UserFooter />
    </React.Fragment>
  )
}

export default UserSidePropertyDetail