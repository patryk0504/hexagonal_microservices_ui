import React from 'react';
import { Table } from 'react-bootstrap';

function CouriersTable({ couriers }) {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Vehicle</th>
            </tr>
            </thead>
            <tbody>
            {couriers.map((courier) => (
                <tr key={courier.id}>
                    <td>{courier.name}</td>
                    <td>{courier.email}</td>
                    <td>{courier.phone}</td>
                    <td>{courier.vehicle}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default CouriersTable;