import React from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt,
  FaBook,
  FaChartBar,
  FaUser,
  FaUniversity
} from "react-icons/fa";
import '../../css/Sidebar.css';
import { useEffect } from "react";

export default function Sidebar({ show, onHide }) {
  const location = useLocation();
  
  const menuItems = [
    { path: "/home", icon: <FaTachometerAlt />, label: "Home" },
    { path: "/addTasks", icon: <FaUniversity  />, label: "Add Tasks" },
    { path: "/productivityReports", icon: <FaChartBar />, label: "Reports" },
    { path: "/aiinsights", icon: <FaBook />, label: "AI Insights" },
    { path: "/profile", icon: <FaUser />, label: "Profile" },
    
  ];

  useEffect(() => {
    if (show) {
      document.body.classList.add('offcanvas-open');
    } else {
      document.body.classList.remove('offcanvas-open');
    }
    return () => document.body.classList.remove('offcanvas-open');
  }, [show]);

  return (
    <>
      {/* Mobile sidebar – only render when open */}
      <Offcanvas
        show={show}
        onHide={onHide}
        placement="start"
        className="d-md-none bg-dark text-light"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-primary">TaskFlow AI</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column ">
            {menuItems.map((item) => (
              <Nav.Link
                as={Link}
                to={item.path}
                key={item.path}
                onClick={onHide}
                className={`nav-item d-flex align-items-center gap-3 py-3 px-4 text-light ${
                  location.pathname === item.path ? "active " : ""
                }`}
              >
                <span className="fs-4">{item.icon}</span>
                <span>{item.label}</span>
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      

      {/* Desktop sidebar – always rendered in desktop column */}
      <div className="d-flex flex-column h-100 text-light bg-dark">
        <Nav className="flex-column flex-grow-1 pt-3">
          {menuItems.map((item) => (
            <Nav.Link
              as={Link}
              to={item.path}
              key={item.path}
              className={`nav-item d-flex align-items-center gap-3 py-3 px-4 text-light ${
                location.pathname === item.path ? "active " : ""
              }`}
            >
              <span className="fs-4">{item.icon}</span>
              <span>{item.label}</span>
            </Nav.Link>
          ))}
        </Nav>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};