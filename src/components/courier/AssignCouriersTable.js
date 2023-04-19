import React, {useState} from 'react';
import {Table} from 'react-bootstrap';
import AssignParcelModal from "./AssignParcelModal";
import ParcelListModal from "./ParcelListModal";

function CouriersTable({couriers}) {


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
            {couriers.map((courier) => (
                <tr key={courier.id}>
                    <td>{courier.name}</td>
                    <td>{courier.email}</td>
                    <td>{courier.phone}</td>
                    <td>{courier.vehicle}</td>
                    <td>
                        <AssignParcelModal courierId={courier.id}/>
                        <ParcelListModal courierId={courier.id}/>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default CouriersTable;