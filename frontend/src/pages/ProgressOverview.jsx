import { useNavigate } from "react-router-dom";
import "../css/progress.css";

const ProgressOverview = () => {
  const navigate = useNavigate();

  return (
    <div className="reports-page">
      <h2 className="reports-title">Productivity Reports</h2>

      <div className="reports-cards">
        <div
          className="progress-card"
          onClick={() => navigate("/productivityReports/daily")}
        >
          <h5>Daily Progress</h5>
          <p>Tasks completed today</p>
        </div>

        <div
          className="progress-card"
          onClick={() => navigate("/productivityReports/weekly")}
        >
          <h5>Weekly Progress</h5>
          <p>Progress from Monday to Sunday</p>
        </div>

        <div
          className="progress-card"
          onClick={() => navigate("/productivityReports/overall")}
        >
          <h5>Overall Achievement</h5>
          <p>All completed tasks</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
