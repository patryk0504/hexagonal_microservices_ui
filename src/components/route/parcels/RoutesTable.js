import React from 'react';
import { Table } from 'react-bootstrap';
import ParcelListModal from "./ParcelListModal";

function RoutesTable({ deliveries }) {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Delivery</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Courier</th>
                <th>Parcels order</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {console.log(deliveries)}
            <tr key={deliveries.id}>
                <td>{deliveries.id}</td>
                <td>{deliveries.status}</td>
                <td>{deliveries.notes}</td>
                <td>{deliveries.courierId}</td>
                <td>
                {deliveries.parcelIds.map((parcelId) => (
                    parcelId + ", "
                ))}
                </td>
                <td><ParcelListModal courierId={deliveries.courierId}/></td>
            </tr>
            </tbody>
        </Table>
    );
}

export default RoutesTable;