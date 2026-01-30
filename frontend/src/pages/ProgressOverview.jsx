import { Link } from "react-router-dom";

function ProgressOverview() {
  return (
    <div>
      <h2>Progress Overview</h2>

      <ul>
        <li><Link to="/progress/daily">Daily Progress</Link></li>
        <li><Link to="/progress/weekly">Weekly Progress</Link></li>
        <li><Link to="/progress/overall">Overall Achievement</Link></li>
      </ul>
    </div>
  );
}

export default ProgressOverview;
