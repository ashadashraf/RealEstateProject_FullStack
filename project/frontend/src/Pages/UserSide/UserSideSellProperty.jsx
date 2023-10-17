import React from 'react'
import UserHeader from '../../Components/User/UserHeader/UserHeader'
import UserFooter from '../../Components/User/UserFooter/UserFooter'
import UserPropertySell from '../../Components/User/UserPropertySell/UserPropertySell'
import UserPropertySellMid from '../../Components/User/UserPropertySell/UserPropertySellMid'

const UserSideSellProperty = () => {
  return (
    <React.Fragment>
        <UserHeader />
        <UserPropertySell />
        <UserPropertySellMid />
        <UserFooter />
    </React.Fragment>
  )
}

export default UserSideSellProperty