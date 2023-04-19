import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function AssignParcelModal({ courierId }) {
  const [parcels, setParcels] = useState([]);
  const [selectedParcelIds, setSelectedParcelIds] = useState([]);
  const [assignedParcelIds, setAssignedParcelIds] = useState([]);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/parcels/unsigned`);
        setParcels(response.data);
      } catch (error) {
        console.log(error);
        // handle error (e.g. display error message)
      }
    };

    fetchParcels();

    const fetchAssignedParcels = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/couriers/${courierId}/parcels`);
        setAssignedParcelIds(response.data.map((parcel) => parcel.id));
      } catch (error) {
        console.log(error);
        // handle error (e.g. display error message)
      }
    };

    fetchAssignedParcels();

  }, []);

  const handleCheckboxChange = (event) => {
    const parcelId = parseInt(event.target.value);
    if (assignedParcelIds.includes(parcelId)) {
      return; // parcel is already assigned to the courier
    }
    if (event.target.checked) {
      setSelectedParcelIds([...selectedParcelIds, parcelId]);
    } else {
      setSelectedParcelIds(selectedParcelIds.filter((id) => id !== parcelId));
    }
  };

  const handleAssignButtonClick = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/couriers/${courierId}/parcel`, {
        selectedParcelIds,
      });
      // optionally show a success message
      handleClose();
    } catch (error) {
      console.log(error);
      // handle error (e.g. display error message)
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Assign Parcel
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Assign Parcels</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {parcels.map((parcel) => (
                <Form.Check
                    key={parcel.id}
                    type="checkbox"
                    id={`parcel-${parcel.id}`}
                    label={`${parcel.name} (${parcel.weight} kg)`}
                    value={parcel.id}
                    checked={assignedParcelIds.includes(parcel.id) || selectedParcelIds.includes(parcel.id)}
                    disabled={assignedParcelIds.includes(parcel.id)}
                    onChange={handleCheckboxChange}
                />
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAssignButtonClick}>
              Assign
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  );
}

export default AssignParcelModal;