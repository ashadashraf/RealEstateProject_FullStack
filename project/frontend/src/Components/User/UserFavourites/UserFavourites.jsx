import './UserFavourites.css';
import '../UserPropertyListing/UserPropertyListing.css';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { constructApiUrl } from '../../../Services/ApiUtils';
import { useDispatch } from 'react-redux';
import { addPropertiesList } from '../../../Redux/userProperty/propertiesListSlice';
import { toast } from 'react-toastify';
import { addPropertyDetail } from '../../../Redux/userProperty/propertyDetailSlice';

const UserFavourites = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = localStorage.getItem('accessToken');
    // const properties = useSelector(state => state.showPropertiesList.showPropertiesList);
    const userId = useSelector(state => state.showIsLoggedin.userId);
    const [properties, setProperties] = useState();
    useEffect(() => {
        const fetchData = async () => {
            console.log(userId);
            try {
                const apiEndpoint = 'api/property/favouriteproperties/';
                const response = await axios.get(constructApiUrl(apiEndpoint), {
                    params: {
                        user_id: userId,
                    },
                    // headers: {
                    //     Authorization: `Bearer ${token}`,
                    // }
                });
    
                if (response.status === 200) {
                    console.log('success');
                    console.log(response.data);
                    setProperties(response.data);
                } else {
                    console.log('failed');
                    console.log(response);
                    console.log(response.data);
                    const errorText = response.text();
                    console.log('Error Details:', errorText);
                    console.log('Status', response.status);
                    console.log('Response', response);
                    showToastMessage("Failed to load data", "warning");
                }
            } catch(error) {
                console.log('failed to send the request', error.response);
                showToastMessage("Connection error, try again later", "error");
            }
        };
    
        fetchData();
    }, []);
    
    const showToastMessage = (message, type) => {
        switch (type) {
          case "error":
            toast.error(message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            break;
          case "warning":
            toast.warning(message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            break;
          default:
            toast(message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
        }
    };
    console.log(properties);
    const handlePropertyOverview = async (property) => {
        console.log([property]);
        dispatch(addPropertyDetail({
            propertyDetail: [property]
        }));
        history.push('/userpropertydetail')
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
                        <Link to="/favourites" className="ms-1 text-sm font-medium text-blue-600 hover:text-gray-700 md:ms-2 dark:text-gray-400 dark:hover:text-blue-900">Favourites</Link>
                    </div>
                    </li>
                </ol>
            </nav>

            <hr />
            <Row className='w-100 card-list m-0'>
                {properties?.length>0 ? 
                    <div>
                        <Row className='ml-1'>
                        {properties.map((property) => (
                            <Col key={property.id} lg={4} sm={6} xs={6} className='p-1 m-0'>
                            <a href="#" onClick={() => handlePropertyOverview(property)} className="glass-card flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img className="object-cover w-full rounded-t-lg h-36 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={property.images[0].image} alt=""></img>
                                <div className="flex flex-col justify-between pl-4 pr-4 pb-4 pt-2 leading-normal">
                                    <Row>
                                        <Col className='bg-home-blue m-0 p-0'>
                                            <p className="border font-normal text-white dark:text-gray-400" style={{ textTransform: 'uppercase'}} >{property.property_type}</p>
                                        </Col>
                                        <Col className='m-0 p-0'>
                                            {property.transaction_type === 'Sale' && <p className="border font-normal bg-green-700 text-black dark:text-gray-400" style={{ textTransform: 'uppercase'}} >{property.transaction_type}</p>}
                                            {property.transaction_type === 'Rent' && <p className="border font-normal bg-red-700 text-black dark:text-gray-400" style={{ textTransform: 'uppercase'}} >{property.transaction_type}</p>}
                                            {property.transaction_type === 'Lease' && <p className="border font-normal bg-yellow-700 text-black dark:text-gray-400" style={{ textTransform: 'uppercase'}} >{property.transaction_type}</p>}
                                        </Col>
                                    </Row>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{property.property_name}</h5>
                                    <h5 className="mb-3 text-lg font-bold tracking-tight text-gray-900 dark:text-black">₹ {property.price}</h5>
                                    {property.property_type === 'house' || property.property_type === 'complex' && (
                                        <div>
                                            {property.bedroom && <p className="mb-3 font-normal text-black dark:text-gray-400">Bed: {property.bedroom}</p>}
                                            {property.bathroom && <p className="mb-3 font-normal text-black dark:text-gray-400">Bath: {property.bathroom}</p>}
                                        </div>
                                    )}
                                    Address: {(
                                        <p className="mb-3 font-normal text-black dark:text-gray-400">{property.address}, {property.locality.unit}, {property.locality.district}, {property.locality.state}, {property.locality.pincode}</p>
                                    )}
                                </div>
                            </a>
                            </Col>
                        ))}
                        </Row>
                    </div>: (
                    <div className='p-5'>
                        <h4 className='w-100' style={{fontSize: '1.5vw'}}><b>!</b> You don't have any favourite property</h4>
                        <div className='d-flex justify-center mt-3'>
                        <div onClick={() => history.push('/')} className="w-25 p-4 cursor-pointer text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400" role="alert">
                            <div className="flex items-center justify-between h-2">
                                <span className="sr-only">Social accounts</span>
                                <h3 className="font-medium">Browse Property</h3>
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

export default UserFavourites