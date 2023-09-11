import React, {useEffect, useState} from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import axios from "axios";
import ParcelsTable from "../parcel/ParcelsTable";
import RouteControls from "./RouteControls";

export default function GenerateRouteModal({ courierId }) {
    // Fetch the list of parcels assigned to the courier from the server
    const [parcels, setParcels] = useState([]);
    const [selectedAddresses, setSelectedAddresses] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);


    useEffect(() => {
        const fetchAssignedParcels = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/couriers/${courierId}/parcels`);
                setParcels(response.data);
            } catch (error) {
                console.log(error);
                // handle error (e.g. display error message)
            }
        };

        fetchAssignedParcels();

        if (initialLoad) {
            setInitialLoad(false); // Mark initial load as completed
        }

    }, [courierId, initialLoad]);



    const generateRoute = async (status) => {
        if (selectedAddresses.length < 2) {
            alert("You must provide start and end points!");
            return;
        }
        try {
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
            const response = await axios.post(`${process.env.REACT_APP_ROUTE_API_URL}/route/courier/${courierId}`, {
                'status': status,
                'startAndEndPoints' : {
                    'startPoint' : formattedAddresses[0],
                    'endPoint' : formattedAddresses[1]
                }
            });

            alert("Successfully generated route!")
        } catch (error) {
            console.log(error);
            // handle error (e.g. display error message)
        }
    };

    const handleGenerateForCreated = () => {
        generateRoute('created');
    };

    const handleGenerateForPending = () => {
        generateRoute('pending');
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Display the list of parcels in the modal
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Generate route
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Generate route for created/pending parcels</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowX: "auto" }}>
                    <ParcelsTable parcels={parcels}/>
                    <RouteControls selectedAddresses={selectedAddresses} setSelectedAddresses={setSelectedAddresses}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleGenerateForCreated}>
                        Generate for created
                    </Button>
                    <Button variant="primary" onClick={handleGenerateForPending}>
                        Generate for pending
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
    );
}