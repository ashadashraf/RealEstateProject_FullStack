import './UserPropertyListing.css';
import React, {useState, useEffect} from 'react'
import Mapbox from '../../../Components/User/Mapbox/Mapbox'
import UserPropertyCard from './UserPropertyCard';

const UserPropertyListing = () => {
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 992 && window.innerWidth <= 1399);

    useEffect(() => {
        const handleResize = () => {
        setIsWideScreen(window.innerWidth >= 992 && window.innerWidth <= 1399);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <React.Fragment>
            <div className="row w-100 m-0 listing-background">
                <div className={`col-5 col-lg-4 p-0 ${isWideScreen ? 'wide-screen-map' : ''}`}>
                    <Mapbox />
                </div>
                <div className="card-list col-7 col-lg-8 pr-4">
                    <UserPropertyCard />
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserPropertyListing;