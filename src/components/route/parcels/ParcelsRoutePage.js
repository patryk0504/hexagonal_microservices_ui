import React, {useEffect, useState} from 'react';
import axios from "axios";
import CouriersTable from "./CouriersTable";

export default function ParcelsRoutePage() {
    const [couriers, setCouriers] = useState([]);

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


    return (
        <div>
            <CouriersTable couriers={couriers} />
        </div>
    );
};
