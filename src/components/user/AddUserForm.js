import React, {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

export default function AddUserForm({show, onClose, onSubmit}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [vehicle, setVehicle] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({name, email, phone, vehicle});
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Courier</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
