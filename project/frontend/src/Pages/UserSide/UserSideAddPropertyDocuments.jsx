import React from 'react'
import UserHeader from '../../Components/User/UserHeader/UserHeader'
import UserPropertySell from '../../Components/User/UserPropertySell/UserPropertySell'
import UserPostPropertyDocuments from '../../Components/User/UserPropertySell/UserPropertyTypes/UserPostPropertyDocuments'

const UserSideAddPropertyDocuments = () => {
  return (
    <React.Fragment>
        <UserHeader />
        <UserPropertySell />
        <UserPostPropertyDocuments />
    </React.Fragment>
  )
}

export default UserSideAddPropertyDocuments