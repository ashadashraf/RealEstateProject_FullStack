import './UserDisplayProperty.css';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Accordion from 'react-bootstrap/Accordion';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Mapbox from '../Mapbox/Mapbox';

const UserDisplayPropertyBottom = () => {
  const property = useSelector(state => state.showPropertyDetail.showPropertyDetail[0])
  console.log(property)
  const details = ['appliances', 'architectural_style', 'basement', 'building_amenities', 'exterior', 'floor_covering', 'indoor_features', 'outdoor_amenities', 'parking', 'roof', 'rooms', 'view']

  const renderDetail = (detail) => {
    if (property[detail] && typeof property[detail] === 'object') {
      return (
        <div key={detail}>
          <h4 className='pt-3'>
            <b>{detail.replace(/_/g, ' ')}</b>:
          </h4>
          <ol>
            <Row>
              {Object.entries(property[detail]).map(([key, value]) => (
                <Col sm={4} key={key}>
                  {value === true && <li>{key.replace(/_/g, ' ')}</li>}
                  {value !== true && value !== false && <li>{`${key.replace(/_/g, ' ')}: ${value}`}</li>}
                </Col>
              ))}
            </Row>
          </ol>
        </div>
      );
    }
    return null;
  };

  const renderProperty = () => {
    return (
      <div>
        {details.map((detail) => renderDetail(detail))}
      </div>
    );
  };
  
  const tooltips = [
    {
      id: 'openHouse',
      title: 'Open House',
      content: (
        <Popover id="popover-basic" style={{maxWidth: '60vw'}} className='popover-container'>
          <Popover.Header as="h3"><b>Open House</b></Popover.Header>
          <Popover.Body className='popover-body'>
            <h2><b>Request a private showing</b></h2>
            <div className="row">
              <div className="col">
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control size='sm' type="text" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control size='sm' type="email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control size='sm' type="text" />
                  </Form.Group>
                  <Button className='bg-black text-white' type='submit'>Email</Button>
                </Form>
              </div>
              <div className="col">
                <Image src={property.images[0].image} />
                <div className='d-flex justify-center align-middle p-2'>
                  <Button size='sm' variant="primary" className='text-whit bg-primary'>Message</Button>
                </div>
              </div>
            </div>
          </Popover.Body>
        </Popover>
      ),
    },
    {
      id: 'propertyDetail',
      title: 'Property Details',
      content: (
        <Popover id="popover-basic" style={{maxWidth: '50vw'}} className='popover-container'>
          <Popover.Header as="h3" style={{fontSize: 'medium'}} className='pt-2 pb-2'><b>Property Details</b></Popover.Header>
          <Popover.Body className='popover-body'>
            <Row>
              <h4><b>{property.property_name}</b></h4>
            </Row>
            <Row>
              <p>{property.more_description}</p>
            </Row>
            <Row>
              <p className='pt-3'>Remodal Year: {property.remodal_year}</p>
            </Row>
            <Row className='d-flex'>
              <Col className='mt-4' sm={4}>
                <span className="bg-blue-100 text-blue-800 text-sm font-small me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"><b>Total Area:</b> {property.lot_size} sqft</span>
              </Col>
              <Col className='mt-4' sm={4}>
                <span className="bg-gray-100 text-gray-800 text-sm font-small me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"><b>Basement Area:</b> {property.basement_square_feet} sqft</span>
              </Col>
              <Col className='mt-4' sm={4}>
                <span className="bg-green-100 text-green-800 text-sm font-small me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"><b>Garage Area:</b> {property.garage_square_feet} sqft</span>
              </Col>
              <Col className='mt-4' sm={4}>
                <span className="bg-red-100 text-red-800 text-sm font-small me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"><b>Finished Area:</b> {property.finished_square_feet} sqft</span>
              </Col>
            </Row>
            <div className="row mt-3">
              <h4 style={{fontSize: 'medium'}} className='pt-3'><b>Property Features</b></h4>
              <br />
              {renderProperty(property)}
            </div>
          </Popover.Body>
        </Popover>
      ),
    },
    {
      id: 'monthlyPayment',
      title: 'Monthly Payment',
      content: (
        <Popover id="popover-basic" style={{maxWidth: '50vw'}} className='popover-container'>
          <Popover.Header as="h3" style={{fontSize: 'medium'}} className='pt-2 pb-2'><b>Costs for this home</b></Popover.Header>
          <Popover.Body className='popover-body'>
            <h4><b>Home Price: ${property.price}</b></h4>
            <h4>Estimated Monthly Payment: ${(((property.price - property.accounts.down_payment) * (property.accounts.interest_rate / 100)) + ((property.price - property.accounts.down_payment * (property.accounts.tax_rate / 100)) / 12)).toFixed(3)}</h4>
            <Accordion defaultActiveKey={['0']} alwaysOpen className='mt-4'>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Principal & Interest</Accordion.Header>
                <Accordion.Body  className='bg-blue-400'>
                  <div class="grid gap-4 mb-4 sm:grid-cols-2">
                      <div>
                          <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{textTransform: 'capitalize'}}>{property.property_type} Price</label>
                          <input type="text" name="username" id="username" value={property.price} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username.example" required="" />
                      </div>
                      <div>
                          <label hidden for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input hidden type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                      </div>
                      <div>
                          <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Down Payment</label>
                          <input type="text" name="username" id="username" value={property.accounts.down_payment ? property.accounts.down_payment : 0} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>                        <div>
                          <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">%</label>
                          <input type="text" name="username" id="username" value={property.accounts.down_payment / property.price} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username.example" />
                      </div>
                      <div>
                          <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loan Program</label>
                          <input type="text" name="username" id="username" value={property.accounts.loan_years ? property.accounts.loan_years : 0} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>                        <div>
                          <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Interest Rate (%)</label>
                          <input type="text" name="username" id="username" value={property.accounts.interest_rate ? property.accounts.interest_rate : 0} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username.example" />
                      </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Property Taxes</Accordion.Header>
                <Accordion.Body className='bg-red-400'>
                  <p style={{fontSize: 'smaller'}}>This estimate is based on the home value, property type, and an estimated local tax rate. Actual rate or taxes assessed may vary.</p>
                <div class="grid gap-4 mb-4 sm:grid-cols-3">
                  <div>
                      <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Home Price</label>
                      <input type="text" name="username" id="username" value={property.price} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username.example" required="" />
                  </div>
                  <div>
                      <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{textTransform: 'capitalize'}}>Tax Rate (%)</label>
                      <input type="text" name="username" id="username" value={property.accounts.tax_rate ? property.accounts.tax_rate : 0} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username.example" required="" />
                  </div>
                  <div>
                      <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{textTransform: 'capitalize'}}>Tax Price</label>
                      <input type="text" name="username" id="username" value={property.price * (property.accounts.tax_rate?(property.accounts.tax_rate / 100):0)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username.example" required="" />
                  </div>
                </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Popover.Body>
        </Popover>
      ),
    },
    {
      id: 'neighborhood',
      title: 'Neighborhood',
      content: (
        <Popover id="popover-basic" style={{maxWidth: '60vw'}} className='popover-container'>
          <Popover.Header as="h3"><b>Explore schools, safety, and lifestyle around {property.address}</b></Popover.Header>
          <Popover.Body className='popover-body'>
            <Mapbox />
          </Popover.Body>
        </Popover>
      ),
    },
  ];

  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleTooltipClick = (tooltipId) => {
    setActiveTooltip((prevTooltip) => (prevTooltip === tooltipId ? null : tooltipId));
  };

  return (
    <div className='box m-5'>
      {tooltips.map(({ id, title, content }) => (
        <div key={id} className="d-flex justify-start mt-2 mb-2">
          <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={content}
            show={activeTooltip === id}
            onToggle={() => handleTooltipClick(id)}
          >
            <Button variant="dark" className='detail-button w-25'>
              <b>{title}</b>
            </Button>
          </OverlayTrigger>
        </div>
      ))}
    </div>
  );
};

export default UserDisplayPropertyBottom;