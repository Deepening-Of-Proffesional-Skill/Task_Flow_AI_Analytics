import React from 'react'
import { Col, Container, Dropdown, DropdownItem, Form, InputGroup, Row, Card, Button} from 'react-bootstrap'
import { useState } from 'react';
import '../../css/SearchTasks.css';
import { searchTasksService } from './searchedTasksService';

export default function SearchTasks() {
    const [searchTask, setSearchTask] = useState('');
    const [selectedDueDate, setSelectedDueDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedPriority, setSelectedPriority] = useState("All");
   // const [error, setError] = useState(null);
   const [searchResults, setSearchResults] = useState([]);  

    const categories = ['All','Work', 'Study', 'Personal', 'Shopping', 'Others'];
    const statuses = ['All', 'Pending', 'In Progress', 'Completed'];
    const priorities = ['All', 'Low', 'Medium', 'High'];

    const isDisabled =
        !searchTask &&
        !selectedDueDate &&
        selectedCategory === "All" &&
        selectedStatus === "All" &&
        selectedPriority === "All";

    const handleSearch = async () => {
        try {
            const filters = {
                title: searchTask,
                deadline: selectedDueDate,
                status: selectedStatus === "All" ? null : 
                    selectedStatus === "Pending" ? "pending" :
                    selectedStatus === "In Progress" ? "in_progress" :"completed",
                priority: selectedPriority === "All" ? null : 
                    selectedPriority === "Low" ? 1 : 
                    selectedPriority === "Medium" ? 2 : 3,
                category: selectedCategory === "All" ? null : selectedCategory.toLowerCase()
            };
            const tasks = await searchTasksService(filters);
            setSearchResults(tasks);
            console.log("Search Results:", tasks);

            //console.log("Filters applied:", filters); // use filters to remove lint warning
        } catch (error) {
            //setError('Error searching tasks. Please try again.');
            console.error('Error searching tasks:', error);
        } finally {
            setSearchTask('');
            setSelectedDueDate("");
            setSelectedCategory("All");
            setSelectedStatus("All");
            setSelectedPriority("All");
        }
    };

  return (
    <Container className="tasks-wrapper py-4">
        <Card className="search-tasks-filter-card">
            <Card.Body className="p-4 p-md-5">
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
                <Row className="g-4 mb-5 justify-content-center">
                    <Col xs={12} md={4} >
                        <Dropdown className="search-tasks-dropdown">
                            <Dropdown.Toggle variant="outline-secondary" className="search-tasks-toggle" id="category-dropdown">
                                Filter by Category : {selectedCategory}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="search-tasks-dropdown-menu">
                                {categories.map((cat) => (
                                    <DropdownItem 
                                        key={cat} 
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`search-tasks-dropdown-item ${selectedCategory === cat ? 'active' : ''}`}
                                    >
                                        {cat}
                                    </DropdownItem>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={12} md={4} >
                        <Dropdown className="search-tasks-dropdown">
                            <Dropdown.Toggle variant="outline-secondary" className="search-tasks-toggle" id="status-dropdown">
                                Filter by Status : {selectedStatus}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="search-tasks-dropdown-menu">
                                {statuses.map((status) => (
                                    <DropdownItem 
                                        key ={status} 
                                        onClick={() => setSelectedStatus(status)}
                                        className={`search-tasks-dropdown-item ${selectedStatus === status ? 'active' : ''}`}
                                    >
                                        {status}
                                    </DropdownItem>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>      
                    </Col>
                    <Col xs={12} md={4} >
                        <Dropdown className="search-tasks-dropdown">
                            <Dropdown.Toggle variant="outline-secondary" className="search-tasks-toggle" id="priority-dropdown">
                                Filter by Priority : {selectedPriority}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="search-tasks-dropdown-menu">
                                {priorities.map((priority) => (
                                    <DropdownItem 
                                        key={priority} 
                                        onClick={() => setSelectedPriority(priority)}
                                        className={`search-tasks-dropdown-item ${selectedPriority === priority ? 'active' : ''}`}
                                    >
                                        {priority}
                                    </DropdownItem>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row className="g-4 mb-1 justify-content-center">
                    <Button
                        className='btn-search-filter'
                        disabled ={isDisabled}
                        onClick={handleSearch}
                    >
                        <i className="bi bi-search me-2"></i>
                        Search
                    </Button>

                </Row>
            </Card.Body>
        </Card>
        Search Tasks
    </Container>
  )
}
