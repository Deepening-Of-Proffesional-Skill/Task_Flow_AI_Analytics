import React from "react";
import PropTypes from "prop-types";
import { Card, Container } from "react-bootstrap";
import { getWeekYear } from "../../utils/weekUtils";
import NoTasks from "./NoTasks";
import TaskCard from "./TaskCard";

export default function WeeklyTasks({ sortedTasks }) {
    const groupedByWeek = sortedTasks.reduce((groups, task) => {
    const { year, week, label } = getWeekYear(task.deadline);
    const key = `${year}-W${week}`;

    if (!groups[key]) {
      groups[key] = { label, tasks: [] };
    }

    groups[key].tasks.push(task);
    return groups;
  }, {});

  return (
    <Container className="tasks-wrapper">
        {sortedTasks.length > 0 ? (        
            Object.entries(groupedByWeek).map(([key, group]) => (
                <Card key={key} className="mb-4">
                    <Card.Body>
                        <div className="week-label">
                            <i className="bi bi-calendar-week me-3"></i>
                            {group.label}
                        </div>

                        <div className='d-flex flex-column gap-2'>
                            {group.tasks.map((task) => (
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

WeeklyTasks.propTypes = {
  sortedTasks: PropTypes.array.isRequired,
};