import React, {useEffect, useState} from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import axios from "axios";
import ParcelsTable from "../../parcel/ParcelsTable";
import RoutesTable from "./RoutesTable";

export default function RouteListModal({ courierId }) {
    // Fetch the list of parcels assigned to the courier from the server
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/deliveries/courier/${courierId}`);
                setDeliveries(response.data);
            } catch (error) {
                console.log(error);
                // handle error (e.g. display error message)
            }
        };

        fetchDeliveries();

    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Display the list of parcels in the modal
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Show Deliveries
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Parcels assigned to courier {courierId}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowX: "auto" }}>
                    <RoutesTable deliveries={deliveries}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
    );
}