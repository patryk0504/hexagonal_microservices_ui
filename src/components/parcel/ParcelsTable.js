import React from "react";
import { Table } from 'react-bootstrap';

export default function ParcelsTable({ parcels }) {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Weight</th>
                <th>Dimensions</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {parcels.map((parcel) => (
                <tr key={parcel.id}>
                    <td>{parcel.id}</td>
                    <td>{parcel.name}</td>
                    <td>{parcel.weight}</td>
                    <td>{parcel.dimensions}</td>
                    <td>{parcel.status}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}
