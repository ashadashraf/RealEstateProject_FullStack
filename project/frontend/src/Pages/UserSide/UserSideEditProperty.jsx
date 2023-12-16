import React from 'react'
import UserHeader from '../../Components/User/UserHeader/UserHeader'
import UserFooter from '../../Components/User/UserFooter/UserFooter'
import UserEditProperty from '../../Components/User/UserEditProperty/UserEditProperty'
import { useParams } from 'react-router-dom'

const UserSideEditProperty = () => {
    const { propertyId } = useParams();
  return (
    <React.Fragment>
        <UserHeader />
        <UserEditProperty propertyId={propertyId} />
        <UserFooter />
    </React.Fragment>
  )
}

export default UserSideEditProperty