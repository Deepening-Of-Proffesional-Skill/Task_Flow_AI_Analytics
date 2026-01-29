import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProgressOverview from "./pages/ProgressOverview";
import DailyProgress from "./pages/DailyProgress";
import WeeklyProgress from "./pages/WeeklyProgress";
import OverallProgress from "./pages/OverallProgress";

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-5">
        <h1 className="mb-4">TaskFlow</h1>

        <Routes>
          <Route path="/" element={<Navigate to="/progress" />} />
          <Route path="/progress" element={<ProgressOverview />} />
          <Route path="/progress/daily" element={<DailyProgress />} />
          <Route path="/progress/weekly" element={<WeeklyProgress />} />
          <Route path="/progress/overall" element={<OverallProgress />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;





