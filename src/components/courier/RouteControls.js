import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {GoogleApiWrapper} from "google-maps-react";
import SelectedAddressesList from "../route/custom/SelectedAddressesList";
import AddressRouteRequest from "../route/custom/AddressRouteRequest";

// import the MyMapModal component

function RouteControls(props) {
    const [markers, setMarkers] = useState([]);
    const [places, setPlaces] = useState([]);
    const [query, setQuery] = useState('');
    const [showModal, setShowModal] = useState(false); // add state for showing/hiding the modal

    function handleAddAddress(address) {
        props.setSelectedAddresses((selectedAddresses) => [...selectedAddresses, address]);
    }

    function handleReorderAddress(startIndex, endIndex) {
        const updatedAddresses = Array.from(props.selectedAddresses);
        const [removed] = updatedAddresses.splice(startIndex, 1);
        updatedAddresses.splice(endIndex, 0, removed);
        props.setSelectedAddresses(updatedAddresses);
    }

    function handleRemoveAddress(address) {
        // Find the index of the address in the `selectedAddresses` array
        const index = props.selectedAddresses.findIndex((a) => a.place_id === address.place_id);

        // Remove the address from the `selectedAddresses` array
        const updatedAddresses = [...props.selectedAddresses.slice(0, index), ...props.selectedAddresses.slice(index + 1)];
        props.setSelectedAddresses(updatedAddresses);

        // Remove the corresponding marker from the `markers` array
        const updatedMarkers = markers.filter((m) => m.lat !== address.geometry.location.lat() || m.lng !== address.geometry.location.lng());
        console.log(markers, updatedMarkers);
        setMarkers(updatedMarkers);
    }

    function onPlaceSelect(place) {
        if (props.selectedAddresses.length < 2) {
            const service = new props.google.maps.places.PlacesService(document.createElement('div'));
            service.getDetails({placeId: place.place_id}, (result, status) => {
                if (status === props.google.maps.places.PlacesServiceStatus.OK) {
                    console.log("add marker", result);
                    setMarkers(markers => [
                        ...markers,
                        {
                            lat: result.geometry.location.lat(),
                            lng: result.geometry.location.lng(),
                        },
                    ]);
                    setPlaces([result])
                    setQuery('');
                    handleAddAddress(result);
                }
            });
        }
    }

    function handleSearchInputChange(event) {
        setQuery(event.target.value);
    }

    function searchPlaces() {
        const service = new props.google.maps.places.AutocompleteService();
        service.getPlacePredictions({ input: query }, (predictions, status) => {
            if (status === props.google.maps.places.PlacesServiceStatus.OK) {
                setPlaces(predictions);
            } else {
                setPlaces([]);
            }
        });
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    return (
        <>
            <Form.Group>
                <Form.Control value={query} onChange={handleSearchInputChange} placeholder="Search for a place" />
                <Button variant="primary" onClick={searchPlaces}>Search</Button>
            </Form.Group>
            <div>
                {places.map(place => (
                    <div key={place.place_id} onClick={() => onPlaceSelect(place)}>
                        {place.description}
                    </div>
                ))}
            </div>

            <SelectedAddressesList
                selectedAddresses={props.selectedAddresses}
                onReorderAddress={handleReorderAddress}
                onRemoveAddress={handleRemoveAddress}
            />
        </>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(RouteControls);