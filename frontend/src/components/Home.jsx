import React from 'react'
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/esm/Card';
import '../css/Home.css';

export default function Home() {
    const tasks = [
        {
            id: 1,
            title: "Design Landing Page",
            description: "Create a responsive landing page for the new product.",
            status: "In Progress",
            dueDate: "2026-01-27"
        },
        {
            id: 2,
            title: "Develop API Endpoints",
            description: "Build RESTful API endpoints for user authentication.",
            status: "Not Started",
            dueDate: "2026-02-05"
        },
        {
            id: 3,
            title: "Set Up Database",
            description: "Configure the PostgreSQL database for the application.",
            status: "Completed",
            dueDate: "2026-01-28"
        }
    ];
    tasks.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className='py-4'>
        <h1>Task List</h1>
        <Container>
            {tasks.map((task) => (
                <Card key={task.id} className="mb-3">
                    <Card.Body>
                        <div className="due-date">
                            {task.dueDate}
                        </div>
                        <div>
                            <Card.Title className="mb-1">
                                {task.title}
                            </Card.Title>
                            
                            <Card.Subtitle className="mb-2">
                                <span className="title">{task.title}</span>
                            </Card.Subtitle>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    </div>
  )
}
