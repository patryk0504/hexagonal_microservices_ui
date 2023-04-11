import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

export default function AddParcelForm2({onAddParcel}) {
    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [status, setStatus] = useState("");
    const [address, setAddress] = useState([]);
    const [users, setUsers] = useState([{user: "Sender", role: "sender"}, {user: "Recipient", role: "recipient"}]);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const parcel = {
            name,
            weight,
            dimensions,
            status,
            address,
            users: [{user: users[0].user, role: "sender"}, {user: users[1].user, role: "recipient"}]
        };
        onAddParcel(parcel);
        setName("");
        setWeight("");
        setDimensions("");
        setStatus("");
        setAddress([]);
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
                        <Form.Control
                            type="text"
                            name="street"
                            value={address.street}
                            onChange={(event) => handleAddressChange(event, index)}
                            placeholder="Enter street"
                        />
                    </Form.Group>
                    <Form.Group controlId={`formParcelAddressCity${index}`}>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={address.city}
                            onChange={(event) => handleAddressChange(event, index)}
                            placeholder="Enter city"
                        />
                    </Form.Group>
                    <Form.Group controlId={`formParcelAddressState${index}`}>
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text"
                                      name="state"
                                      value={address.state}
                                      onChange={(event) => handleAddressChange(event, index)}
                                      placeholder="Enter state"
                        />
                    </Form.Group>
                    <Form.Group controlId={`formParcelAddressZip${index}`}>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                            type="text"
                            name="zip"
                            value={address.zip}
                            onChange={(event) => handleAddressChange(event, index)}
                            placeholder="Enter zip code"
                        />
                    </Form.Group>
                    {index !== 0 && (
                        <Button
                            variant="danger"
                            onClick={() => setAddress((address) => address.filter((a, i) => i !== index))}
                        >
                            Remove Address
                        </Button>
                    )}
                </div>
            ))}
            <Button
                variant="secondary"
                onClick={() => setAddress([...address, {street: "", city: "", state: "", zip: ""}])}
            >
                Add Address
            </Button>
            <h5>Users</h5>
            {users.map((user, index) => (
                <div key={index}>
                    <Form.Group controlId={`formParcelUser${user.role}`}>
                        <Form.Label>{user.user}</Form.Label>
                        <Form.Control type="text" value={user.user}/>
                    </Form.Group>
                </div>
            ))}
            <Button type="submit" variant="primary">
                Add Parcel
            </Button>
        </Form>

    )
};
