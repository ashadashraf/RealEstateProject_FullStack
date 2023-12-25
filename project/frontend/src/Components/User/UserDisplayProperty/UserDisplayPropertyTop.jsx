import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux';

const UserDisplayPropertyTop = () => {
    const property = useSelector(state => state.showPropertyDetail.showPropertyDetail[0])
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSelectedImage(null);
        }, 6500);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <React.Fragment>
            <Row className='w-100 pl-1 pr-1 pb-1'>
                <Col lg={7} className='pt-1'>
                    {/* <img src={property.images[1].image} className='d-block w-100 rounded-xl' style={{height: '30vw'}} alt="" /> */}
                <Carousel fade>
                    {property.images.map(({image}, index) => (
                        <Carousel.Item key={index}>
                            <Image src={selectedImage ? selectedImage : image} className='d-block w-100 rounded-xl' style={{height: '30vw'}} alt={`Image ${index + 1}`} />
                        </Carousel.Item>
                    ))}
                </Carousel>
                </Col>
                <Col lg={5} className='p-0'>
                    <Row>
                        {property.images.map(({image}, index) => (
                        <Col key={index} xl={6} lg={4} md={4} sm={4} xs={3} className='pl-0 pt-0 pr-1 pb-0'>
                            <Image src={image} onClick={() => setSelectedImage(image)} className='d-block w-100 rounded-xl mt-1 ml-1 mr-1 mb-0' style={{height: '9.6vw'}} alt={`Image ${index + 1}`} />     
                        </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default UserDisplayPropertyTop