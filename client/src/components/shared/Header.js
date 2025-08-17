import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = ({ user, onLogoClick }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);
  const closeNavbar = () => setExpanded(false);

  const handleLogoClick = () => {
    closeNavbar(); // collapse menu
    onLogoClick(); // reset loading / clear user
  };

  const linkStyle = { color: "white" };

  const authLinks = (
    <>
      <Nav.Link
        as={Link}
        to="/my-scores"
        style={linkStyle}
        onClick={closeNavbar}
      >
        My Scores
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/change-password"
        style={linkStyle}
        onClick={closeNavbar}
      >
        Change Password
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/sign-out"
        style={linkStyle}
        onClick={closeNavbar}
      >
        Log out
      </Nav.Link>
    </>
  );

  const guestLinks = (
    <>
      <Nav.Link as={Link} to="/sign-up" style={linkStyle} onClick={closeNavbar}>
        Sign Up
      </Nav.Link>
      <Nav.Link as={Link} to="/sign-in" style={linkStyle} onClick={closeNavbar}>
        Log In
      </Nav.Link>
    </>
  );

  return (
    <Navbar
      bg="secondary"
      fixed="top"
      variant="dark"
      expand="sm"
      expanded={expanded}
    >
      <Navbar.Brand
        as={Link}
        to="/"
        style={{ ...linkStyle, paddingLeft: "10px" }}
        onClick={handleLogoClick}
      >
        AlgoViews
      </Navbar.Brand>

      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={toggleExpanded}
      />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          <Nav.Link
            as={Link}
            to="/algo-test"
            style={linkStyle}
            onClick={closeNavbar}
          >
            Test Your Knowledge
          </Nav.Link>
          {user && (
            <span className="navbar-text mr-2">Welcome, {user.email}</span>
          )}
          {user ? authLinks : guestLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
