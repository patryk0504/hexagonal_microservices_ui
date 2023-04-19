import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function AddParcelForm({ onAddParcel }) {
    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [status, setStatus] = useState("");
    const [sender, setSender] = useState(null);
    const [recipient, setRecipient] = useState(null);
    const [users, setUsers] = useState([]);
    const [senderAddresses, setSenderAddresses] = useState([]);
    const [recipientAddresses, setRecipientAddresses] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/users`
                );
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                if (sender) {
                    const response = await axios.get(
                        `${process.env.REACT_APP_API_URL}/users/${sender.id}/address`
                    );
                    setSenderAddresses(response.data);
                }
                if (recipient) {
                    const response = await axios.get(
                        `${process.env.REACT_APP_API_URL}/users/${recipient.id}/address`
                    );
                    setRecipientAddresses(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchAddresses();
    }, [sender, recipient]);

    const handleNameChange = (event) => setName(event.target.value);
    const handleWeightChange = (event) => setWeight(event.target.value);
    const handleDimensionsChange = (event) =>
        setDimensions(event.target.value);
    const handleStatusChange = (event) => setStatus(event.target.value);

    const handleUserChange = (event, role) => {
        const {value} = event.target;
        const user = users.find((user) => user.id === parseInt(value));
        if (role === "sender") {
            setSender(user);
            setSenderAddresses([]);
        } else if (role === "recipient") {
            setRecipient(user);
            setRecipientAddresses([]);
        }
    };

    const handleAddressChange = (event, role) => {
        const {value} = event.target;
        if (role === "sender") {
            const address = senderAddresses.find(
                (address) => address.id === parseInt(value)
            );
            setSender({...sender, address});
        } else if (role === "recipient") {
            const address = recipientAddresses.find(
                (address) => address.id === parseInt(value)
            );
            setRecipient({...recipient, address});
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(recipientAddresses, senderAddresses);
        const address = [
            {
                "address" : {
                    "id" : recipientAddresses[0].id
                },
                "role" : "RECIPIENT"
            },
            {
                "address" : {
                    "id" : senderAddresses[0].id
                },
                "role" : "SENDER"
            }
        ]

        const users = [
            {
                "user" : recipient.id,
                "role" : "RECIPIENT"
            },
            {
                "user" : sender.id,
                "role" : "SENDER"
            }
        ]

        const parcel = {
            name,
            weight,
            dimensions,
            status,
            address,
            users
        };
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/parcels`, parcel);
            onAddParcel(response.data);
            setName("");
            setWeight("");
            setDimensions("");
            setStatus("");
            setSender(null);
            setRecipient(null);
            setSenderAddresses([]);
            setRecipientAddresses([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formParcelName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter parcel name" value={name} onChange={handleNameChange}
                              required/>
            </Form.Group>
            <Form.Group controlId="formParcelWeight">
                <Form.Label>Weight</Form.Label>
                <Form.Control type="number" placeholder="Enter parcel weight" value={weight}
                              onChange={handleWeightChange} required/>
            </Form.Group>

            <Form.Group controlId="formParcelDimensions">
                <Form.Label>Dimensions</Form.Label>
                <Form.Control type="text" placeholder="Enter parcel dimensions" value={dimensions}
                              onChange={handleDimensionsChange} required/>
            </Form.Group>

            <Form.Group controlId="formParcelStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" value={status} onChange={handleStatusChange} required>
                    <option value="">Choose status...</option>
                    <option value="CREATED">Pending</option>
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="RETURNED">Returned</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formParcelSender">
                <Form.Label>Sender</Form.Label>
                <Form.Control as="select" onChange={(event) => handleUserChange(event, "sender")} required>
                    <option value="">Choose sender...</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            {sender && (
                <Form.Group controlId="formParcelSenderAddress">
                    <Form.Label>Sender Address</Form.Label>
                    <Form.Control as="select" onChange={(event) => handleAddressChange(event, "sender")} required>
                        <option value="">Choose sender address...</option>
                        {senderAddresses.map((address) => (
                            <option key={address.id} value={address.id}>
                                {address.street}, {address.city}, {address.state}, {address.zip}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            )}

            <Form.Group controlId="formParcelRecipient">
                <Form.Label>Recipient</Form.Label>
                <Form.Control as="select" onChange={(event) => handleUserChange(event, "recipient")} required>
                    <option value="">Choose recipient...</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            {recipient && (
                <Form.Group controlId="formParcelRecipientAddress">
                    <Form.Label>Recipient Address</Form.Label>
                    <Form.Control as="select" onChange={(event) => handleAddressChange(event, "recipient")} required>
                        <option value="">Choose recipient address...</option>
                        {recipientAddresses.map((address) => (
                            <option key={address.id} value={address.id}>
                                {address.street}, {address.city}, {address.state}, {address.zip}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            )}

            <Button variant="primary" type="submit">
                Add Parcel
            </Button>
        </Form>
    );
}