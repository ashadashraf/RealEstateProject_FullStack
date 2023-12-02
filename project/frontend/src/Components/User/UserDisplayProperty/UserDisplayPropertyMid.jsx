import React, { useEffect, useState } from 'react'
import './UserDisplayProperty.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import bedLogo from '../../../images/bed-logo.png';
import bathLogo from '../../../images/bath-logo.png';
import lotLogo from '../../../images/lot-logo.png';
import basementLogo from '../../../images/basement-sqft-logo.png';
import propertyTypeLogo from '../../../images/property-type-logo.png';
import dateLogo from '../../../images/date-logo.png';
import parkingLogo from '../../../images/parking-logo.png';
import axios from 'axios';
import UserMessages from '../UserMessages/UserMessages';

const UserDisplayPropertyMid = () => {
  const property = useSelector(state => state.showPropertyDetail.showPropertyDetail[0]);
  const [transactionTypeColor, setTransactionTypeColor] = useState('#FFFFFF');
  const currentDate = new Date();
  const postedOnDate = new Date(property.posted_on);
  const timeDifference = currentDate - postedOnDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
  const [favourites, setFavourites] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const currentUser = useSelector(state => state.showIsLoggedin.userId);

  useEffect(() => {
    if (property.transaction_type === 'Sale') {
      setTransactionTypeColor('#099317');
    } else if (property.transaction_type === 'Rent') {
      setTransactionTypeColor('#CA2B15');
    } else if (property.transaction_type === 'Lease') {
      setTransactionTypeColor('#BA8214');
    }
    if (favourites && property.id) {
      setIsLiked(!favourites.includes(property.id));
    }
  }, [favourites]);

  const handlePropertyLike = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.put('http://127.0.0.1:8000/api/property/favourite/',
      {property_id: property.id},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setFavourites(response.data.favourites);
        console.log(favourites, 2);
      }
      console.log(response.status);
      console.log(response.data);
    } catch(error) {
      console.log(error.response.data);
    }
  }
  return (
    <React.Fragment>
      <Row className='w-100'>
        <Row>
          <Col xl={8}>
            <p className='transaction-type d-flex justify-start' style={{color: transactionTypeColor}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-fill m-0.5" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6"/>
              </svg>
              For {property.transaction_type}
            </p>
            <h2 className='price-text display-6 text-white d-flex justify-start'>$ {property.price}</h2>
            <p className='address-text text-white d-flex justify-start'>{property.address}, {property.locality.unit}, {property.locality.district}, {property.locality.state}, {property.locality.pincode}</p>
          </Col>
          <Col xl={4}>
            <Row className='pt-3'>
              <Col className='d-flex justify-end cursor-pointer' onClick={handlePropertyLike}>
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill={isLiked ? 'red' : 'white'} className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
              </svg>
              </Col>
              <Col className='d-flex justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-share-fill" viewBox="0 0 16 16">
                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
              </svg>
              </Col>
              <Col className='d-flex justify-start'>
              {/* <Button size='sm' variant="primary" className='text-whit bg-primary'>Message</Button> */}
              <div className="text-center">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                Message
                </button>
              </div>
              <div id="drawer-right-example" className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-black w-50 md:w-75 dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-right-label">
                <button type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" className="pb-3 text-gray-400 bg-transparent hover:bg-black hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <UserMessages propertyId={property.id} propertyUser={property.user_id} currentUser={currentUser} />
              </div>

              </Col>
            </Row>
            <Row className='pt-3 text-blue-200'>
              <Col className='d-flex justify-end'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
              </svg>
              </Col>
              <Col className='d-flex justify-start'>
              <a href={`https://${property.related_website}`}>{property.related_website}</a>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='p-2'>
          {property.bedroom && (
          <Col xl={3} xs={6} className='p-3'>
            <Row>
              <Col className='d-flex justify-end'>
              <Image src={bedLogo} className='h-5 w-5' />
              </Col>
              <Col className='d-flex justify-start'>
              <p className='text-white'>{property.bedroom} Bed</p>
              </Col>
            </Row>
          </Col>
          )}
          {property.bathroom && (
          <Col xl={3} xs={6} className='p-3'>
            <Row>
              <Col className='d-flex justify-end'>
              <Image src={bathLogo} className='h-5 w-5' />
              </Col>
              <Col className='d-flex justify-start'>
              <p className='text-white'>{property.bathroom} Bath</p>
              </Col>
            </Row>
          </Col>
          )}
          {property.lot_size && (
          <Col xl={3} xs={6} className='p-3'>
            <Row>
              <Col className='d-flex justify-end'>
              <Image src={lotLogo} className='h-5 w-5' />
              </Col>
              <Col className='d-flex justify-start'>
              <p className='text-white'>{property.lot_size} sqft Lot</p>
              </Col>
            </Row>
          </Col>
          )}
          {property.basement_square_feet && (
          <Col xl={3} xs={6} className='p-3'>
            <Row>
              <Col className='d-flex justify-end'>
              <Image src={basementLogo} className='h-5 w-5' />
              </Col>
              <Col className='d-flex justify-start'>
              <p className='text-white'>{property?.basement_square_feet} Basement sqft</p>
              </Col>
            </Row>
          </Col>
          )}
          {property && (
          <Col xl={3} xs={6} className='p-3'>
            <Row>
              <Col className='d-flex justify-end'>
              <Image src={propertyTypeLogo} className='h-5 w-5' />
              </Col>
              <Col className='d-flex justify-start'>
                <div>
                  <p className='text-white' style={{textAlign: 'left'}}>{property.property_type.toUpperCase()}</p>
                  <p className='text-white opacity-75' style={{fontSize:'smaller', textAlign: 'left'}}>Property type</p>
                </div>
              </Col>
            </Row>
          </Col>
          )}
          {daysDifference && (
          <Col xl={3} xs={6} className='p-3'>
            <Row>
              <Col className='d-flex justify-end'>
              <Image src={dateLogo} className='h-5 w-5' />
              </Col>
              <Col className='d-flex justify-start'>
                <div>
                  <p className='text-white' style={{textAlign: 'left'}}>{daysDifference} days ago</p>
                  <p className='text-white opacity-75' style={{fontSize:'smaller', textAlign: 'left'}}>Time on Rykerz.com</p>
                </div>
              </Col>
            </Row>
          </Col>
          )}
          {property.parking.parking_spaces && (
          <Col xl={3} xs={6} className='p-3'>
            <Row>
              <Col className='d-flex justify-end'>
              <Image src={parkingLogo} className='h-5 w-5' />
              </Col>
                <Col className='d-flex justify-start'>
                  <div>
                    <p className='text-white' style={{textAlign: 'left'}}>{property.parking.parking_spaces} Cars</p>
                    <p className='text-white opacity-75' style={{fontSize:'smaller', textAlign: 'left'}}>Garage</p>
                  </div>
                </Col>
            </Row>
          </Col>
          )}
          {property.year_build && (
          <Col xl={3} xs={6} className='p-3'>
            <Row>
              <Col className='d-flex justify-end'>
              <Image src={dateLogo} className='h-5 w-5' />
              </Col>
              <Col className='d-flex justify-start'>
                <div>
                  <p className='text-white' style={{textAlign: 'left'}}>{property.year_build}</p>
                  <p className='text-white opacity-75' style={{fontSize:'smaller', textAlign: 'left'}}>Year build</p>
                </div>
              </Col>
            </Row>
          </Col>
          )}
        </Row>
        <Row className='ml-3 pt-3 pl-3 pr-3 pb-3 text-left text-white bg-blue-950'>
          <p>Description: {property.description}</p>
        </Row>
      </Row>
    </React.Fragment>
  )
}

export default UserDisplayPropertyMid