import { useEffect, useState } from "react";
import { progressApi } from "../services/apiService";

const OverallProgress = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    progressApi
      .getOverallProgress()
      .then((res) => setData(res.data))
      .catch(() => setError("Could not load overall progress"));
  }, []);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading overall progress...</p>;

  return (
    <div>
      <h2>Overall Achievement</h2>

      {/* Summary */}
      <div className="mb-4">
        <p>
          <strong>Total Tasks:</strong> {data.totalTasks}
        </p>
        <p>
          <strong>Completed Tasks:</strong> {data.completedTasks}
        </p>
        <p>
          <strong>In Progress:</strong> {data.inProgressTasks}
        </p>
        <p>
          <strong>Pending:</strong> {data.pendingTasks}
        </p>
        <p>
          <strong>Completion Rate:</strong> {data.completionRate}%
        </p>
      </div>

      {/* Encouragement */}
      <p className="text-muted">
        {data.completionRate >= 70
          ? "Great progress! Keep it up 💪"
          : "You’re making progress — stay consistent 🚀"}
      </p>
    </div>
  );
};

export default OverallProgress;

