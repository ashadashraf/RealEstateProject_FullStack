import React from 'react'
import SellOptionsCard from './SellOptionsCard'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress } from '../../../Redux/sellPropertyDetails/propertyAddressSlice';

const UserPropertySellMid = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const transactionType = useSelector(state => state.showPropertyAddress.transactionType)
    const address = useSelector(state => state.showPropertyAddress.address)
    const unit = useSelector(state => state.showPropertyAddress.unit);
    const city = useSelector(state => state.showPropertyAddress.city);
    const state = useSelector(state => state.showPropertyAddress.state);
    const pincode = useSelector(state => state.showPropertyAddress.pincode);

    const handleCardClick = (selectedType) => {
        dispatch(addAddress({transactionType: selectedType}))
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            console.log(transactionType, address, unit, city, state, pincode);
        }
        if (transactionType && address && unit && city && state && pincode) {
            setValidated(true);
            history.push('/markproperty')
        }
    };
    
    return (
        <div className='user-property-sell-mid'>
            <h3 className='explore-head'>Explore your options</h3>
            <div className="row p-3">
                <div className="col" onClick={() => handleCardClick('Sale')} ><SellOptionsCard method={'SELL'} /></div>
                <div className="col" onClick={() => handleCardClick('Rent')} ><SellOptionsCard method={'RENT'} /></div>
                <div className="col" onClick={() => handleCardClick('Lease')} ><SellOptionsCard method={'LEASE'} /></div>
            </div>
            <Form className='pt-5 pl-5 pr-5 pb-2' onSubmit={handleSubmit} style={{backgroundColor: '#D9D9D9', margin:'100px', borderRadius:'20px'}} noValidate validated={validated} >
                <Row>
                    <Form.Group as={Col} md="3" controlId="validationCustom01" className='m-1'>
                        <Form.Control
                            value={address}
                            onChange={(e) => dispatch(addAddress({address: e.target.value}))}
                            required
                            type="text"
                            placeholder="Street Address"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please choose an address.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationCustom02" className='m-1'>
                        <Form.Control
                            required
                            value={unit}
                            onChange={(e) => dispatch(addAddress({unit: e.target.value}))}
                            type="text"
                            placeholder="Unit"
                        />
                        <Form.Control.Feedback type="invalid">Please choose an unit.</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationCustomUsername" className='m-1'>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            value={city}
                            onChange={(e) => dispatch(addAddress({city: e.target.value}))}
                            placeholder="City"
                            aria-describedby="inputGroupPrepend"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                        Please choose a city.
                        </Form.Control.Feedback>
                    </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationCustom03" className='m-1'>
                        <Form.Control 
                            type="text" 
                            placeholder="State" 
                            required 
                            value={state} 
                            onChange={(e) => dispatch(addAddress({state: e.target.value}))}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid state.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationCustom04" className='m-1'>
                        <Form.Control 
                            type="text" 
                            value={pincode}
                            onChange={(e) => dispatch(addAddress({pincode: e.target.value}))}
                            placeholder="PinCode" 
                            required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid pincode.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit" className='m-3 continue-button'>Continue</Button>
            </Form>
        </div>
    )
}

export default UserPropertySellMid