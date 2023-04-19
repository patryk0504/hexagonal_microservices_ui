import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AssignParcelModal from './AssignParcelModal';
import AssignCouriersTable from "./AssignCouriersTable";

export default function AssignCourierPage() {
    const [couriers, setCouriers] = useState([]);

    useEffect(() => {
        const fetchCouriers = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/couriers`
                );
                setCouriers(response.data.content);
            } catch (error) {
                console.log(error);
// handle error (e.g. display error message)
            }
        };
        fetchCouriers();
    }, []);

    return (
        <>
            <AssignCouriersTable couriers={couriers}/>
        </>
    );
}