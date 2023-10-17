import React from 'react'
import UserHeader from '../../Components/User/UserHeader/UserHeader'
import UserMarkProperty from '../../Components/User/UserPropertySell/UserMarkProperty'
import UserFooter from '../../Components/User/UserFooter/UserFooter'
import UserPropertySell from '../../Components/User/UserPropertySell/UserPropertySell'

const UserSideMarkProperty = () => {
  return (
    <React.Fragment>
        <UserHeader />
        <UserPropertySell />
        <UserMarkProperty />
        <UserFooter />
    </React.Fragment>
  )
}

export default UserSideMarkProperty