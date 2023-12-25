import React from 'react'
import UserHeader from '../../Components/User/UserHeader/UserHeader';
import UserFavourites from '../../Components/User/UserFavourites/UserFavourites';
import UserFooter from '../../Components/User/UserFooter/UserFooter';

const UserSideManageMyProperty = () => {
  return (
    <React.Fragment>
        <UserHeader />
        <UserFavourites />
        <UserFooter />
    </React.Fragment>
  )
}

export default UserSideManageMyProperty