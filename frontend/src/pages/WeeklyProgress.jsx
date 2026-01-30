import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { WEEK_DATES } from "../config/progressDates";

const DAYS = Object.keys(WEEK_DATES);


function WeeklyProgress() {
  const [summary, setSummary] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayTasks, setDayTasks] = useState([]);

  useEffect(() => {
    api.get("/api/progress/weekly")
      .then((res) => setSummary(res.data))
      .catch(() => {});
  }, []);

  const handleDayClick = (day) => {
    setSelectedDay(day);

    // Map weekday to actual date (based on your seeded data week)
  

    const date = WEEK_DATES[day];


    api.get(`/api/progress/daily?date=${date}`)
      .then((res) => setDayTasks(res.data.tasks))
      .catch(() => setDayTasks([]));
  };

  if (!summary) {
    return <p>Loading weekly progress...</p>;
  }

  return (
    <div>
      <h2 className="mb-3">Weekly Progress</h2>

      {!selectedDay && (
        <ul className="list-group mb-3">
          {DAYS.map((day) => (
            <li
              key={day}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => handleDayClick(day)}
            >
              <span>{day}</span>
              <span className="badge bg-secondary">
                {summary.completedByDay[day] || 0} tasks
              </span>
            </li>
          ))}
        </ul>
      )}

      {selectedDay && (
        <div className="card p-4">
          <h4 className="mb-3">{selectedDay}</h4>

          {dayTasks.length === 0 ? (
            <p className="text-muted">No tasks completed on this day</p>
          ) : (
            <ul className="list-group">
              {dayTasks.map((task) => (
                <li key={task.id} className="list-group-item">
                  {task.title}
                </li>
              ))}
            </ul>
          )}

          <button
            className="btn btn-link mt-3"
            onClick={() => {
              setSelectedDay(null);
              setDayTasks([]);
            }}
          >
            ← Back to week
          </button>
        </div>
      )}

      <Link to="/progress" className="btn btn-link mt-3">
        ← Back to overview
      </Link>
    </div>
  );
}

export default WeeklyProgress;
