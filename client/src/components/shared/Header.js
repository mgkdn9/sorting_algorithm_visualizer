import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

const authenticatedOptions = (
  <>
    <Nav.Link as={Link} to="my-scores" style={linkStyle}>
      My Scores
    </Nav.Link>
    <Nav.Link as={Link} to="change-password" style={linkStyle}>
      Change Password
    </Nav.Link>
    <Nav.Link as={Link} to="sign-out" style={linkStyle}>
      Log out
    </Nav.Link>
  </>
);

const unauthenticatedOptions = (
  <>
    <Nav.Link as={Link} to="sign-up" style={linkStyle}>
      Sign Up
    </Nav.Link>
    <Nav.Link as={Link} to="sign-in" style={linkStyle}>
      Log In
    </Nav.Link>
  </>
);

const Header = ({ user }) => (
  <Navbar
    bg="secondary"
    fixed="top"
    variant="dark"
    expand="sm"
    collapseOnSelect
  >
    <Navbar.Brand as={Link} to="/" style={linkStyle}>
      AlgoViews
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/algo-test" style={linkStyle}>
          Test Your Knowledge
        </Nav.Link>
        {user && (
          <span className="navbar-text mr-2">Welcome, {user.email}</span>
        )}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
