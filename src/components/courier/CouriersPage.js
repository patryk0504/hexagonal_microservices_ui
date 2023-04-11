import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import CouriersTable from './CouriersTable';
import AddCourierForm from './AddCourierForm';

function CouriersPage() {
    const [couriers, setCouriers] = useState([]);
    const [showAddCourierForm, setShowAddCourierForm] = useState(false);

    useEffect(() => {
        const fetchCouriers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/couriers`);
                setCouriers(response.data.content);
            } catch (error) {
                console.log(error);
                // handle error (e.g. display error message)
            }
        };

        fetchCouriers();
    }, []);

    const handleAddCourier = () => {
        setShowAddCourierForm(true);
    };

    const handleAddCourierFormClose = () => {
        setShowAddCourierForm(false);
    };

    const handleAddCourierFormSubmit = async (newCourier) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/couriers`, newCourier);
            console.log(response.data);
            // optionally redirect to a success page or clear the form
            setShowAddCourierForm(false);
            setCouriers((prevCouriers) => [...prevCouriers, response.data]);
        } catch (error) {
            console.log(error);
            // handle error (e.g. display error message)
        }
    };

    return (
        <>
            <CouriersTable couriers={couriers} />
            <Button onClick={handleAddCourier}>Add Courier</Button>
            <AddCourierForm
                show={showAddCourierForm}
                onClose={handleAddCourierFormClose}
                onSubmit={handleAddCourierFormSubmit}
            />
        </>
    );
}

export default CouriersPage;
