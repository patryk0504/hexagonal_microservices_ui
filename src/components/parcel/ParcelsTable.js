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
                <th>Sender Address</th>
                <th>Recipient Address</th>
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
                    <td>
                        {parcel.address.map((address) => (
                            address.role === "SENDER" && (
                                <div key={address.id}>
                                    {`${address.address.street}, ${address.address.city}, ${address.address.state}, ${address.address.postalCode}, ${address.address.country}`}
                                </div>
                            )
                        ))}
                    </td>
                    <td>
                        {parcel.address.map((address) => (
                            address.role === "RECIPIENT" && (
                                <div key={address.id}>
                                    {`${address.address.street}, ${address.address.city}, ${address.address.state}, ${address.address.postalCode}, ${address.address.country}`}
                                </div>
                            )
                        ))}
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}
