import React from 'react';
import { Table } from 'react-bootstrap';
import ParcelListModal from "./ParcelListModal";
import GenerateRouteModal from "./GenerateRouteModal";

function CouriersTable({ couriers }) {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Vehicle</th>
                <th>Shift Start</th>
                <th>Shift End</th>
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
                        {courier.shiftAddress.map((address) => (
                            address.role === "START" && (
                                <div key={address.id}>
                                    {`${address.shiftAddress.street}, ${address.shiftAddress.city}, ${address.shiftAddress.state}, ${address.shiftAddress.postalCode}, ${address.shiftAddress.country}`}
                                </div>
                            )
                        ))}
                    </td>
                    <td>
                        {courier.shiftAddress.map((address) => (
                            address.role === "END" && (
                                <div key={address.id}>
                                    {`${address.shiftAddress.street}, ${address.shiftAddress.city}, ${address.shiftAddress.state}, ${address.shiftAddress.postalCode}, ${address.shiftAddress.country}`}
                                </div>
                            )
                        ))}
                    </td>
                    <td><ParcelListModal courierId={courier.id}/><GenerateRouteModal  courierId={courier.id} /></td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default CouriersTable;