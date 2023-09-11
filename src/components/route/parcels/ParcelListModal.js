import React, {useEffect, useState} from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import axios from "axios";
import ParcelsTable from "../../parcel/ParcelsTable";

export default function ParcelListModal({ courierId }) {
    // Fetch the list of parcels assigned to the courier from the server
    const [parcels, setParcels] = useState([]);

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

    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Display the list of parcels in the modal
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Show Parcels
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Parcels assigned to courier {courierId}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowX: "auto" }}>
                    <ParcelsTable parcels={parcels}/>
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