import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const GoogleMapComponent = () => {
    return (
        <LoadScript
            googleMapsApiKey = "AIzaSyAkN31Hu4r9t3fPg7sssX3ymDb81ViB_2A"
            // googleMapsApiKey = {process.env.REACT_APP_GOOGLE}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default GoogleMapComponent