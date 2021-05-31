import React from "react";
import "./nav.css";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./assets/logo.png";

function Navigation() {
    return (
        <Navbar sticky="top" expand="md">
            <Navbar.Brand>
                <div id="logoContainer">
                    <img id="logoImg" src={logo} alt="logo" />
                    <h1 id="logoAppName">My Budget Pal</h1>
                </div>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav>
                    <Nav.Link className="nav-link" aria-current="page" href="/">
                        Home
            </Nav.Link>
                    <Nav.Link className="nav-link" href="/profile">
                        Profile
            </Nav.Link>
                    <Nav.Link className="nav-link" href="/expenses">
                        Expenses
            </Nav.Link>
                    <Nav.Link className="nav-link" href="/savings">
                        Savings
            </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;