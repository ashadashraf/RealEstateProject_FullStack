import './UserMyProperty.css';
import { useSelector } from 'react-redux';
import React, { useState } from 'react'
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
    // const [isModalOpen, setIsModalOpen] = useState(true);
    // const toggleModal = () => {
    //     setIsModalOpen(!isModalOpen);
    // };
    // console.log(properties);
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
                        <Row className='ml-3'>
                        {properties.map((property) => (
                            <Col key={property.id} lg={4} sm={6} xs={6} className='p-1 m-0'>
                            <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={property.images[0].image} alt=""></img>
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{property.property_name}</h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{property.address}</p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{property.email}</p>
                                    {property.is_active ? (
                                        <button onClick={() => handleStatus(property.user_id, property.id, property.is_active)} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Block</button>
                                        ): (
                                        <button onClick={() => handleStatus(property.user_id, property.id, property.is_active)} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Unblock</button>
                                    )}
                                    <button onClick={() => history.push(`/editproperty/${property.id}`)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Modify</button>
                                    {/* <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" onClick={() => toggleModal()} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                    Toggle modal
                                    </button>

                                    <div id="crud-modal" tabIndex="-1" aria-hidden={!isModalOpen} className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                        <div className="relative p-4 w-full max-w-md max-h-full">
                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        Create New Product
                                                    </h3>
                                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                    </button>
                                                </div>
                                                <form className="p-4 md:p-5">
                                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                                        <div className="col-span-2">
                                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                                                        </div>
                                                        <div className="col-span-2 sm:col-span-1">
                                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                                            <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                                                        </div>
                                                        <div className="col-span-2 sm:col-span-1">
                                                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                                            <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                                <option defaultValue="">Select category</option>
                                                                <option value="TV">TV/Monitors</option>
                                                                <option value="PC">PC</option>
                                                                <option value="GA">Gaming/Console</option>
                                                                <option value="PH">Phones</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-span-2">
                                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                                            <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                                        Add new product
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div> */}
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
        </React.Fragment>
    )
}

export default UserMyProperty