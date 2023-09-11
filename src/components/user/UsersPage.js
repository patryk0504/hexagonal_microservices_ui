import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import UsersTable from "./UsersTable";
import AddUserForm from "./AddUserForm";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [showAddUserForm, setShowAddUserForm] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
                setUsers(response.data);
            } catch (error) {
                console.log(error);
                // handle error (e.g. display error message)
            }
        };

        fetchUsers();
    }, []);

    const handleAddUser = () => {
        setShowAddUserForm(true);
    };

    const handleAddUserFormClose = () => {
        setShowAddUserForm(false);
    };

    const handleAddUserFormSubmit = async (newUser) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, newUser);
            console.log(response.data);
            // optionally redirect to a success page or clear the form
            setShowAddUserForm(false);
            setUsers((prevUsers) => [...prevUsers, response.data]);
        } catch (error) {
            console.log(error);
            // handle error (e.g. display error message)
        }
    };

    return (
        <>
            <UsersTable users={users} />
            <Button onClick={handleAddUser}>Add User</Button>
            <AddUserForm
                show={showAddUserForm}
                onClose={handleAddUserFormClose}
                onSubmit={handleAddUserFormSubmit}
            />
        </>
    );
}

export default UsersPage;
