import React from 'react';
import { Button, Form } from 'react-bootstrap';

export default function AddressInput({ address, onAddressChange, onRemoveAddress }) {
    const handleAddressFieldChange = (event, field) => {
        const { value } = event.target;
        onAddressChange({ ...address, address: { ...address.address, [field]: value } });
    };

    return (
        <div>
            <Form.Group controlId="formAddressStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter street"
                    value={address.street}
                    onChange={(event) => handleAddressFieldChange(event, 'street')}
                />
            </Form.Group>
            <Form.Group controlId="formAddressCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter city"
                    value={address.city}
                    onChange={(event) => handleAddressFieldChange(event, 'city')}
                />
            </Form.Group>
            <Form.Group controlId="formAddressState">
                <Form.Label>State</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter state"
                    value={address.state}
                    onChange={(event) => handleAddressFieldChange(event, 'state')}
                />
            </Form.Group>
            <Form.Group controlId="formAddressPostalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter postal code"
                    value={address.postalCode}
                    onChange={(event) => handleAddressFieldChange(event, 'postalCode')}
                />
            </Form.Group>
            <Form.Group controlId="formAddressCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter country"
                    value={address.country}
                    onChange={(event) => handleAddressFieldChange(event, 'country')}
                />
            </Form.Group>
            <Button variant="danger" onClick={onRemoveAddress}>
                Remove address
            </Button>
        </div>
    );
}
