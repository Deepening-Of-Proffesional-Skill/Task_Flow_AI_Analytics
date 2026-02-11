import React from 'react'
import { Card, Badge } from 'react-bootstrap';
import '../../css/TaskCard.css';
import PropTypes from 'prop-types';

export default function TaskCard({ task }) {
    const getPriorityLabel = (priority) => {
        if (priority === 1) return 'Low';
        if (priority === 2) return 'Medium';
        if (priority === 3) return 'High';
        return 'None';
    };
    const getStatusLabel = (status) => {
        if (!status) return 'Unknown';
        if (status === 'pending') return 'Pending';
        if (status === 'in_progress') return 'In Progress';
        if (status === 'completed') return 'Completed';
        return status;
    }

  return (
    <Card className="task-card mb-4 m-3" >
        <Card.Body className="task-card-body">
            <Card.Title className="task-card-title">{task.title}</Card.Title>
            <Card.Subtitle className="task-card-subtitle mb-3 d-flex align-items-center gap-3 flex-wrap">
                <Badge 
                    bg="transparent"
                    className={`task-badge status-${getStatusLabel(task.status).toLowerCase().replace(' ', '-')}`}
                >
                    {getStatusLabel(task.status) || 'Unknown'}
                </Badge>
                <span className="task-card-separator">•</span>
                <Badge 
                    bg="transparent"
                    className={`task-badge priority-${getPriorityLabel(task.priority).toLowerCase()}`}
                >
                    Priority: {getPriorityLabel(task.priority) || 'None'}
                </Badge>
                <span className="task-card-separator">•</span>
                <span className="task-card-due">
                    Due: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No Due Date'}
                </span>
            </Card.Subtitle>
            <Card.Text className="task-card-description">
                {task.description || 'No description available.'}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

TaskCard.propTypes = {
    task: PropTypes.shape({
        title: PropTypes.string,
        status: PropTypes.string,
        priority: PropTypes.number,
        deadline: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
};