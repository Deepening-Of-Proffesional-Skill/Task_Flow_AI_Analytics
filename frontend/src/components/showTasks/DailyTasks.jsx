import React from "react";
import PropTypes from "prop-types";
import { Card, Container, Row, Col, Badge  } from 'react-bootstrap';
import NoTasks from "./NoTasks";
import TaskCard from "./TaskCard";

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

    //priority sorting
    const getPriorityBadge = (priority) => {
        if (priority === 3) return { variant: "danger", label: "High" };
        if (priority === 2) return { variant: "warning", label: "Medium" };
        if (priority === 1) return { variant: "secondary", label: "Low" };
        return { variant: "dark", label: "None" };
    };

  return (
    <Container className="tasks-wrapper">
        {sortedTasks.length > 0 ? (            
            Object.keys(groupedByDate).map((date) => (
                <Card key={date} className="mb-4">
                    <Card.Body>
                        <div className="due-date">
                            <i className="bi bi-calendar-event me-2"></i>                           
                            {date}
                        </div>
                        <div className='d-flex flex-column gap-3'>
                            {groupedByDate[date].map((task) => (
                                <TaskCard key={task.id} task={task} />
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