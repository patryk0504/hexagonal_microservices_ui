import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export default function MapContainer(props) {
    const [center, setCenter] = useState({ lat: null, lng: null });


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                const geocoder = new props.google.maps.Geocoder();
                geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
                    if (status === 'OK') {
                        const city = results.find(result => result.types.includes('locality'));
                        if (city) {
                            setCenter({ lat: city.geometry.location.lat(), lng: city.geometry.location.lng() });
                        }
                    }
                });
            });
        }
    }, [props.google.maps.Geocoder]);


    return (
        <div style={{ height: '500px', width: '100%' }}>
            <Map
                google={props.google}
                zoom={props.zoom}
                center={center}
            >
                {props.markers.map((marker, index) => (
                    <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
                ))}
            </Map>
        </div>
    );
}

// export default GoogleApiWrapper({
//     apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`
// })(MapContainer);
