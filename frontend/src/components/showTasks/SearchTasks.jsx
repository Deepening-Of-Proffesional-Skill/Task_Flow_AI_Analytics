import React from 'react'
import { Col, Container, Form, InputGroup, Row} from 'react-bootstrap'
import { useState } from 'react';
import '../../css/searchTasks.css';

export default function SearchTasks() {
    const [searchTask, setSearchTask] = useState('');
    const [selectedDueDate, setSelectedDueDate] = useState("");
  return (
    <Container className="tasks-wrapper py-4">
        <Row className="g-3 mb-5 justify-content-center justify-content-center">
            <Col xs={12} md={6} lg={5}>
                <InputGroup className="search-tasks-input-group">
                    <InputGroup.Text className="search-tasks-input-icon">
                        <i className="bi bi-search"></i>
                    </InputGroup.Text>
                    <Form.Control
                        className="search-tasks-search-input"
                        type="text" 
                        placeholder="Search tasks..."
                        value={searchTask} 
                        onChange={(e) => setSearchTask(e.target.value)}
                    />
                </InputGroup>
            </Col>
            <Col xs={12} md={6} lg={5}>
                <InputGroup className="search-tasks-input-group">
                    <InputGroup.Text className="search-tasks-input-icon">
                        Due date
                    </InputGroup.Text>
                    <Form.Control
                        className="search-tasks-date-input"
                        type="date"
                        name='dueDate'
                        value={selectedDueDate}
                        onChange={(e) => setSelectedDueDate(e.target.value)}
                    />
                </InputGroup>
            </Col>
        </Row>
        SearchTasks
    </Container>
  )
}
