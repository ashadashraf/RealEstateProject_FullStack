import React from 'react'
import UserHeader from '../../Components/User/UserHeader/UserHeader';
import UserPropertyListing from '../../Components/User/UserPropertyListing/UserPropertyListing';
import UserFooter from '../../Components/User/UserFooter/UserFooter';

const UserSideListProperties = () => {
  return (
    <React.Fragment>
        <UserHeader />
        <UserPropertyListing />
        <UserFooter />
    </React.Fragment>
  )
}

export default UserSideListProperties