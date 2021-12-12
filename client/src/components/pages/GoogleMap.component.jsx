import React, { useState, useCallback } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const GoogleMapComponent = ({informOfMarker}) => {
    const [clickedLatLng, setClickedLatLng] = useState(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE
    })
    const [map, setMap] = useState(null)
    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])
    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{
                width: '100%',
                height: '400px'
            }}
            center={{
                lat: 31.889494586355774,
                lng: 35.01755110503907
            }}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={e => {
                setClickedLatLng(e.latLng.toJSON())
                informOfMarker(e.latLng.toJSON())
                map.panTo(e.latLng.toJSON())
            }}
        >
            <>
                {clickedLatLng ? <Marker position={clickedLatLng} /> : <></>}
            </>
        </GoogleMap>
    ) : <></>
}

export default GoogleMapComponent