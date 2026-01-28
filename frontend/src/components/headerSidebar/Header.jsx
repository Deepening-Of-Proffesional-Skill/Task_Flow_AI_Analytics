import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaUserCircle, FaBars, FaSignOutAlt} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import '../../css/Header.css';

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth token / state / redirect
    navigate("/");
  };

  return (
    <Navbar variant="dark" expand="md" className="main-navbar">
      <Container fluid>
        <Button
          variant="link"
          className="d-md-none text-light me-3 p-2"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaBars size={22}/>
        </Button>
        
        <Navbar.Brand 
          onClick={() => navigate("/home")} 
          className="fw-bold fs-4 me-auto"
          style={{ cursor: 'pointer' }}
        >
          TaskFlow AI
        </Navbar.Brand>
        
        <Nav className="ms-auto align-items-center d-flex gap-3 gap-md-4">
          <Button
            variant="link"
            className="text-light p-0"
            onClick={() => navigate("/profile")}
          >
            <FaUserCircle size={28} />
          </Button>

          <Button
            variant="link"
            className="text-light p-0 logout-btn"
            onClick={handleLogout}
            title="Log out"
          >
            <FaSignOutAlt size={24} />
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};