import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { constructApiUrl } from '../../../../Services/ApiUtils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { updatePropertiesList } from '../../../../Redux/userProperty/propertiesListSlice';

const UserEditHouseDetails = () => {
  const [validated, setValidated] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
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
        case "success":
          toast.success(message, {
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
  const property = useSelector(state => state.showPropertyDetail.propertyDetail);
  console.log(property);
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const formDataObject = new FormData();

    const handleNestedObjects = (obj, parentKey = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const currentKey = parentKey ? `${parentKey}.${key}` : key;
    
        if (typeof value === 'object' && !Array.isArray(value)) {
          // Recursively handle nested objects
          handleNestedObjects(value, currentKey);
        } else {
          formDataObject.append(currentKey, value);
        }
      }
    };
    
    handleNestedObjects(formData);

    for (var pair of formDataObject.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    const token = localStorage.getItem('accessToken');
    
    try {
      console.log(formDataObject);
      const apiEndpoint = 'api/property/update/';
      const response = await fetch(constructApiUrl(apiEndpoint), {
        method: 'PUT',
        body: formDataObject,
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.ok) {
        console.log('PropertyUpdated');
        const data = await response.json();
        console.log(data)
        showToastMessage("Property updated successfully.", "success");
        dispatch(updatePropertiesList({ updatedProperty: data }));
        history.push('/usermyproperty');
      } else {
        console.log('Failed to update property');
        const errorText = await response.text();
        console.log('Error Details:', errorText);
        console.log('status', response.status);
        console.log(response);
        if (response.statusText === "Unauthorized") {
          showToastMessage("Failed to update property. You need to log in first", "error");
        }      
        // console.log(formData);
      }
    } catch (error) {
      console.error("Error in senting request", error);
    }
    setValidated(true);
  };

  const appliances = ['dishwasher', 'oven', 'dry', 'refrigerator', 'freezer', 'trash_compator', 'garbage_disposal', 'washer', 'micro_wave'];
  const basement = ['finished', 'unfinished', 'partially_finished', 'none'];
  const floorCovering = ['carpet', 'slate', 'concrete', 'softwood', 'hardwood', 'tile', 'laminate', 'other_floor_covering', 'linoleum'];
  const rooms = ['breakfast_nook', 'office', 'dining_room', 'pantry', 'family_room', 'recreation_room', 'laundry_room', 'workshop', 'library', 'master_room'];
  const indoorFeatures = ['security_system', 'cable', 'ceiling_fans', 'fire_place', 'wired'];
  const propertyAccounts = ['down_payment', 'loan_years', 'interest_rate', 'tax_rate'];
  const buildingAmenities = ['gated_entry', 'near_transportation', 'controlled_access', 'storage', 'elevator'];
  const architecturalStyle = ['bungalow', 'modern', 'villa', 'loft'];
  const exterior = ['brick', 'stucco', 'cement', 'vinyl', 'wood', 'metal', 'stone', 'other_exterior'];
  const outdoorAmenities = ['balcony', 'barbecue_area', 'pond', 'pool', 'porch', 'rv_parking', 'water_front', 'spa', 'sprinkler_system'];
  const parking = ['carport', 'off_street', 'garage_attached', 'on_street', 'garage_detached', 'parking_none'];
  const roof = ['asphalt', 'concrete_roof', 'build_up', 'slate_roof', 'composition', 'tile_roof', 'metal_roof', 'other_roof'];
  const view = ['city', 'territorial', 'mountain', 'water', 'park', 'view_none'];

  const userId = useSelector(state => state.showIsLoggedin.userId);
  const ownerId = userId;
  const [formData, setFormData] = useState({
    property_id: property.id,
    user_id: ownerId,
    phone_number: property.phone_number,
    email: property.email,
    transaction_type: property.transaction_type,
    property_name: property.property_name,
    property_type: property.property_type,
    address: property.address,
    locality: {
      pincode: property.locality.pincode,
      unit: property.locality.unit,
      district: property.locality.district,
      state: property.locality.state,
    },
    coordinates: {
      latitude: property.coordinates.latitude,
      longitude: property.coordinates.longitude,
    },
    price: property.price,
    virtual_tour_url: property.virtual_tour_url,
    basement_square_feet: property.basement_square_feet,
    garage_square_feet: property.garage_square_feet,
    description: property.description,
    bedroom: property.bedroom,
    bathroom: property.bathroom,
    finished_square_feet: property.finished_square_feet,
    lot_size: property.lot_size,
    year_build: property.year_build,
    remodal_year: property.remodal_year,
    open_house: {
      date: property.open_house.date,
      start_time: property.open_house.start_time,
      end_time: property.open_house.end_time,
    },
    related_website: property.related_website,
    more_description: property.more_description,
    appliances: {
      dishwasher: property.appliances.dishwasher,
      oven: property.appliances.oven,
      dry: property.appliances.dry,
      refrigerator: property.appliances.refrigerator,
      freezer: property.appliances.freezer,
      trash_compator: property.appliances.trash_compator,
      garbage_disposal: property.appliances.garbage_disposal,
      washer: property.appliances.washer,
      micro_wave: property.appliances.micro_wave,
    },
    basement: {
      finished: property.basement.finished,
      unfinished: property.basement.unfinished,
      partially_finished: property.basement.partially_finished,
    },
    floor_covering: {
      carpet: property.floor_covering.carpet,
      slate: property.floor_covering.slate,
      concrete: property.floor_covering.concrete,
      softwood: property.floor_covering.softwood,
      hardwood: property.floor_covering.hardwood,
      tile: property.floor_covering.tile,
      laminate: property.floor_covering.laminate,
      other_floor_covering: property.floor_covering.other_floor_covering,
      linoleum: property.floor_covering.linoleum,
    },
    rooms: {
      breakfast_nook: property.rooms.breakfast_nook,
      office: property.rooms.office,
      dining_room: property.rooms.dining_room,
      pantry: property.rooms.pantry,
      family_room: property.rooms.family_room,
      recreation_room: property.rooms.recreation_room,
      laundry_room: property.rooms.laundry_room,
      workshop: property.rooms.workshop,
      library: property.rooms.library,
      master_room: property.rooms.master_room,
      total_rooms: property.rooms.total_rooms,
    },
    indoor_features: {
      security_system: property.indoor_features.security_system,
      cable: property.indoor_features.cable,
      ceiling_fans: property.indoor_features.ceiling_fans,
      fire_place: property.indoor_features.fire_place,
      wired: property.indoor_features.wired,
    },
    accounts: {
      down_payment: property.accounts.down_payment,
      loan_years: property.accounts.loan_years,
      interest_rate: property.accounts.interest_rate,
      tax_rate: property.accounts.tax_rate,
    },
    building_amenities: {
      gated_entry: property.building_amenities.gated_entry,
      near_transportation: property.building_amenities.near_transportation,
      controlled_access: property.building_amenities.controlled_access,
      storage: property.building_amenities.storage,
      elevator: property.building_amenities.elevator,
    },
    architectural_style: {
      bungalow: property.architectural_style.bungalow,
      modern: property.architectural_style.modern,
      villa: property.architectural_style.villa,
      loft: property.architectural_style.loft,
    },
    exterior: {
      brick: property.exterior.brick,
      stucco: property.exterior.stucco,
      cement: property.exterior.cement,
      vinyl: property.exterior.vinyl,
      wood: property.exterior.wood,
      metal: property.exterior.metal,
      stone: property.exterior.stone,
      other_exterior: property.exterior.other_exterior,
    },
    outdoor_amenities: {
      balcony: property.outdoor_amenities.balcony,
      barbecue_area: property.outdoor_amenities.barbecue_area,
      pond: property.outdoor_amenities.pond,
      pool: property.outdoor_amenities.pool,
      porch: property.outdoor_amenities.porch,
      rv_parking: property.outdoor_amenities.rv_parking,
      water_front: property.outdoor_amenities.water_front,
      spa: property.outdoor_amenities.spa,
      sprinkler_system: property.outdoor_amenities.sprinkler_system,
    },
    parking: {
      carport: property.parking.carport,
      off_street: property.parking.off_street,
      garage_attached: property.parking.garage_attached,
      on_street: property.parking.on_street,
      garage_detached: property.parking.garage_detached,
      parking_spaces: property.parking.parking_spaces,
    },
    roof: {
      asphalt: property.roof.asphalt,
      concrete: property.roof.concrete,
      build_up: property.roof.build_up,
      slate: property.roof.slate,
      composition: property.roof.composition,
      tile: property.roof.tile,
      metal: property.roof.metal,
    },
    view: {
      city: property.view.city,
      territorial: property.view.territorial,
      mountain: property.view.mountain,
      water: property.view.water,
      park: property.view.park,
    },
  });
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = {...formData};
    const nameParts = name.split('.');

    if (nameParts.length === 2) {
      const [nestedObjectName, nestedFieldName] = nameParts;
      updatedFormData[nestedObjectName][nestedFieldName] = value;
    } else {
      updatedFormData[name] = value;
    }
    
    setFormData(updatedFormData);
    console.log(formData);
  };

  return (
    <Form className='p-5 bg-zinc-500' encType='multipart/form-data' validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
      <Form.Group as={Col} md="4" sm="6" className='pb-3' controlId="validationCustom01">
          <Form.Label>Property Name</Form.Label>
          <Form.Control
            required
            type="text"
            disabled
            placeholder="Enter your property name"
            name='property_name'
            value={formData.property_name}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" sm="6" className='pb-3' controlId="validationCustom01">
          <Form.Label>Set your price (₹)</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your price"
            name='price'
            value={formData.price}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" sm="6" className='pb-3' controlId="validationCustom02">
          <Form.Label>Virtual tour URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="www.yoururl.com"
            name='virtual_tour_url'
            value={formData.virtual_tour_url}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" className='pb-3' controlId="validationCustom03">
            <Form.Label>Transaction Type</Form.Label>
            <div className='row d-flex justify-center'>
              <div className="col-3 m-1 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                  <input defaultChecked={'Rent'===formData.transaction_type} id="rent" type="radio" value="Rent" onChange={handleInputChange} name="transaction_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="rent" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rent</label>
              </div>
              <div className="col-3 m-1 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                  <input defaultChecked={'Sale'===formData.transaction_type} id="sell" type="radio" value="Sale" onChange={handleInputChange} name="transaction_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="sell" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sell</label>
              </div>
              <div className="col-3 m-1 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                  <input defaultChecked={'Lease'===formData.transaction_type} id="lease" type="radio" value="Lease" onChange={handleInputChange} name="transaction_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="lease" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lease</label>
              </div>
            </div>
        </Form.Group>
      </Row>
      <Row className='mb-3 flex justify-around'>
        <h4 className='text-lg font-semibold pb-3'>Home Facts</h4>
        <Form.Group as={Col} md="3" sm="6" className='pb-3' controlId="validationCustom03">
          <Form.Label>Basement sq. ft.</Form.Label>
          <Form.Control type="text" placeholder="Enter basement square feet" required name='basement_square_feet' value={formData.basement_square_feet} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Enter basement square feet
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" className='pb-3' controlId="validationCustom03">
          <Form.Label>Garage sq. ft.</Form.Label>
          <Form.Control type="text" placeholder="Enter garage sqaure feet" name='garage_square_feet' value={formData.garage_square_feet} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom04">
          <Form.Label>Describe your home</Form.Label>
          <Form.Control as="textarea" placeholder="Describe your home" required name='description' value={formData.description} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please describe your home.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3 flex justify-around">
        <Form.Group as={Col} md="2" sm="6" className='pb-3' controlId="validationCustom05">
          <Form.Label>Bedroom</Form.Label>
          <Form.Control type='number' required name='bedroom' value={formData.bedroom} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" sm="6" className='pb-3' controlId="validationCustom05">
          <Form.Label>Bathroom</Form.Label>
          <Form.Control type='number' required name='bathroom' value={formData.bathroom} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" sm="6" className='pb-3' controlId="validationCustom05">
          <Form.Label>Finished sq. ft.</Form.Label>
          <Form.Control type='number' required name='finished_square_feet' value={formData.finished_square_feet} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" sm="6" className='pb-3' controlId="validationCustom05">
          <Form.Label>Lot sq. ft.</Form.Label>
          <Form.Control type='number' required name='lot_size' value={formData.lot_size} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3 flex justify-around'>
        <Form.Group as={Col} md="3" lg="3" sm="6" className='pb-3' controlId="validationCustom05">
          <Form.Label>Year build</Form.Label>
          <Form.Control type='date' required name='year_build' value={formData.year_build} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" lg="3" sm="6" className='pb-3' controlId="validationCustom05">
          <Form.Label>Structural remodal</Form.Label>
          <Form.Control type='date' required name='remodal_year' value={formData.remodal_year} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3 flex justify-around'>
        <h4 className='text-lg font-semibold pb-3'>Open House</h4>
        <Form.Group as={Col} md="4" sm="4" className='pb-3' controlId="validationCustom05">
          <Form.Label>Date</Form.Label>
          <Form.Control type='date' name='open_house.date' value={formData.open_house.date} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid date.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" sm="4" className='pb-3' controlId="validationCustom05">
          <Form.Label>Start Time</Form.Label>
          <Form.Control type='time' name='open_house.start_time' value={formData.open_house.start_time} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid start time.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" sm="4" className='pb-3' controlId="validationCustom05">
          <Form.Label>End Time</Form.Label>
          <Form.Control type='time' name='open_house.end_time' value={formData.open_house.end_time} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid end time.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3 flex justify-around'>
        <h4 className='text-lg font-semibold pb-3'>Additional Information</h4>
        <Form.Group as={Col} md="4" lg="3" className='pb-3' controlId="validationCustom05">
          <Form.Label>Related website</Form.Label>
          <Form.Control type='text' name='related_website' value={formData.related_website} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group as={Col} md="6" lg="5" className='pb-3' controlId="validationCustom05">
          <Form.Label>What i love about this Home</Form.Label>
          <Form.Control as="textarea" name='more_description' value={formData.more_description} onChange={handleInputChange} />
        </Form.Group>
      </Row>
      <Row className='mb-3 flex justify-around'>
        <Col sm={12} md={6} >
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>ROOM DETAILS</Accordion.Header>
              <Accordion.Body>
              <Form.Group as={Col} className='pb-3' controlId="validationCustom05">
                <Form.Label className='text-base'>APPLIANCES</Form.Label>
                <Form>
                  <div className="row">
                    {appliances.map((type) => (
                      <div key={`${type}`} className="mb-3 col-6 d-flex justify-start">
                        <Form.Check
                          type= 'checkbox'
                          id={`${type}`}
                          label={`${type}`}
                          checked={formData.appliances[type]}
                          onChange={(e) => {
                            const { id, checked } = e.target;
                            setFormData((prevData) => ({
                              ...prevData,
                              appliances: {
                                ...prevData.appliances,
                                [id]: checked,
                              },
                            }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </Form>
              </Form.Group>
              <Form.Group as={Col} className='pb-3' controlId="validationCustom05">
                <Form.Label className='text-base'>BASEMENT</Form.Label>
                <Form>
                  <div className="row">
                    {basement.map((type) => (
                      <div key={`${type}`} className="mb-3 col-6 d-flex justify-start">
                        <Form.Check
                          type= 'checkbox'
                          id={`${type}`}
                          label={`${type}`}
                          checked={formData.basement[type]}
                          onChange={(e) => {
                            const { id, checked } = e.target;
                            setFormData((prevData) => ({
                              ...prevData,
                              basement: {
                                ...prevData.basement,
                                [id]: checked,
                              },
                            }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </Form>
              </Form.Group>
              <Form.Group as={Col} className='pb-3' controlId="validationCustom05">
                <Form.Label className='text-base'>FLOOR COVERING</Form.Label>
                <Form>
                  <div className="row">
                    {floorCovering.map((type) => (
                      <div key={`${type}`} className="mb-3 col-6 d-flex justify-start">
                        <Form.Check
                          type= 'checkbox'
                          id={`${type}`}
                          label={`${type}`}
                          checked={formData.floor_covering[type]}
                          onChange={(e) => {
                            const { id, checked } = e.target;
                            setFormData((prevData) => ({
                              ...prevData,
                              floor_covering: {
                                ...prevData.floor_covering,
                                [id]: checked,
                              },
                            }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </Form>
              </Form.Group>
              <Form.Group as={Col} className='pb-3' controlId="validationCustom05">
                <Form.Label className='text-base'>ROOMS</Form.Label>
                <Form className='flex justify-center'>
                  <div className="row">
                    {rooms.map((type) => (
                      <div key={`${type}`} className="mb-3 col-6 d-flex justify-start">
                        <Form.Check
                          type= 'checkbox'
                          id={`${type}`}
                          label={`${type}`}
                          checked={formData.rooms[type]}
                          onChange={(e) => {
                            const { id, checked } = e.target;
                            setFormData((prevData) => ({
                              ...prevData,
                              rooms: {
                                ...prevData.rooms,
                                [id]: checked,
                              },
                            }));
                          }}
                        />
                      </div>
                    ))}
                    <Form.Group as={Col} md="6" lg="6" className='pb-3' controlId="validationCustom05">
                      <Form.Label>Total Rooms</Form.Label>
                      <Form.Control type='number' required name='rooms.total_rooms' value={formData.rooms.total_rooms} onChange={handleInputChange} />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid data.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Form>
              </Form.Group>
              <Form.Group as={Col} className='pb-3' controlId="validationCustom05">
                <Form.Label className='text-base'>INDOOR FEATURES</Form.Label>
                <Form>
                  <div className="row">
                    {indoorFeatures.map((type) => (
                      <div key={`${type}`} className="mb-3 col-6 d-flex justify-start">
                        <Form.Check
                          type= 'checkbox'
                          id={`${type}`}
                          label={`${type}`}
                          checked={formData.indoor_features[type]}
                          onChange={(e) => {
                            const { id, checked } = e.target;
                            setFormData((prevData) => ({
                              ...prevData,
                              indoor_features: {
                                ...prevData.indoor_features,
                                [id]: checked,
                              }
                            }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </Form>
              </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="0">
              <Accordion.Header>BUILDING DETAILS</Accordion.Header>
              <Accordion.Body>
                <Form.Group as={Col} className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>BUILDING AMENITIES</Form.Label>
                  <Form>
                    <div className="row">
                      {buildingAmenities.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6 d-flex justify-start">
                          <Form.Check
                            type= 'checkbox'
                            id={`${type}`}
                            label={`${type}`}
                            checked={formData.building_amenities[type]}
                            onChange={(e) => {
                              const { id, checked } = e.target;
                              setFormData((prevData) => ({
                                ...prevData,
                                building_amenities: {
                                  ...prevData.building_amenities,
                                  [id]: checked,
                                }
                              }));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </Form>
                </Form.Group>
                <Form.Group as={Col} className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>ARCHITECTURAL STYLE</Form.Label>
                  <Form>
                    <div className="row">
                      {architecturalStyle.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6 d-flex justify-start">
                          <Form.Check
                            type= 'checkbox'
                            id={`${type}`}
                            label={`${type}`}
                            checked={formData.architectural_style[type]}
                            onChange={(e) => {
                              const { id, checked } = e.target;
                              setFormData((prevData) => ({
                                ...prevData,
                                architectural_style: {
                                  ...prevData.architectural_style,
                                  [id]: checked,
                                }
                              }));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </Form>
                </Form.Group>
                <Form.Group as={Col} className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>EXTERIOR</Form.Label>
                  <Form>
                    <div className="row">
                      {exterior.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6 d-flex justify-start">
                          <Form.Check
                            type= 'checkbox'
                            id={`${type}`}
                            label={`${type}`}
                            checked={formData.exterior[type]}
                            onChange={(e) => {
                              const { id, checked } = e.target;
                              setFormData((prevData) => ({
                                ...prevData,
                                exterior: {
                                  ...prevData.exterior,
                                  [id]: checked,
                                }
                              }));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </Form>
                </Form.Group>
                <Form.Group as={Col} className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>OUTDOOR AMENITIES</Form.Label>
                  <Form>
                    <div className="row">
                      {outdoorAmenities.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6 d-flex justify-start">
                          <Form.Check
                            type= 'checkbox'
                            id={`${type}`}
                            label={`${type}`}
                            checked={formData.outdoor_amenities[type]}
                            onChange={(e) => {
                              const { id, checked } = e.target;
                              setFormData((prevData) => ({
                                ...prevData,
                                outdoor_amenities: {
                                  ...prevData.outdoor_amenities,
                                  [id]: checked,
                                }
                              }));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </Form>
                </Form.Group>
                <Form.Group as={Col} className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>PARKING</Form.Label>
                  <Form>
                    <div className="row">
                      {parking.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6 d-flex justify-start">
                          <Form.Check
                            type= 'checkbox'
                            id={`${type}`}
                            label={`${type}`}
                            checked={formData.parking[type]}
                            onChange={(e) => {
                              const { id, checked } = e.target;
                              setFormData((prevData) => ({
                                ...prevData,
                                parking: {
                                  ...prevData.parking,
                                  [id]: checked,
                                },
                              }));
                            }}
                          />
                        </div>
                      ))}
                      <Form.Group as={Col} md="6" lg="6" className='pb-3' controlId="validationCustom05">
                        <Form.Label>Parking spaces</Form.Label>
                        <Form.Control type='number' required name='parking.parking_spaces' value={formData.parking.parking_spaces} onChange={handleInputChange} />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid data.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </Form>
                </Form.Group>
                <Form.Group as={Col} className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>ROOF</Form.Label>
                  <Form>
                    <div className="row">
                      {roof.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6 d-flex justify-start">
                          <Form.Check
                            type= 'checkbox'
                            id={`${type}`}
                            label={`${type}`}
                            checked={formData.roof[type]}
                            onChange={(e) => {
                              const { id, checked } = e.target;
                              setFormData((prevData) => ({
                                ...prevData,
                                roof: {
                                  ...prevData.roof,
                                  [id]: checked,
                                }
                              }));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </Form>
                </Form.Group>
                <Form.Group as={Col} className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>VIEW</Form.Label>
                  <Form>
                    <div className="row">
                      {view.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6 d-flex justify-start">
                          <Form.Check
                            type= 'checkbox'
                            id={`${type}`}
                            label={`${type}`}
                            checked={formData.view[type]}
                            onChange={(e) => {
                              const { id, checked } = e.target;
                              setFormData((prevData) => ({
                                ...prevData,
                                view: {
                                  ...prevData.view,
                                  [id]: checked,
                                }
                              }));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </Form>
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col sm={12} md={6} >
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>ACCOUNT DETAILS</Accordion.Header>
              <Accordion.Body>
                <Form.Group as={Col} md="12" className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>PROPERTY ACCOUNTS</Form.Label>
                  <Form>
                    <div className="row">
                      {/* {propertyAccounts.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6">
                          <Form.Check
                            type= 'text'
                            id={`${type}`}
                            label={`${type}`}
                            checked={formData[type]}
                            onChange={(e) => {
                              const { id, checked } = e.target;
                              setFormData((prevData) => ({
                                ...prevData,
                                [id]: checked,
                              }));
                            }}
                          />
                        </div>
                      ))} */}
                      <div className="col m-3">
                        <Form.Group as={Col} md="12" className='pb-3' controlId="validationCustom03">
                          <Form.Label>Down Payment</Form.Label>
                          <Form.Control type="text" placeholder="Enter down payment" name='accounts.down_payment' value={formData.accounts.down_payment} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group as={Col} md="12" className='pb-3' controlId="validationCustom03">
                          <Form.Label>Loan Years</Form.Label>
                          <Form.Control type="text" placeholder="Enter number of years of loan" name='accounts.loan_years' value={formData.accounts.loan_years} onChange={handleInputChange} />
                        </Form.Group>
                      </div>
                      <div className="col m-3">
                        <Form.Group as={Col} md="12" className='pb-3' controlId="validationCustom03">
                          <Form.Label>Interest Rate</Form.Label>
                          <Form.Control type="text" placeholder="Enter interest rate" name='accounts.interest_rate' value={formData.accounts.interest_rate} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group as={Col} md="12" className='pb-3' controlId="validationCustom03">
                          <Form.Label>Tax Rate</Form.Label>
                          <Form.Control type="text" placeholder="Enter tax rate" name='accounts.tax_rate' value={formData.accounts.tax_rate} onChange={handleInputChange} />
                        </Form.Group>
                      </div>
                    </div>
                  </Form>
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      <Row className='mb-3 flex justify-center'>
        <h4 className='text-lg font-semibold pb-3'>Contact Information</h4>
        <Col md="4">
          <Form.Label className='text-base'>Phone number</Form.Label>
          <FloatingLabel
            controlId="floatingInput"
            label="Phone number"
            className="mb-3"
          >
          <Form.Control type="text" placeholder="1234567890" name='phone_number' value={formData.phone_number} onChange={handleInputChange} required />
          </FloatingLabel>
        </Col>
        <Col md="4">
          <Form.Label className='text-base'>Email</Form.Label>
          <FloatingLabel controlId="floatingPassword" label="Email">
            <Form.Control type="email" placeholder="myemail@gmail.com" name='email' value={formData.email} onChange={handleInputChange} required />
          </FloatingLabel> 
        </Col>
      </Row>
      <Form.Group className="mb-3 flex justify-center">
        <Form.Check
          required
          label="The provided information is correct and potential buyers will contact you through the rykerz message service or  email address you use to register on here. You must also add your phone number to the listing here."
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button 
        type="submit" 
        className='bg-red-700' 
        style={{
          transition: 'background-color 0.3s, color 0.3s',
          backgroundColor: 'red',
          color: 'white',
          borderColor: 'white',
        }}
        onMouseEnter={(event) => {
          event.target.style.backgroundColor = 'white';
          event.target.style.color = 'red';
          event.target.style.borderColor = 'red';
        }}
        onMouseLeave={(event) => {
          event.target.style.backgroundColor = 'red';
          event.target.style.color = 'white';
          event.target.style.borderColor = 'white';
        }}
      >
        UPDATE PROPERTY
      </Button>
    </Form>
  );
}

export default UserEditHouseDetails