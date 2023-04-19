import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function SelectedAddressesList({ selectedAddresses, onRemoveAddress, onReorderAddress }) {
    function handleDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const startIndex = result.source.index;
        const endIndex = result.destination.index;

        onReorderAddress(startIndex, endIndex);
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="selected-addresses">
                {(provided) => (
                    <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                        {selectedAddresses && selectedAddresses.map((address, index) => (
                            <Draggable key={address.place_id} draggableId={address.place_id} index={index}>
                                {(provided) => (
                                    <ListGroup.Item
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        {address.name}
                                        <Button variant="danger" size="sm" onClick={() => onRemoveAddress(address)}>
                                            Remove
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ListGroup>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default SelectedAddressesList;
