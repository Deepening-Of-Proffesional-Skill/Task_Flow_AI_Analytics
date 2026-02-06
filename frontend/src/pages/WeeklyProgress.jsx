import { useEffect, useState } from "react";
import { progressApi } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const WeeklyProgress = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    progressApi
      .getWeeklyProgress()
      .then((res) => setSummary(res.data))
      .catch(() => setError("Could not load weekly progress"));
  }, []);

  if (error) return <p>{error}</p>;
  if (!summary) return <p>Loading weekly progress...</p>;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div>
      <h2>Weekly Progress</h2>
      <p className="text-muted">Click a day to see detailed tasks</p>

      <ul className="list-group mt-3">
        {days.map((day) => (
          <li
            key={day}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(`/productivityReports/weekly/${day.toLowerCase()}`)
            }
          >
            <span>{day}</span>
            <strong>{summary.completedByDay?.[day] || 0}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyProgress;
