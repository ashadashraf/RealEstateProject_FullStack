import './UserMyProperty.css';
import '../UserPropertyListing/UserPropertyListing.css';
import { useSelector } from 'react-redux';
import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { constructApiUrl } from '../../../Services/ApiUtils';
import { useDispatch } from 'react-redux';
import { addPropertiesList } from '../../../Redux/userProperty/propertiesListSlice';

const UserMyProperty = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = localStorage.getItem('accessToken')
    const properties = useSelector(state => state.showPropertiesList.showPropertiesList);
    const handleStatus = async (userId, propertyId, propertyStatus) => {
        const apiEndpoint = 'api/property/status/';
        const requestData = {
            user_id: userId,
            property_id: propertyId,
            property_status: !propertyStatus
        }
        try {
            const response = await axios.put(constructApiUrl(apiEndpoint), requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                dispatch(addPropertiesList({
                    showPropertiesList: response.data
                }));
            } else {
                console.log('failed');
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };
    
    return (
        <React.Fragment>
            <div className='listing-background'>
            <hr />
            {/* <h4 className='mylisting-header'><b>My Listing</b> <span style={{fontSize: '10px', marginLeft: '3px'}}>MANAGE</span></h4> */}
            <nav className="flex pl-5 pt-1" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-blue-900">
                        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Home
                    </Link>
                    </li>
                    <li>
                    <div className="flex items-center">
                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-700 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <Link to="/usermyproperty" className="ms-1 text-sm font-medium text-blue-600 hover:text-gray-700 md:ms-2 dark:text-gray-400 dark:hover:text-blue-900">My Listing<span style={{fontSize: '10px', marginLeft: '3px'}}>MANAGE</span></Link>
                    </div>
                    </li>
                </ol>
            </nav>

            <hr />
            <Row className='w-100 card-list m-0'>
                {properties[0] ? 
                    <div>
                        <Row className='m-1'>
                        {properties.map((property) => (
                            <Col key={property.id} lg={4} sm={6} xs={6} className='p-1 m-0'>
                            <a href="#" className="glass-card flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={property.images[0].image} alt=""></img>
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{property.property_name}</h5>
                                    <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">{property.address} ({property.property_type})</p>
                                    <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">{property.email}</p>
                                    {property.is_active ? (
                                        <button onClick={() => handleStatus(property.user_id, property.id, property.is_active)} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Block</button>
                                        ): (
                                        <button onClick={() => handleStatus(property.user_id, property.id, property.is_active)} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Unblock</button>
                                    )}
                                    <button onClick={() => history.push(`/editproperty/${property.id}`)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Modify</button>
                                </div>
                            </a>
                            </Col>
                        ))}
                        </Row>
                    </div>: (
                    <div className='p-5'>
                        <h4 className='w-100' style={{fontSize: '1.5vw'}}><b>!</b> You haven't posted any property yet</h4>
                        <div className='d-flex justify-center mt-3'>
                        <div onClick={() => history.push('/sellproperty')} className="w-25 p-4 cursor-pointer text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400" role="alert">
                            <div className="flex items-center justify-between h-2">
                                <span className="sr-only">Social accounts</span>
                                <h3 className="font-medium">Post a new property</h3>
                                <svg className="rtl:rotate-180 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </div>
                        </div>
                        </div>
                    </div>
                )}
            </Row>
            </div>
        </React.Fragment>
    )
}

export default UserMyProperty