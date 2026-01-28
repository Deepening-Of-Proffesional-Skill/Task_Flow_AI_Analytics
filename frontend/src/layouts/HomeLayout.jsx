import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/headerSidebar/Header";
import Sidebar from "../components/headerSidebar/Sidebar";
import { Outlet } from "react-router-dom";
import '../css/HomeLayout.css';

const HomeLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    };

    return (
        <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            <Header toggleSidebar={toggleSidebar} />

            <div className="flex-grow-1 d-flex overflow-hidden">
                <Container fluid className="p-0 h-100">
                    <Row className="g-0 h-100">
                        <Col 
                            md={3} 
                            lg={2} 
                            className="d-none d-md-block p-0 bg-dark border-end border-secondary"
                        >
                            <Sidebar show={showSidebar} onHide={toggleSidebar} />
                        </Col>

                        {/* Main content */}
                        <Col 
                            xs={12} 
                            md={9} 
                            lg={10} 
                            className="main-content-col d-flex flex-column"
                        >
                            <div className="flex-grow-1 overflow-auto p-3">
                                <Outlet />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default HomeLayout;