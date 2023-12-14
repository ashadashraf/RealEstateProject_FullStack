import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useHistory} from 'react-router-dom';
import { constructApiUrl } from '../../../../Services/ApiUtils';


const UserPostPropertyDocuments = () => {
    const [validated, setValidated] = useState(false);
    const [imageFields, setImageFields] = useState([{ id: 5 }]);
    const [imageFile, setImageFile] = useState([]);
    const [videoFields, setVideoFields] = useState([{ id: 1 }]);
    const [videoFile, setVideoFile] = useState([]);
    const history = useHistory();

    const addImageField = () => {
        const newId = imageFields.length + 1;
        const newImageField = { id: newId };
        setImageFields([...imageFields, newImageField]);
    };
    
    const addVideoField = () => {
        const newId = videoFields.length + 1;
        const newVideoField = { id: newId };
        setVideoFields([...videoFields, newVideoField]);
    };
    
    const removeImageField = (id) => {
        const updatedImageFields = imageFields.filter((field) => field.id !== id);
        setImageFields(updatedImageFields);
    };
    
    const removeVideoField = (id) => {
        const updatedVideoFields = videoFields.filter((field) => field.id !== id);
        setVideoFields(updatedVideoFields);
    };
    
    const handleImageChange = (event, index) => {
        const files = event.target.files;
        const updatedImageFiles = [...imageFile]; 
        updatedImageFiles[index] = files[0];
        setImageFile(updatedImageFiles);
    };
    
    const handleVideoChange = (event, index) => {
        console.log(index);
        const files = event.target.files;
        const updatedVideoFiles = [...videoFile];
        updatedVideoFiles[index] = files[0];
        setVideoFile(updatedVideoFiles);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataObject = new FormData();
    
        for (let i = 0; i < imageFile.length; i++) {
          if (imageFile[i]) {
            formDataObject.append('property_images', imageFile[i]);
          }
        }
    
        for (let i = 0; i < videoFile.length; i++) {
          if (videoFile[i]) {
            formDataObject.append('property_videos', videoFile[i]);
          }
        }
    
        const token = localStorage.getItem('accessToken');
        const propertyId = localStorage.getItem('propertyId');

        formDataObject.append('property', propertyId)
        
    
        try {
          const apiEndpoint = 'api/property/adddocuments/';
          const response = await fetch(constructApiUrl(apiEndpoint), {
            method: 'POST',
            body: formDataObject,
            headers: {
              // 'Authorization': `Bearer ${token}`,
            },
          });
    
          if (response.ok) {
            console.log('Property Document Added');
            const data = await response.json();
            console.log(data);
            localStorage.removeItem('propertyId');
            history.push('/');
          } else {
            console.log('Failed to add property documents');
            const errorText = await response.text();
            console.log('Error Details:', errorText);
            console.log('Status', response.status);
            console.log('Response', response);
          }
        } catch (error) {
          console.error('Error in sending request', error);
        }
    };


    return (
        <React.Fragment>
            <Form className='m-5' onSubmit={handleSubmit}>
                <Form.Label className='text-lg'>Images</Form.Label>
                <Form.Group as={Col} md="3" key="1" controlId='imageUpload' required>
                    <Form.Label>Image 1</Form.Label>
                    <Form.Control name='uploaded_images' type="file" accept="image/jpeg,image/png,image/gif" multiple onChange={(event) => handleImageChange(event, 0)} />
                </Form.Group>
                <Form.Group as={Col} md="3" key="2" controlId='imageUpload' required>
                    <Form.Label>Image 2</Form.Label>
                    <Form.Control name='uploaded_images' type="file" accept="image/jpeg,image/png,image/gif" multiple onChange={(event) => handleImageChange(event, 1)} />
                </Form.Group>
                <Form.Group as={Col} md="3" key="3" controlId='imageUpload' required>
                    <Form.Label>Image 3</Form.Label>
                    <Form.Control name='uploaded_images' type="file" accept="image/jpeg,image/png,image/gif" multiple onChange={(event) => handleImageChange(event, 2)} />
                </Form.Group>
                {/* <Form.Group as={Col} md="3" key="4" controlId='videoUpload' required>
                    <Form.Label>Video 1</Form.Label>
                    <Form.Control name='uploaded_videos' type="file" accept="video/*" multiple onChange={(event) => handleVideoChange(event, 0)} />
                </Form.Group> */}
                {imageFields.map((field, index) => (
                <Form.Group className='pt-3' as={Col} md="3" key={field.id} controlId={`imageUpload-${field.id}`}>
                    <Form.Label>Image</Form.Label>
                    <Form.Control name='uploaded_images' type="file" accept="image/jpeg,image/png,image/gif" multiple onChange={(event) => handleImageChange(event, field.id)} />
                    <Button variant="danger" onClick={() => removeImageField(field.id)}>Remove Image</Button>
                </Form.Group>
                ))}
                <Col md="3" className='pb-3 pt-4 mt-3'>
                <Button variant="primary" className='text-black' onClick={addImageField}>Add Image</Button>
                </Col>
                {videoFields.map((field, index) => (
                <Form.Group className='pt-3' as={Col} md="3" key={field.id} controlId={`imageUpload-${field.id}`}>
                    <Form.Label>Video</Form.Label>
                    <Form.Control name='uploaded_videos' type="file" accept="video/*" multiple onChange={(event) => handleVideoChange(event, field.id)} />
                    <Button variant="danger" onClick={() => removeVideoField(field.id)}>Remove Video</Button>
                </Form.Group>
                ))}
                <Col md="3" className='pb-3 pt-4 mt-3'>
                <Button variant="primary" className='text-black' onClick={addVideoField}>Add Video</Button>
                </Col>
                <Button type='submit' variant='primary' className='text-black'>Submit</Button>
            </Form>
        </React.Fragment>
    )
}

export default UserPostPropertyDocuments