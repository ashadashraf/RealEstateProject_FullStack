import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPropertyDetail } from '../../../Redux/userProperty/propertyDetailSlice';
import UserEditHouseDetails from './UserPropertyTypeEdit/UserEditHouseDetails';

const UserEditProperty = ({propertyId}) => {
    const[propertyType, setPropertyType] = useState();
    const dispatch = useDispatch();
    const properties = useSelector(state => state.showPropertiesList.showPropertiesList);
    useEffect(() => {
        properties.map((property) => {
            Object.keys(property).forEach((key) => {
                const value = property[key];
                // console.log(`${key}: ${value}`);
                if (key === 'id' && String(value) === propertyId) {
                    dispatch(addPropertyDetail({
                        showPropertyDetail: property
                    }));
                    setPropertyType(property.property_type);
                }
            });
        })
    })
    return (
        <div>
            {propertyType === 'house' && (
                <UserEditHouseDetails />
            )}
            {propertyType === 'complex' && (
                <UserEditHouseDetails />
            )}
            {propertyType === 'apartment' && (
                <UserEditHouseDetails />
            )}
            {propertyType === 'land' && (
                <UserEditHouseDetails />
            )}
        </div>
    )
}

export default UserEditProperty