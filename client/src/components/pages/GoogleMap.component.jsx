import React, { useEffect, useState, useCallback } from 'react'
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const GoogleMapComponent = ({informOfMarker}) => {
    const [clickedLatLng, setClickedLatLng] = useState(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAkN31Hu4r9t3fPg7sssX3ymDb81ViB_2A"
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

    useEffect(() => {
        console.log(clickedLatLng);
    }, [clickedLatLng])

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
            <>{clickedLatLng ? <Marker position={clickedLatLng} /> : <></>}</>
        </GoogleMap>
    ) : <></>
}

export default GoogleMapComponent