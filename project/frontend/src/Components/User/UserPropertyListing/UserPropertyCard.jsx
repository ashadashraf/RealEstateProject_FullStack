import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addPropertyDetail } from '../../../Redux/userProperty/propertyDetailSlice';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserMessages from '../UserMessages/UserMessages';
import { constructApiUrl } from '../../../Services/ApiUtils';

const UserPropertyCard = () => {
    const properties = useSelector(state => state.showPropertiesList.showPropertiesList);
    console.log(properties);
    const dispatch = useDispatch();
    const history = useHistory();
    const handlePropertyOverview = async (id) => {
        try {
            const apiEndpoint = 'api/property/details/';
            const response = await axios.get(constructApiUrl(apiEndpoint), {
                params: {
                    'property_id' : id
                },
            });
            if (response.status === 200) {
                console.log('success');
                console.log(response.data);
                dispatch(addPropertyDetail({
                    showPropertyDetail: response.data
                }));
                history.push('/userpropertydetail')
            } else {
                console.log('failed');
                console.log(response.data);
                const errorText = await response.text();
                console.log('Error Details:', errorText);
                console.log('Status', response.status);
                console.log('Response', response);
            }
        } catch(error) {
          console.log('failed to sent the request', error.response);
        }
    }
    return (
        <React.Fragment>
            <Row>
            {properties.map((property) => (
                <Col key={property.id} xs={12} sm={6} className='p-1 m-0'>
                    <Card className='mb-3 cursor-pointer' onClick={() => handlePropertyOverview(property.id)} style={{ width: '100%' }}>
                        {property.images[0] && <Card.Img variant="top" style={{height: '15vw'}} src={property.images[0].image} />}
                        <Card.Body>
                            <Row className='d-flex justify-between'>
                                <Col>
                                    <Card.Title>${property.price}</Card.Title>
                                </Col>
                                <Col>
                                    <Card.Text>{property.property_type}</Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text className='bg-success'>{property.transaction_type}</Card.Text>
                                </Col>
                                <Col className='d-flex justify-end'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                </svg>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col sm={8} className='d-flex inline-flex justify-around'>
                                    <Card.Text>{property.bedroom} bed</Card.Text>
                                    <Card.Text>{property.bathroom} bath</Card.Text>
                                </Col>
                                <Col sm={4}>
                                    <Card.Text className='text-left'>{property.basement_square_feet} sqft</Card.Text>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={8}>
                                <Card.Text className='text-left'>
                                    {property.address}, {property.locality.unit}, {property.locality.district}, {property.locality.state}.
                                </Card.Text>
                                </Col>
                                <Col sm={4}>
                                    <Card.Text className='text-left'>{property.lot_size} sqft lot</Card.Text>
                                </Col>
                            </Row>
                            {/* <div className="text-center cursor-pointer z-10">
                                <div className='d-flex justify-end mt-2'>
                                    <Button size='sm' className='text-white bg-blue-950 hover:bg-blue-900 hover:translate-y-[-2px] transition-transform' data-drawer-target="drawer-right-card-list" data-drawer-show="drawer-right-card-list" data-drawer-placement="right" aria-controls="drawer-right-card-list">Message</Button>
                                </div>
                            </div>

                            <div id="drawer-right-card-list" className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-50 md:w-75 dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-right-label">
                                <button type="button" data-drawer-hide="drawer-right-card-list" aria-controls="drawer-right-card-list" className="pb-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close menu</span>
                                </button>
                                <UserMessages />
                            </div> */}

                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </React.Fragment>
    )
}

export default UserPropertyCard