import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetPropertyAddress } from '../../../../Redux/sellPropertyDetails/propertyAddressSlice';

const UserPostHouseDetails = () => {
  const [validated, setValidated] = useState(false);
  const history = useHistory();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

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
    
    // Append form fields
    handleNestedObjects(formData);

    // const imagesArray = [];

    // for (let i = 0; i < imageFile.length; i++) {
    //   imagesArray.push(imageFile[i]);
    // }

    // formDataObject.append('property_images', JSON.stringify(imagesArray));

    // const videosArray = [];

    // for (let i = 0; i < videoFile.length; i++) {
    //   videosArray.push(videoFile[i]);
    // }

    // formDataObject.append('property_videos', JSON.stringify(videosArray));

    for (var pair of formDataObject.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    const token = localStorage.getItem('accessToken');
    // fileData.append('userId', formData.owner_id);

    try {
      console.log(formDataObject);
      for (var pair of formDataObject.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      const response = await fetch('http://127.0.0.1:8000/api/property/register/', {
        method: 'POST',
        body: formDataObject,
        headers: {
          // "Authorization": `Bearer ${token}`,
        }
      })

      if (response.ok) {
        console.log('PropertyAdded');
        const data = await response.json();
        console.log(data)
        dispatch(resetPropertyAddress())
        localStorage.setItem('propertyId', data.id)
        history.push('/postpropertydocuments');
      } else {
        console.log('Failed to add property');
        const errorText = await response.text();
        console.log('Error Details:', errorText);
        console.log('status', response.status);
        console.log(response);
        // console.log(formData);
      }
    } catch (error) {
      console.error("Error in senting request", error);
    }

    // try {
    //   fetch('http://127.0.0.1:8000/api/property/addfiles/', {
    //     method: 'POST',
    //     body: fileData,
    //   }).then((response) => {
    //     if (response.ok) {
    //       console.log('Property Files added');
    //       console.log(response);
    //     } else {
    //       console.log('Failed to add property files')
    //       console.log(response);
    //     }
    //   });
    // } catch {
    //   console.log('Error in sending request for property files');
    // }
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

  const dispatch = useDispatch();
  const transactionType = useSelector(state => state.showPropertyAddress.transactionType);
  const address = useSelector(state => state.showPropertyAddress.address);
  const unit = useSelector(state => state.showPropertyAddress.unit);
  const city = useSelector(state => state.showPropertyAddress.city);
  const state = useSelector(state => state.showPropertyAddress.state);
  const pincode = useSelector(state => state.showPropertyAddress.pincode);
  const coordinates = useSelector(state => state.showPropertyAddress.coordinates);
  const userId = useSelector(state => state.showIsLoggedin.userId);
  const ownerId = userId;

  const {latitude, longitude} = coordinates;

  // const [formData, setFormData] = useState({
  //   user_id: ownerId,
  //   phone_number: '1122334455',
  //   email: 'ashad@gmail.com',
  //   transaction_type: transactionType,
  //   property_name: 'Fajnassawa',
  //   property_type: 'house',
  //   address: address,
  //   locality: {
  //     pincode: pincode,
  //     unit: unit,
  //     district: city,
  //     state: state,
  //   },
  //   coordinates: {
  //     latitude: coordinates.lat,
  //     longitude: coordinates.lng,
  //   },
  //   price: '1342523',
  //   virtual_tour_url: 'www.entho.com',
  //   basement_square_feet: '253',
  //   garage_square_feet: '123',
  //   description: 's;jhfpoejgnf;ejgrenwo;fnvfjsdjlvgshdb',
  //   bedroom: 0,
  //   bathroom: 0,
  //   finished_square_feet: '234',
  //   lot_size: '534',
  //   year_build: formattedDate,
  //   remodal_year: formattedDate,
  //   open_house: {
  //     date: '',
  //     start_time: '',
  //     end_time: '',
  //   },
  //   related_website: 'ar.com',
  //   more_description: 'sajfbvvkjsajsahksajv',
  //   appliances: {
  //     dishwasher: false,
  //     oven: false,
  //     dry: false,
  //     refrigerator: false,
  //     freezer: false,
  //     trash_compator: false,
  //     garbage_disposal: false,
  //     washer: false,
  //     micro_wave: false,
  //   },
  //   basement: {
  //     finished: false,
  //     unfinished: false,
  //     partially_finished: false,
  //   },
  //   floor_covering: {
  //     carpet: false,
  //     slate: false,
  //     concrete: false,
  //     softwood: false,
  //     hardwood: false,
  //     tile: false,
  //     laminate: false,
  //     other_floor_covering: false,
  //     linoleum: false,
  //   },
  //   rooms: {
  //     breakfast_nook: false,
  //     office: false,
  //     dining_room: false,
  //     pantry: false,
  //     family_room: false,
  //     recreation_room: false,
  //     laundry_room: false,
  //     workshop: false,
  //     library: false,
  //     master_room: false,
  //     total_rooms: '5',
  //   },
  //   indoor_features: {
  //     security_system: false,
  //     cable: false,
  //     ceiling_fans: false,
  //     fire_place: false,
  //     wired: false,
  //   },
  //   accounts: {
  //     down_payment: '',
  //     loan_years: '',
  //     interest_rate: '',
  //     tax_rate: '',
  //   },
  //   building_amenities: {
  //     gated_entry: false,
  //     near_transportation: false,
  //     controlled_access: false,
  //     storage: false,
  //     elevator: false,
  //   },
  //   architectural_style: {
  //     bungalow: false,
  //     modern: false,
  //     villa: false,
  //     loft: false,
  //   },
  //   exterior: {
  //     brick: false,
  //     stucco: false,
  //     cement: false,
  //     vinyl: false,
  //     wood: false,
  //     metal: false,
  //     stone: false,
  //     other_exterior: false,
  //   },
  //   outdoor_amenities: {
  //     balcony: false,
  //     barbecue_area: false,
  //     pond: false,
  //     pool: false,
  //     porch: false,
  //     rv_parking: false,
  //     water_front: false,
  //     spa: false,
  //     sprinkler_system: false,
  //   },
  //   parking: {
  //     carport: false,
  //     off_street: false,
  //     garage_attached: false,
  //     on_street: false,
  //     garage_detached: false,
  //     parking_spaces: '2',
  //   },
  //   roof: {
  //     asphalt: false,
  //     concrete: false,
  //     build_up: false,
  //     slate: false,
  //     composition: false,
  //     tile: false,
  //     metal: false,
  //   },
  //   view: {
  //     city: false,
  //     territorial: false,
  //     mountain: false,
  //     water: false,
  //     park: false,
  //   },
  // });

  const [formData, setFormData] = useState({
    user_id: ownerId,
    phone_number: '',
    email: '',
    transaction_type: transactionType,
    property_name: '',
    property_type: 'house',
    address: address,
    locality: {
      pincode: pincode,
      unit: unit,
      district: city,
      state: state,
    },
    coordinates: {
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    price: '',
    virtual_tour_url: '',
    basement_square_feet: '',
    garage_square_feet: '',
    description: '',
    bedroom: null,
    bathroom: null,
    finished_square_feet: '',
    lot_size: '',
    year_build: formattedDate,
    remodal_year: formattedDate,
    open_house: {
      date: '',
      start_time: '',
      end_time: '',
    },
    related_website: '',
    more_description: '',
    appliances: {
      dishwasher: false,
      oven: false,
      dry: false,
      refrigerator: false,
      freezer: false,
      trash_compator: false,
      garbage_disposal: false,
      washer: false,
      micro_wave: false,
    },
    basement: {
      finished: false,
      unfinished: false,
      partially_finished: false,
    },
    floor_covering: {
      carpet: false,
      slate: false,
      concrete: false,
      softwood: false,
      hardwood: false,
      tile: false,
      laminate: false,
      other_floor_covering: false,
      linoleum: false,
    },
    rooms: {
      breakfast_nook: false,
      office: false,
      dining_room: false,
      pantry: false,
      family_room: false,
      recreation_room: false,
      laundry_room: false,
      workshop: false,
      library: false,
      master_room: false,
      total_rooms: '',
    },
    indoor_features: {
      security_system: false,
      cable: false,
      ceiling_fans: false,
      fire_place: false,
      wired: false,
    },
    accounts: {
      down_payment: '',
      loan_years: '',
      interest_rate: '',
      tax_rate: '',
    },
    building_amenities: {
      gated_entry: false,
      near_transportation: false,
      controlled_access: false,
      storage: false,
      elevator: false,
    },
    architectural_style: {
      bungalow: false,
      modern: false,
      villa: false,
      loft: false,
    },
    exterior: {
      brick: false,
      stucco: false,
      cement: false,
      vinyl: false,
      wood: false,
      metal: false,
      stone: false,
      other_exterior: false,
    },
    outdoor_amenities: {
      balcony: false,
      barbecue_area: false,
      pond: false,
      pool: false,
      porch: false,
      rv_parking: false,
      water_front: false,
      spa: false,
      sprinkler_system: false,
    },
    parking: {
      carport: false,
      off_street: false,
      garage_attached: false,
      on_street: false,
      garage_detached: false,
      parking_spaces: '',
    },
    roof: {
      asphalt: false,
      concrete: false,
      build_up: false,
      slate: false,
      composition: false,
      tile: false,
      metal: false,
    },
    view: {
      city: false,
      territorial: false,
      mountain: false,
      water: false,
      park: false,
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
  };

  return (
    <Form encType='multipart/form-data' noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
      <Form.Group as={Col} md="4" className='pb-3' controlId="validationCustom01">
          <Form.Label>Property Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your property name"
            name='property_name'
            value={formData.property_name}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" className='pb-3' controlId="validationCustom01">
          <Form.Label>Set your price</Form.Label>
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
        <Form.Group as={Col} md="4" className='pb-3' controlId="validationCustom02">
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
      </Row>
      <Row className='mb-3 flex justify-around'>
        <h4 className='text-lg font-semibold pb-3'>Home Facts</h4>
        <Form.Group as={Col} md="4" className='pb-3' controlId="validationCustom03">
          <Form.Label>Basement sq. ft.</Form.Label>
          <Form.Control type="text" placeholder="Enter basement square feet" required name='basement_square_feet' value={formData.basement_square_feet} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Enter basement square feet
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" className='pb-3' controlId="validationCustom03">
          <Form.Label>Garage sq. ft.</Form.Label>
          <Form.Control type="text" placeholder="Enter garage sqaure feet" name='garage_square_feet' value={formData.garage_square_feet} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group as={Col} md="4" className='pb-3' controlId="validationCustom04">
          <Form.Label>Describe your home</Form.Label>
          <Form.Control as="textarea" placeholder="Describe your home" required name='description' value={formData.description} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please describe your home.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3 flex justify-around">
        <Form.Group as={Col} md="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Bedroom</Form.Label>
          <Form.Control type='number' required name='bedroom' value={formData.bedroom} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Bathroom</Form.Label>
          <Form.Control type='number' required name='bathroom' value={formData.bathroom} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Finished Square feet</Form.Label>
          <Form.Control type='number' required name='finished_square_feet' value={formData.finished_square_feet} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Lot Size</Form.Label>
          <Form.Control type='number' required name='lot_size' value={formData.lot_size} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3 flex justify-around'>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Year build</Form.Label>
          <Form.Control type='date' required name='year_build' value={formData.year_build} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Structural remodal</Form.Label>
          <Form.Control type='date' required name='remodal_year' value={formData.remodal_year} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3 flex justify-around'>
        <h4 className='text-lg font-semibold pb-3'>Open House</h4>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Date</Form.Label>
          <Form.Control type='date' name='open_house.date' value={formData.open_house.date} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid date.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Start Time</Form.Label>
          <Form.Control type='time' name='open_house.start_time' value={formData.open_house.start_time} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid start time.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>End Time</Form.Label>
          <Form.Control type='time' name='open_house.end_time' value={formData.open_house.end_time} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid end time.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3 flex justify-around'>
        <h4 className='text-lg font-semibold pb-3'>Additional Information</h4>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Related website</Form.Label>
          <Form.Control type='text' name='related_website' value={formData.related_website} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>What i love about this Home</Form.Label>
          <Form.Control as="textarea" name='more_description' value={formData.more_description} onChange={handleInputChange} />
        </Form.Group>
      </Row>
      <Row className='mb-3 flex justify-around'>
        <Col>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>ROOM DETAILS</Accordion.Header>
              <Accordion.Body>
              <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom05">
                <Form.Label className='text-base'>APPLIANCES</Form.Label>
                <Form>
                  <div className="row">
                    {appliances.map((type) => (
                      <div key={`${type}`} className="mb-3 col-6">
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
              <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom05">
                <Form.Label className='text-base'>BASEMENT</Form.Label>
                <Form className='flex justify-center'>
                  <div className="row">
                    {basement.map((type) => (
                      <div key={`${type}`} className="mb-3 col-6">
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
              <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom05">
                <Form.Label className='text-base'>FLOOR COVERING</Form.Label>
                <Form className='flex justify-center'>
                  <div className="row">
                    {floorCovering.map((type) => (
                      <div key={`${type}`} className="mb-3 col-6">
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
              <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom05">
                <Form.Label className='text-base'>ROOMS</Form.Label>
                <Form className='flex justify-center'>
                  <div className="row">
                    {rooms.map((type) => (
                      <div key={`${type}`} className="mb-3 col-6">
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
              <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom05">
                <Form.Label className='text-base'>INDOOR FEATURES</Form.Label>
                <Form className='flex justify-center'>
                  <div className="row">
                    {indoorFeatures.map((type) => (
                      <div key={`${type}`} className="mb-3 col-6">
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
                <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>BUILDING AMENITIES</Form.Label>
                  <Form>
                    <div className="row">
                      {buildingAmenities.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6">
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
                <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>ARCHITECTURAL STYLE</Form.Label>
                  <Form>
                    <div className="row">
                      {architecturalStyle.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6">
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
                <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>EXTERIOR</Form.Label>
                  <Form>
                    <div className="row">
                      {exterior.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6">
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
                <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>OUTDOOR AMENITIES</Form.Label>
                  <Form>
                    <div className="row">
                      {outdoorAmenities.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6">
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
                <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>PARKING</Form.Label>
                  <Form>
                    <div className="row">
                      {parking.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6">
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
                <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>ROOF</Form.Label>
                  <Form>
                    <div className="row">
                      {roof.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6">
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
                <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>VIEW</Form.Label>
                  <Form>
                    <div className="row">
                      {view.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6">
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
        <Col>
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
          label="The provided information is correct and potential buyers will contact you through the rykerz message service or  email address you use to register on Here. You must also add your phone number to the listing here."
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
        POST FOR SALE BY OWNER
      </Button>
    </Form>
  );
}

export default UserPostHouseDetails