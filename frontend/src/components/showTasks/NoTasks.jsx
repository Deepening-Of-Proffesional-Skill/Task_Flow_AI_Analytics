import React from 'react'
import { Card, Button } from 'react-bootstrap';
import '../../css/NoTasks.css';
import { useNavigate } from 'react-router-dom';

export default function NoTasks() {
    const navigate = useNavigate();

    const navigateCreateTask = () => {
        navigate('/addTasks');
    }
        
  return (
    <Card className="no-tasks-card mt-5 pt-2">
        <Card.Body className="text-center py-5">
            <i className="bi bi-journal-x display-4 text-muted mb-4"></i>
            
            <h4 className="mb-3 text-light">You haven&apos;t created any tasks yet</h4>
            
            <p className="text-muted mb-4">
                Start organizing your day by adding your first task!
            </p>

            <Button 
                variant="primary" 
                size="lg" 
                className="no-tasks-create-btn"
                onClick={navigateCreateTask}
            >
                <i className="bi bi-plus-lg me-2"></i>
                Create Your First Task
            </Button>
        </Card.Body>
    </Card>
  )
}
