import React from 'react'
import UserDisplayPropertyTop from './UserDisplayPropertyTop';
import UserDisplayPropertyMid from './UserDisplayPropertyMid';
import UserDisplayPropertyBottom from './UserDisplayPropertyBottom';
const UserDisplayProperty = () => {
  return (
    <React.Fragment>
      <div className='m-0 p-0' style={{backgroundColor: '#080231'}}>
        <hr />
        <UserDisplayPropertyTop />
        <hr />
        <UserDisplayPropertyMid />
        <UserDisplayPropertyBottom />
      </div>
    </React.Fragment>
  )
}

export default UserDisplayProperty