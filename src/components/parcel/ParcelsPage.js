import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import ParcelsTable from './ParcelsTable';
import AddParcelForm from './AddParcelForm';
import axios from "axios";

export default function ParcelsPage() {
    const [parcels, setParcels] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    // function to fetch parcels from API
    const fetchParcels = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/parcels`);
        setParcels(response.data.content);
    };

    // fetch parcels on component mount
    useEffect(() => {
        fetchParcels();
    }, []);

    const handleAddParcel = async (parcel) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/parcels`, parcel);
            console.log(response.data);
            // optionally redirect to a success page or clear the form
            setShowAddForm(false);
            setParcels((prevParcels) => [...prevParcels, response.data]);
        } catch (error) {
            console.log(error);
            // handle error (e.g. display error message)
        }
    };

    return (
        <div>
            <Button onClick={() => setShowAddForm(true)}>Add Parcel</Button>
            <ParcelsTable parcels={parcels}/>
            <Modal show={showAddForm} onHide={() => setShowAddForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Parcel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddParcelForm onSubmit={handleAddParcel}/>
                </Modal.Body>
            </Modal>
        </div>
    );
};
