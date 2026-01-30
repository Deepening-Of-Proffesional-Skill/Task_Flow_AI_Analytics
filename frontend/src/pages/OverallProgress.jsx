import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { AVAILABLE_DATES } from "../config/progressDates";


function OverallProgress() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    // Reuse weekly endpoint to get completed tasks count,
    // then fetch daily by known dates (temporary, pre-DB solution)
    Promise.all(
  AVAILABLE_DATES.map((date) =>
    api.get(`/api/progress/daily?date=${date}`)
  )
)

      .then((responses) => {
        const allTasks = responses.flatMap((res) =>
          res.data.tasks.map((task) => ({
            ...task,
            date: res.data.date
          }))
        );
        setTasks(allTasks);
      })
      .catch(() => setTasks([]));
  }, []);

  if (!tasks) {
    return <p>Loading achievements...</p>;
  }

  // Group tasks by date
  const grouped = tasks.reduce((acc, task) => {
    acc[task.date] = acc[task.date] || [];
    acc[task.date].push(task);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="mb-3">Overall Achievement</h2>
      <p className="text-muted">
        All completed tasks across days
      </p>

      {Object.keys(grouped).length === 0 && (
        <p>No completed tasks yet</p>
      )}

      {Object.entries(grouped).map(([date, tasks]) => (
        <div key={date} className="card p-4 mb-3">
          <strong>{date}</strong>

          <ul className="list-group mt-2">
            {tasks.map((task) => (
              <li key={task.id} className="list-group-item">
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Link to="/progress" className="btn btn-link mt-3">
        ← Back to overview
      </Link>
    </div>
  );
}

export default OverallProgress;

