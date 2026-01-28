import { Card, Container } from "react-bootstrap";
import { getWeekYear } from "../../utils/weekUtils";
export default function WeeklyTasks({ sortedTasks }) {
    const groupedByWeek = sortedTasks.reduce((groups, task) => {
    const { year, week, label } = getWeekYear(task.dueDate);
    const key = `${year}-W${week}`;

    if (!groups[key]) {
      groups[key] = { label, tasks: [] };
    }

    groups[key].tasks.push(task);
    return groups;
  }, {});

  return (
    <Container>
        {Object.entries(groupedByWeek).map(([key, group]) => (
            <Card key={key} className="mb-4">
                <Card.Body>
                    <div className="due-date">
                        {group.label}
                    </div>

                    <div className='d-flex flex-column gap-2'>
                        {group.tasks.map((task) => (
                            <div key={task.id} className="task-item p-2 border rounded">
                                <Card.Title className="mb-1">
                                    {task.title}
                                </Card.Title>

                                <Card.Subtitle className="d-flex align-items-center gap-2">
                                    <span >{task.status}</span>
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
