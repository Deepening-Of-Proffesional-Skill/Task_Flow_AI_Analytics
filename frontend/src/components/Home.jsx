import React from 'react'
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/esm/Card';
import '../css/home.css';

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
        },
        {
            id: 4,
            title: "Implement User Dashboard",
            description: "Create a user dashboard to display account information and activity.",
            status: "In Progress",
            dueDate: "2026-01-28"
        },
        {
            id: 5,
            title: "Write Unit Tests",
            description: "Develop unit tests for the API endpoints and database interactions.",
            status: "Not Started",
            dueDate: "2026-02-05"
        }
    ];
    
    const sortedTasks = [...tasks].sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );

    const groupedByDate = sortedTasks.reduce((groups, task) => {
        const date = task.dueDate;

        if (!groups[date]) {
            groups[date] = [];
        }

        groups[date].push(task);
        return groups;
    }, {});

  return (
    <div className='py-4'>
        <h1>Task List</h1>
        <Container>
            {Object.keys(groupedByDate).map((date) => (
                <Card key={date} className="mb-4">
                    <Card.Body>
                        <div className="due-date">
                            {date}
                        </div>
                        <div className='d-flex flex-column gap-2'>
                            {groupedByDate[date].map((task) => (
                                <div key={task.id} className="task-item p-2 border rounded">
                                    <Card.Title className="mb-1">
                                        {task.title}
                                    </Card.Title>
                            
                                    <Card.Subtitle className="d-flex align-items-center gap-2">
                                        <span className="title">{task.status}</span>
                                    </Card.Subtitle>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    </div>
  )
}
