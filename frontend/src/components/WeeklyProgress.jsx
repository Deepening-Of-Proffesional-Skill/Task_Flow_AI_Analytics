import { useEffect, useState } from "react";
import api from "../services/api";

function WeeklyProgress() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/api/progress/weekly")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
    return <p className="mt-4">Loading weekly progress...</p>;
  }

  return (
    <div className="card shadow-sm p-4 mt-4">
      <h4 className="mb-3">Weekly Progress</h4>

      <p>
        Total completed this week:{" "}
        <strong>{data.totalCompleted}</strong>
      </p>

      <ul className="list-group mt-3">
        {Object.entries(data.completedByDay).map(([day, count]) => (
          <li
            key={day}
            className="list-group-item d-flex justify-content-between"
          >
            <span>{day}</span>
            <span>{count} tasks</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeeklyProgress;
