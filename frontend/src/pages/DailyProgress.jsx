import { useEffect, useState } from "react";
import { progressApi } from "../services/apiService";

const DailyProgress = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    progressApi
      .getDailyProgress()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load daily progress");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading daily progress...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Daily Progress</h2>
      <p>Date: {data?.date}</p>

      {data?.tasks?.length === 0 ? (
        <p>No tasks completed today.</p>
      ) : (
        <ul>
          {data?.tasks?.map((task) => (
            <li key={task.id}>
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DailyProgress;
