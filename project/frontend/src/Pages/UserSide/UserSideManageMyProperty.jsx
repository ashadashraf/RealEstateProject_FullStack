import React from 'react'
import UserHeader from '../../Components/User/UserHeader/UserHeader';
import UserMyProperty from '../../Components/User/UserMyProperty/UserMyProperty';
import UserFooter from '../../Components/User/UserFooter/UserFooter';

const UserSideManageMyProperty = () => {
  return (
    <React.Fragment>
        <UserHeader />
        <UserMyProperty />
        <UserFooter />
    </React.Fragment>
  )
}

export default UserSideManageMyProperty