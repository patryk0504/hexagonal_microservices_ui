import React, {useEffect, useState} from "react";
import {Form, Button} from "react-bootstrap";
import axios from "axios";

export default function AddParcelForm ({onAddParcel}) {
    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [status, setStatus] = useState("");
    const [address, setAddress] = useState([]);
    const [users, setUsers] = useState([]);
    const [sender, setSender] = useState(null);
    const [recipient, setRecipient] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    const handleNameChange = (event) => setName(event.target.value);
    const handleWeightChange = (event) => setWeight(event.target.value);
    const handleDimensionsChange = (event) => setDimensions(event.target.value);
    const handleStatusChange = (event) => setStatus(event.target.value);

    const handleAddressChange = (event, index) => {
        const {name, value} = event.target;
        setAddress((address) =>
            address.map((address, i) =>
                i === index ? {...address, [name]: value} : address
            )
        );
    };

    const handleUserChange = (event, role) => {
        const { value } = event.target;
        const user = users.find((user) => user.id === parseInt(value));
        if (role === "sender") {
            setSender(user);
        } else if (role === "recipient") {
            setRecipient(user);
        }
    };

    //TODO: verify post body
    //TODO: same as user, address must be recipient and sender provided from user addresses api
    const handleSubmit = async (event) => {
        event.preventDefault();
        const parcel = {
            name,
            weight,
            dimensions,
            status,
            address,
            sender,
            recipient,
        };
        try {
            const response = await axios.post("/api/parcels", parcel);
            onAddParcel(response.data);
            setName("");
            setWeight("");
            setDimensions("");
            setStatus("");
            setAddress([]);
            setSender(null);
            setRecipient(null);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formParcelName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter name"
                />
            </Form.Group>
            <Form.Group controlId="formParcelWeight">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                    type="text"
                    value={weight}
                    onChange={handleWeightChange}
                    placeholder="Enter weight"
                />
            </Form.Group>
            <Form.Group controlId="formParcelDimensions">
                <Form.Label>Dimensions</Form.Label>
                <Form.Control
                    type="text"
                    value={dimensions}
                    onChange={handleDimensionsChange}
                    placeholder="Enter dimensions"
                />
            </Form.Group>
            <Form.Group controlId="formParcelStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                    type="text"
                    value={status}
                    onChange={handleStatusChange}
                    placeholder="Enter status"
                />
            </Form.Group>
            <h5>Address</h5>
            {address.map((address, index) => (
                <div key={index}>
                    <Form.Group controlId={`formParcelAddressStreet${index}`}>
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" name="street" value={address.street}
                                      onChange={(event) => handleAddressChange(event, index)}
                                      placeholder="Enter street"/>
                    </Form.Group>
                    <Form.Group
                        controlId={`formParcelAddressCity${index}`}> <Form.Label>City</Form.Label> <Form.Control
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={(event) => handleAddressChange(event, index)}
                        placeholder="Enter city"/>
                    </Form.Group> <Form.Group controlId={`formParcelAddressZip${index}`}>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                        type="text"
                        name="zip"
                        value={address.zip}
                        onChange={(event) => handleAddressChange(event, index)}
                        placeholder="Enter zip"
                    />
                </Form.Group>
                </div>
            ))}
            <Button variant="secondary" onClick={() => setAddress([...address, {}])}>
                Add Address
            </Button>
            <h5>Users</h5>
            <Form.Group controlId="formParcelSender">
                <Form.Label>Select Sender</Form.Label>
                <Form.Control as="select" onChange={(event) => handleUserChange(event, "sender")}>
                    <option value="">Select a sender</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formParcelRecipient">
                <Form.Label>Select Recipient</Form.Label>
                <Form.Control as="select" onChange={(event) => handleUserChange(event, "recipient")}>
                    <option value="">Select a recipient</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Parcel
            </Button>
        </Form>
    );
};