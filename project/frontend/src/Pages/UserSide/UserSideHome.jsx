import React from 'react'
import '../../index.css';
import '../../App.css';
import UserHeader from '../../Components/User/UserHeader/UserHeader'
import UserHomeBanner from '../../Components/User/UserHomeBanner/UserHomeBanner'
import UserFooter from '../../Components/User/UserFooter/UserFooter'

function UserSideHome() {
  return (
    <React.Fragment>
      <div style={{width: '100%'}}>
        <UserHeader />
        <UserHomeBanner />
        <UserFooter />
      </div>
    </React.Fragment>
  )
}

export default UserSideHome