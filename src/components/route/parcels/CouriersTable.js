import React from 'react';
import { Table } from 'react-bootstrap';
import ParcelListModal from "./ParcelListModal";
import RouteListModal from "./RouteListModal";

function CouriersTable({ couriers }) {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Vehicle</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {console.log(couriers)}
            {couriers.map((courier) => (
                <tr key={courier.id}>
                    <td>{courier.name}</td>
                    <td>{courier.email}</td>
                    <td>{courier.phone}</td>
                    <td>{courier.vehicle}</td>
                    <td><ParcelListModal courierId={courier.id}/><RouteListModal courierId={courier.id}/></td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default CouriersTable;