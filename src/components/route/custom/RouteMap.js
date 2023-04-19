import React, { useState, useEffect } from "react";
import {Map, GoogleApiWrapper, Polyline, Marker} from "google-maps-react";

function RouteMap({ google, addressRouteList, markers }) {
    const [route, setRoute] = useState([]);

    const [center, setCenter] = useState({ lat: null, lng: null });


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                const geocoder = new google.maps.Geocoder();
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
    }, [google]);

    useEffect(() => {
        if (addressRouteList.length > 1) {
            const waypoints = addressRouteList.map((address) => {
                return { location: address.simpleAddress };
            });

            const directionsService = new google.maps.DirectionsService();
            const origin = waypoints.shift().location;
            const destination = waypoints.pop().location;

            const request = {
                origin,
                destination,
                waypoints,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING,
            };

            directionsService.route(request, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setRoute(result.routes[0].overview_path);
                }
            });
        }
    }, [google, addressRouteList]);

    const mapStyles = {
        width: "60%",
        height: "500px",
    };

    return (
        <div style={{ height: '500px', width: '100%' }}>
        <Map google={google} zoom={12} style={mapStyles} center={center}>
            <Polyline
                path={route}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={2}
            />
            {markers.map((marker, index) => (
                <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
            ))}
        </Map>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(RouteMap);