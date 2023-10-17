import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useSelector, useDispatch } from 'react-redux';

const UserPostHouseDetails = () => {
  const [validated, setValidated] = useState(false);
  const [imageFields, setImageFields] = useState([{ id: 5 }]);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const addImageField = () => {
    const newId = imageFields.length + 1;
    const newImageField = { id: newId };
    setImageFields([...imageFields, newImageField]);
  };

  const removeImageField = (id) => {
    const updatedImageFields = imageFields.filter((field) => field.id !== id);
    setImageFields(updatedImageFields);
  };

  const handleImageChange = (event) => {
    const file = event.target.file[0];
    setImageFile(file);
  };

  const handleVideoChange = (event) => {
    const file = event.target.file[0];
    setVideoFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      'userId', formData.userId,
      'transaction', formData.transactionType,
      'address', formData.address,
      'unit', formData.unit,
      'city', formData.city,
      'state', formData.state,
      'pincode', formData.pincode,
      'coordinates', formData.coordinates,
      formData.price,
      formData.virtualTourURL,
      formData.basementSqFt,
      formData.garageSqFt,
      formData.homeDescription,
      formData.bedroom,
      formData.bathroom,
      formData.finishedSqFt,
      formData.lotSize,
      formData.yearBuild,
      formData.structuralRemodal,
      formData.openHouseDate,
      formData.openHouseStartTime,
      formData.openHouseEndTime,
      formData.relatedWebsite,
      formData.moreDescription,
      'dishwasher',formData.dishwasher,
      'oven',formData.oven,
      'dry',formData.dry,
      'refrigerator',formData.refrigerator,
      'freezer',formData.freezer,
      'trashCompator',formData.trashCompator,
      'garbageDisposal',formData.garbageDisposal,
      'washer',formData.washer,
      'microWave',formData.microWave,
      'finishedBasement',formData.finishedBasement,
      'unfinishedBasement',formData.unfinishedBasement,
      'partiallyFinishedBasement',formData.partiallyFinishedBasement,
      'noneBasement',formData.noneBasement,
      'carpet',formData.carpet,
      'slate',formData.slate,
      'concrete',formData.concrete,
      'softwood',formData.softwood,
      'hardwood',formData.hardwood,
      'tile',formData.tile,
      'laminate',formData.laminate,
      'otherFloorCovering',formData.otherFloorCovering,
      'linoleum',formData.linoleum,
      'breakfastNook',formData.breakfastNook,
      'office',formData.office,
      'diningRoom',formData.diningRoom,
      'pantry',formData.pantry,
      'familyRoom',formData.familyRoom,
      'recreationRoom',formData.recreationRoom,
      'laundryRoom',formData.laundryRoom,
      'workshop',formData.workshop,
      'library',formData.library,
      'masterRoom',formData.masterRoom,
      'totalRooms',formData.totalRooms,
      'securitySystem',formData.securitySystem,
      'cable',formData.cable,
      'ceilingFans',formData.ceilingFans,
      'firePlace',formData.firePlace,
      'wired',formData.wired,
      'downPayment',formData.downPayment,
      'loanYears',formData.loanYears,
      'interestRate',formData.interestRate,
      'taxRate',formData.taxRate,
      'gatedEntry',formData.gatedEntry,
      'nearTransportation',formData.nearTransportation,
      'controlledAccess',formData.controlledAccess,
      'storage',formData.storage,
      'elevator',formData.elevator,
      'bungalow',formData.bungalow,
      'modern',formData.modern,
      'villa',formData.villa,
      'loft',formData.loft,
      'brick',formData.brick,
      'stucco',formData.stucco,
      'cement',formData.cement,
      'vinyl',formData.vinyl,
      'wood',formData.wood,
      'metal',formData.metal,
      'stone',formData.stone,
      'otherExterior',formData.otherExterior,
      'balcony',formData.balcony,
      'barbecueArea',formData.barbecueArea,
      'pond',formData.pond,
      'pool',formData.pool,
      'porch',formData.porch,
      'rvParking',formData.rvParking,
      'waterFront',formData.waterFront,
      'spa',formData.spa,
      'sprinklerSystem',formData.sprinklerSystem,
      'carport',formData.carport,
      'offStreet',formData.offStreet,
      'garageAttached',formData.garageAttached,
      'onStreet',formData.onStreet,
      'garageDetached',formData.garageDetached,
      'parkingNone',formData.parkingNone,
      'totalParking',formData.totalParking,
      'asphalt',formData.asphalt,
      'concreteRoof',formData.concreteRoof,
      'buildUp',formData.buildUp,
      'slateRoof',formData.slateRoof,
      'composition',formData.composition,
      'tileRoof',formData.tileRoof,
      'metalRoof',formData.metalRoof,
      'otherRoof',formData.otherRoof,
      'city',formData.city,
      'territorial',formData.territorial,
      'mountain',formData.mountain,
      'water',formData.water,
      'park',formData.park,
      'viewNone',formData.viewNone
      )
    
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const fileData = new FormData();

    for (let i = 0; i < imageFile.length; i++) {
      fileData.append(`images[${i}]`, imageFile[i]);
    }

    for (let i = 0; i < videoFile.length; i++) {
      fileData.append(`videos[${i}]`, videoFile[i]);
    }

    fileData.append('userId', userId);

    try {
      fetch('http://127.0.0.1:8000/api/property/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((response) => {
        if (response.ok) {
          console.log('PropertyAdded');
          console.log(response);
          history.push('/');
        } else {
          console.log('Failed to add property');
          console.log(response);
        }
      })
    } catch {
      console.error("Error in senting request");
    }

    try {
      fetch('http://127.0.0.1:8000/api/property/files/', {
        method: 'POST',
        body: fileData,
      }).then((response) => {
        if (response.ok) {
          console.log('Property Files added');
          console.log(response);
        } else {
          console.log('Failed to add property files')
          console.log(response);
        }
      });
    } catch {
      console.log('Error in sending request for property files');
    }
    setValidated(true);
  };

  const appliances = ['dishwasher', 'oven', 'dry', 'refrigerator', 'freezer', 'trashCompator', 'garbageDisposal', 'washer', 'microWave'];
  const basement = ['finishedBasement', 'unfinishedBasement', 'partiallyFinishedBasement', 'noneBasement'];
  const floorCovering = ['carpet', 'slate', 'concrete', 'softwood', 'hardwood', 'tile', 'laminate', 'otherFloorCovering', 'floorLinoleum'];
  const rooms = ['breakfastNook', 'office', 'diningRoom', 'pantry', 'familyRoom', 'recreationRoom', 'laundryRoom', 'workshop', 'library', 'masterRoom'];
  const indoorFeatures = ['securitySystem', 'cable', 'ceilingFans', 'firePlace', 'wired'];
  const propertyAccounts = ['downPayment', 'loanYears', 'interestRate', 'taxRate'];
  const buildingAmenities = ['gatedEntry', 'nearTransportation', 'controlledAccess', 'storage', 'elevator'];
  const architecturalStyle = ['bungalow', 'modern', 'villa', 'loft'];
  const exterior = ['brick', 'stucco', 'cement', 'vinyl', 'wood', 'metal', 'stone', 'otherExterior'];
  const outdoorAmenities = ['balcony', 'barbecueArea', 'pond', 'pool', 'porch', 'rvParking', 'waterFront', 'spa', 'sprinklerSystem'];
  const parking = ['carport', 'offStreet', 'garageAttached', 'onStreet', 'garageDetached', 'parkingNone'];
  const roof = ['asphalt', 'concreteRoof', 'buildUp', 'slateRoof', 'composition', 'tileRoof', 'metalRoof', 'otherRoof'];
  const view = ['city', 'territorial', 'mountain', 'water', 'park', 'ViewNone'];

  const dispatch = useDispatch();
  const transactionType = useSelector(state => state.showPropertyAddress.transactionType);
  const address = useSelector(state => state.showPropertyAddress.address);
  const unit = useSelector(state => state.showPropertyAddress.unit);
  const city = useSelector(state => state.showPropertyAddress.city);
  const state = useSelector(state => state.showPropertyAddress.state);
  const pincode = useSelector(state => state.showPropertyAddress.pincode);
  const coordinates = useSelector(state => state.showPropertyAddress.coordinates);
  const userId = useSelector(state => state.showIsLoggedin.userId);


  const [formData, setFormData] = useState({
    userId: userId,
    transactionType: transactionType,
    address: address,
    unit: unit,
    city: city,
    state: state,
    pincode: pincode,
    coordinates: coordinates,
    price: '',
    virtualTourURL: '',
    basementSqFt: '',
    garageSqFt: '',
    homeDescription: '',
    bedroom: '',
    bathroom: '',
    finishedSqFt: '',
    lotSize: '',
    yearBuild: '',
    structuralRemodal: '',
    openHouseDate: '',
    openHouseStartTime: '',
    openHouseEndTime: '',
    relatedWebsite: '',
    moreDescription: '',
    dishwasher: false,
    oven: false,
    dry: false,
    refrigerator: false,
    freezer: false,
    trashCompator: false,
    garbageDisposal: false,
    washer: false,
    microWave: false,
    finishedBasement: false,
    unfinishedBasement: false,
    partiallyFinishedBasement: false,
    noneBasement: false,
    carpet: false,
    slate: false,
    concrete: false,
    softwood: false,
    hardwood: false,
    tile: false,
    laminate: false,
    otherFloorCovering: false,
    floorLinoleum: false,
    breakfastNook: false,
    office: false,
    diningRoom: false,
    pantry: false,
    familyRoom: false,
    recreationRoom: false,
    laundryRoom: false,
    workshop: false,
    library: false,
    masterRoom: false,
    totalRooms: '',
    securitySystem: false,
    cable: false,
    ceilingFans: false,
    firePlace: false,
    wired: false,
    downPayment: false,
    loanYears: false,
    interestRate: false,
    taxRate: false,
    gatedEntry: false,
    nearTransportation: false,
    controlledAccess: false,
    storage: false,
    elevator: false,
    bungalow: false,
    modern: false,
    villa: false,
    loft: false,
    brick: false,
    stucco: false,
    cement: false,
    vinyl: false,
    wood: false,
    metal: false,
    stone: false,
    otherExterior: false,
    balcony: false,
    barbecueArea: false,
    pond: false,
    pool: false,
    porch: false,
    rvParking: false,
    waterFront: false,
    spa: false,
    sprinklerSystem: false,
    carport: false,
    offStreet: false,
    garageAttached: false,
    onStreet: false,
    garageDetached: false,
    parkingNone: false,
    totalParking: '',
    asphalt: false,
    concreteRoof: false,
    buildUp: false,
    slateRoof: false,
    composition: false,
    tileRoof: false,
    metalRoof: false,
    otherRoof: false,
    city: false,
    territorial: false,
    mountain: false,
    water: false,
    park: false,
    viewNone: false
  });
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
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
            name='virtualTourURL'
            value={formData.virtualTourURL}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3'>
        <Form.Label className='text-lg'>Images</Form.Label>
        <Form.Group as={Col} md="3" key="1" controlId='imageUpload' required>
            <Form.Label>Image 1</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>
        <Form.Group as={Col} md="3" key="2" controlId='imageUpload' required>
            <Form.Label>Image 2</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>
        <Form.Group as={Col} md="3" key="3" controlId='imageUpload' required>
            <Form.Label>Image 3</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>
        <Form.Group as={Col} md="3" key="4" controlId='videoUpload' required>
            <Form.Label>Video 1</Form.Label>
            <Form.Control type="file" accept="video/*" onChange={handleVideoChange} />
        </Form.Group>
        {imageFields.map((field, index) => (
          <Form.Group className='pt-3' as={Col} md="3" key={field.id} controlId={`imageUpload-${field.id}`}>
            <Form.Label>Image {index + 4}</Form.Label>
            <Form.Control type="file" accept="image/*" />
            <Button variant="danger" onClick={() => removeImageField(field.id)}>Remove</Button>
          </Form.Group>
        ))}
        <Col md="3" className='pb-3 pt-4 mt-3'>
          <Button variant="primary" className='text-black' onClick={addImageField}>Add Image</Button>
        </Col>
      </Row>
      <Row className='mb-3 flex justify-around'>
        <h4 className='text-lg font-semibold pb-3'>Home Facts</h4>
        <Form.Group as={Col} md="4" className='pb-3' controlId="validationCustom03">
          <Form.Label>Basement sq. ft.</Form.Label>
          <Form.Control type="text" placeholder="Enter basement square feet" required name='basementSqFt' value={formData.basementSqFt} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Enter basement square feet
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" className='pb-3' controlId="validationCustom03">
          <Form.Label>Garage sq. ft.</Form.Label>
          <Form.Control type="text" placeholder="Enter garage sqaure feet" name='garageSqFt' value={formData.garageSqFt} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group as={Col} md="4" className='pb-3' controlId="validationCustom04">
          <Form.Label>Describe your home</Form.Label>
          <Form.Control as="textarea" placeholder="Describe your home" required name='homeDescription' value={formData.homeDescription} onChange={handleInputChange} />
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
          <Form.Control type='number' required name='finishedSqFt' value={formData.finishedSqFt} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Lot Size</Form.Label>
          <Form.Control type='number' required name='lotSize' value={formData.lotSize} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3 flex justify-around'>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Year build</Form.Label>
          <Form.Control type='number' required name='yearBuild' value={formData.yearBuild} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Structural remodal</Form.Label>
          <Form.Control type='number' required name='structuralRemodal' value={formData.structuralRemodal} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid data.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3 flex justify-around'>
        <h4 className='text-lg font-semibold pb-3'>Open House</h4>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Date</Form.Label>
          <Form.Control type='date' name='openHouseDate' value={formData.openHouseDate} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid date.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Start Time</Form.Label>
          <Form.Control type='time' name='openHouseStartTime' value={formData.openHouseStartTime} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid start time.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>End Time</Form.Label>
          <Form.Control type='time' name='openHouseEndTime' value={formData.openHouseEndTime} onChange={handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid end time.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3 flex justify-around'>
        <h4 className='text-lg font-semibold pb-3'>Additional Information</h4>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>Related website</Form.Label>
          <Form.Control type='text' name='relatedWebsite' value={formData.relatedWebsite} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group as={Col} md="2" lg="2" className='pb-3' controlId="validationCustom05">
          <Form.Label>What i love about this Home</Form.Label>
          <Form.Control as="textarea" name='moreDescription' value={formData.moreDescription} onChange={handleInputChange} />
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
                    ))}
                    <Form.Group as={Col} md="6" lg="6" className='pb-3' controlId="validationCustom05">
                      <Form.Label>Total Rooms</Form.Label>
                      <Form.Control type='number' required name='totalRooms' value={formData.totalRooms} onChange={handleInputChange} />
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
                      ))}
                      <Form.Group as={Col} md="6" lg="6" className='pb-3' controlId="validationCustom05">
                        <Form.Label>Parking spaces</Form.Label>
                        <Form.Control type='number' required name='totalParking' value={formData.totalParking} onChange={handleInputChange} />
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
                <Form.Group as={Col} md="6" className='pb-3' controlId="validationCustom05">
                  <Form.Label className='text-base'>PROPERTY ACCOUNTS</Form.Label>
                  <Form>
                    <div className="row">
                      {propertyAccounts.map((type) => (
                        <div key={`${type}`} className="mb-3 col-6">
                          <Form.Check
                            type= 'checkbox'
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
                      ))}
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
            <Form.Control type="number" placeholder="1234567890" required />
          </FloatingLabel>
        </Col>
        <Col md="4">
          <Form.Label className='text-base'>Email</Form.Label>
          <FloatingLabel controlId="floatingPassword" label="Email">
            <Form.Control type="email" placeholder="myemail@gmail.com" required />
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