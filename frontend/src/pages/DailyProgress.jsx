import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { WEEK_DATES, AVAILABLE_DATES } from "../config/progressDates";


function DailyProgress() {
  const [selectedDate, setSelectedDate] = useState(AVAILABLE_DATES[0]);
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get(`/api/progress/daily?date=${selectedDate}`)
      .then((res) => setData(res.data))
      .catch(() => {});
  }, [selectedDate]);

  if (!data) {
    return <p>Loading daily progress...</p>;
  }

  const morning = [];
  const afternoon = [];
  const evening = [];

  data.tasks.forEach((task) => {
    const hour = new Date(task.completedAt).getHours();
    if (hour < 12) morning.push(task);
    else if (hour < 18) afternoon.push(task);
    else evening.push(task);
  });

  return (
    <div>
      <h2 className="mb-2">Daily Progress</h2>

      {/* DATE SELECTOR */}
      <div className="mb-3">
        <label className="form-label">Select date</label>
        <select
          className="form-select"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
            {Object.entries(WEEK_DATES).map(([day, date]) => (
  <option key={date} value={date}>
    {day} ({date})
  </option>
))}

        </select>
      </div>

      {/* MORNING */}
      <div className="card p-4 mb-3">
        <strong>Morning</strong>
        {morning.length === 0 ? (
          <p className="text-muted">No tasks completed</p>
        ) : (
          <ul className="list-group mt-2">
            {morning.map((task) => (
              <li key={task.id} className="list-group-item">
                {task.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* AFTERNOON */}
      <div className="card p-4 mb-3">
        <strong>Afternoon</strong>
        {afternoon.length === 0 ? (
          <p className="text-muted">No tasks completed</p>
        ) : (
          <ul className="list-group mt-2">
            {afternoon.map((task) => (
              <li key={task.id} className="list-group-item">
                {task.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* EVENING */}
      <div className="card p-4 mb-3">
        <strong>Evening</strong>
        {evening.length === 0 ? (
          <p className="text-muted">No tasks completed</p>
        ) : (
          <ul className="list-group mt-2">
            {evening.map((task) => (
              <li key={task.id} className="list-group-item">
                {task.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link to="/progress" className="btn btn-link mt-2">
        ← Back to overview
      </Link>
    </div>
  );
}

export default DailyProgress;
