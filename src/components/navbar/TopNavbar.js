import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

export default function TopNavbar(props) {
    return (
        <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark' style={{zIndex: '900'}}>
            <Container>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className="me-auto align-items-center">
                        <Navbar.Brand as={Link} to={"/"}>Courier Management System</Navbar.Brand>
                        <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}