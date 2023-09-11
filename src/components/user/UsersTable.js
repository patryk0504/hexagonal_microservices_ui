import React from 'react';
import { Table } from 'react-bootstrap';

function UsersTable({ users }) {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Parcels</th>
            </tr>
            </thead>
            <tbody>
            {console.log(users)}
            {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        {user.parcels && user.parcels.map((parcel) => (
                                <div key={parcel.id}>
                                    {`${parcel.name}`}
                                </div>
                            
                        ))}
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default UsersTable;