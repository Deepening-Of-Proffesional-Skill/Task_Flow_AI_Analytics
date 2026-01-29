import { useEffect, useState } from "react";
import api from "../services/api";

function ProgressSummary() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/progress/summary")
      .then((response) => {
        setProgress(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading progress...</p>;
  }

  if (!progress) {
    return <p>Could not load progress</p>;
  }

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-3">Progress Summary</h4>

<p className="text-muted">Total tasks: <strong>{progress.totalTasks}</strong></p>
<p className="text-success">Completed: <strong>{progress.completedTasks}</strong></p>
<p className="text-warning">In progress: <strong>{progress.inProgressTasks}</strong></p>
<p className="text-secondary">Pending: <strong>{progress.pendingTasks}</strong></p>

      <div className="mt-3">
        <label className="form-label">
          Completion rate: {progress.completionRate}%
        </label>

        <div className="progress">
          <div
            className="progress-bar bg-success"
            style={{ width: `${progress.completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProgressSummary;
