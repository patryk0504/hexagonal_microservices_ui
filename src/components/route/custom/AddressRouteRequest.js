import React, { useState } from "react";
import axios from "axios";
import { Button, Form, ListGroup } from "react-bootstrap";
import RouteMap from "./RouteMap";

export default function AddressRouteRequest({ selectedAddresses, markers }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addressRouteList, setAddressRouteList] = useState([]);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setIsLoading(true);
            setValidated(true);
            const formattedAddresses = selectedAddresses.map((address) => {
                const street =
                    address.address_components[1]?.long_name +
                    " " +
                    address.address_components[0]?.long_name;
                const city = address.address_components[3]?.long_name;
                const state = address.address_components[5]?.long_name;
                const postalCode = address.address_components[7]?.long_name;
                const country = address.address_components[6]?.long_name;
                const simpleAddress = address.formatted_address;
                const geoAddress = {
                    latitude: address.geometry.location.lat(),
                    longitude: address.geometry.location.lng(),
                };
                return {
                    street,
                    city,
                    state,
                    postalCode,
                    country,
                    simpleAddress,
                    geoAddress,
                };
            });
            axios
                .post(`${process.env.REACT_APP_ROUTE_API_URL}/route`, {
                    addressRoute: formattedAddresses,
                })
                .then((response) => {
                    console.log("Route Success", response);
                    setAddressRouteList(response.data.addressRoute);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log("Route Error", error);
                    setError(error);
                    setIsLoading(false);
                });
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="selectedAddresses">
                    <Form.Control.Feedback type="invalid">
                        Please select at least 3 addresses.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={selectedAddresses && selectedAddresses.length < 3}>
                    Submit
                </Button>
            </Form>
            <RouteMap addressRouteList={addressRouteList} markers={markers}/>
            <ListGroup>
                {addressRouteList &&
                    addressRouteList.map((address) => (
                        <ListGroup.Item key={address.simpleAddress}>
                            {address.simpleAddress}
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </div>
    );
}
