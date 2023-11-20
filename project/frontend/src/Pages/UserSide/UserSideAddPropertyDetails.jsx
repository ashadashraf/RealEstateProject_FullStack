import React, { useState, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import UserHeader from '../../Components/User/UserHeader/UserHeader'
import UserPropertySell from '../../Components/User/UserPropertySell/UserPropertySell'
import UserFooter from '../../Components/User/UserFooter/UserFooter'
import { useSelector } from 'react-redux'
import './UserPostPropertyDetails.css';
import UserPostHouseDetails from '../../Components/User/UserPropertySell/UserPropertyTypes/UserPostHouseDetails';
import { useHistory } from 'react-router-dom';
import UserPostComplexDetails from '../../Components/User/UserPropertySell/UserPropertyTypes/UserPostComplexDetails'

const UserSideAddPropertyDetails = () => {
    const transactionType = useSelector(state => state.showPropertyAddress.transactionType);
    const coordinates = useSelector(state => state.showPropertyAddress.coordinates);
    const [showHouseProperty, setShowHouseProperty] = useState(true);
    const [showComplexProperty, setShowComplexProperty] = useState(true);
    const [showApartmentProperty, setShowApartmentProperty] = useState(true);
    const [showLandProperty, setShowLandProperty] = useState(true);
    const history =useHistory();
    useEffect(() => {
        if (!transactionType) {
            history.push('/sellproperty')
        }
        handleShowHouseProperty()
    }, []);

    function handleShowHouseProperty() {
        setShowHouseProperty(true);
        setShowComplexProperty(false);
        setShowApartmentProperty(false);
        setShowLandProperty(false);
    }
    function handleShowApartmentProperty() {
        setShowHouseProperty(false);
        setShowComplexProperty(false);
        setShowApartmentProperty(true);
        setShowLandProperty(false);
    }
    function handleShowComplexProperty() {
        setShowHouseProperty(false);
        setShowComplexProperty(true);
        setShowApartmentProperty(false);
        setShowLandProperty(false);
    }
    function handleShowLandProperty() {
        setShowHouseProperty(false);
        setShowComplexProperty(false);
        setShowApartmentProperty(false);
        setShowLandProperty(true);
    }

    return (
        <React.Fragment>
            <UserHeader />
            <UserPropertySell />
            <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link className='text-lg add-property' eventKey="link-0" onClick={handleShowHouseProperty}>{transactionType.toUpperCase()} YOUR HOUSE</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='text-lg add-property' eventKey="link-1" onClick={handleShowApartmentProperty}>{transactionType.toUpperCase()} YOUR APARTMENT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='text-lg add-property' eventKey="link-2" onClick={handleShowComplexProperty}>{transactionType.toUpperCase()} YOUR COMPLEX</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='text-lg add-property' eventKey="link-3" onClick={handleShowLandProperty}>{transactionType.toUpperCase()} YOUR LAND</Nav.Link>
                </Nav.Item>
            </Nav>
            <div className='m-5'>
                {showHouseProperty && <UserPostHouseDetails />}
                {showComplexProperty && <UserPostComplexDetails />}
            </div>
            <UserFooter />
        </React.Fragment>
    )
}

export default UserSideAddPropertyDetails