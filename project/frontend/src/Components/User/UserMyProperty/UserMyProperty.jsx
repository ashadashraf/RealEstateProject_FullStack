import './UserMyProperty.css';
import { useSelector } from 'react-redux';
import React from 'react'
import UserPropertyCard from '../UserPropertyListing/UserPropertyCard';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const UserMyProperty = () => {
    const history = useHistory();
    const properties = useSelector(state => state.showPropertiesList.showPropertiesList);
    return (
        <React.Fragment>
            <hr />
            {/* <h4 className='mylisting-header'><b>My Listing</b> <span style={{fontSize: '10px', marginLeft: '3px'}}>MANAGE</span></h4> */}
            <nav className="flex pl-5 pt-1" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-blue-900 dark:hover:text-gray-400">
                        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Home
                    </Link>
                    </li>
                    <li>
                    <div className="flex items-center">
                        <svg className="rtl:rotate-180 w-3 h-3 text-blue-900 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <Link to="/usermyproperty" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-blue-900 dark:hover:text-gray-400">My Listing<span style={{fontSize: '10px', marginLeft: '3px'}}>MANAGE</span></Link>
                    </div>
                    </li>
                </ol>
            </nav>

            <hr />
            <Row className='w-100'>
                {properties[0] ? 
                    <div>
                        <UserPropertyCard /> 
                        {/* <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Push</button>
                        <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pull</button> */}
                    </div>: (
                    <div className='p-5'>
                        <h4 className='w-100' style={{fontSize: '1.5vw'}}><b>!</b> You haven't posted any property yet</h4>
                        <div className='d-flex justify-center mt-3'>
                        <div onClick={() => history.push('/sellproperty')} className="w-25 p-4 cursor-pointer text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400" role="alert">
                            <div className="flex items-center justify-between h-2">
                                <span className="sr-only">Social accounts</span>
                                <h3 className="font-medium">Post a new property</h3>
                                <svg className="rtl:rotate-180 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </div>
                        </div>
                        </div>
                    </div>
                )}
            </Row>
        </React.Fragment>
    )
}

export default UserMyProperty