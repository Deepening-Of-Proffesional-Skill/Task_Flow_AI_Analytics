import React from "react";
import PropTypes from "prop-types";
import { Card, Container  } from 'react-bootstrap';

export default function DailyTasks({ sortedTasks }) {
    const groupedByDate = sortedTasks.reduce((groups, task) => {
        const date = task.dueDate;

        if (!groups[date]) {
            groups[date] = [];
        }

        groups[date].push(task);
        return groups;
    }, {});

  return (
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
  )
}
