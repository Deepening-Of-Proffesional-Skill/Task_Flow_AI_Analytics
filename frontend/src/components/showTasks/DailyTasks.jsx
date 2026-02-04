import React from "react";
import PropTypes from "prop-types";
import { Card, Container  } from 'react-bootstrap';
import NoTasks from "./NoTasks";

export default function DailyTasks({ sortedTasks }) {
    const groupedByDate = sortedTasks.reduce((groups, task) => {
        const date = task.deadline
            ? new Date(task.deadline).toISOString().split('T')[0] 
            : 'No Due Date';

        if (!groups[date]) {
            groups[date] = [];
        }

        groups[date].push(task);
        return groups;
    }, {});

  return (
    <Container className="tasks-wrapper">
        {sortedTasks.length > 0 ? (            
            Object.keys(groupedByDate).map((date) => (
                <Card key={date} className="mb-4">
                    <Card.Body>
                        <div className="due-date">
                            {date}
                        </div>
                        <div className='d-flex flex-column gap-3'>
                            {groupedByDate[date].map((task) => (
                                <div key={task.id} className="task-item border rounded">
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
            ))
        ) : (
            <NoTasks />
        )}
    </Container>
  )
}

DailyTasks.propTypes = {
  sortedTasks: PropTypes.array.isRequired,
};