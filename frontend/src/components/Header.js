import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

export default function Header() {
  return (
    <header>
    <Navbar bg="light" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">Eat&Fit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/account">My account</Nav.Link>
            <Nav.Link href="/menu">Build a menu</Nav.Link>
            <Nav.Link href="/grocery">Grocery list</Nav.Link>
            <Nav.Link href="/training">Training program</Nav.Link>
            <Nav.Link href="/gyms">Gym maps</Nav.Link>
            <Nav.Link href="/articles">Articles</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}
