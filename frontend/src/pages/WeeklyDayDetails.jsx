import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { progressApi } from "../services/apiService";

const WeeklyDayDetails = () => {
  const { day } = useParams(); // e.g. monday
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    progressApi
      .getDailyProgress({ day })
      .then((res) => setData(res.data))
      .catch(() => setError("Could not load daily details"));
  }, [day]);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading day details...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="mb-3">
        ← Back to Weekly
      </button>

      <h2>{day.charAt(0).toUpperCase() + day.slice(1)} Progress</h2>
      <p>Date: {data.date}</p>

      {data.tasks.length === 0 ? (
        <p>No tasks completed on this day.</p>
      ) : (
        <ul>
          {data.tasks.map((task) => (
            <li key={task.id}>
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WeeklyDayDetails;
