import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from "./components/SignIn";
import LogIn from "./components/Login";
import Home from "./components/showTasks/Home";
import HomeLayout from "./layouts/HomeLayout";
import ModifyDashboard from "./pages/ModifyDashboard";
import { TaskProvider } from "./context/TaskContext";
import ProgressOverview from "./pages/ProgressOverview";
import DailyProgress from "./pages/DailyProgress";
import WeeklyProgress from "./pages/WeeklyProgress";
import OverallProgress from "./pages/OverallProgress";
import WeeklyDayDetails from "./pages/WeeklyDayDetails";
import ProfilePage from "./components/Profile";
import AIInsights from "./components/AIInsights.jsx";




function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn/>} />
          <Route path="/signup" element={<SignInForm />} />
          <Route element={<HomeLayout />} >
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<ModifyDashboard />} />
            <Route path="/addTasks" element={<ModifyDashboard />} />
            <Route path="/productivityReports" element={<ProgressOverview />} />
            <Route path="/productivityReports/daily" element={<DailyProgress />} />
            <Route path="/productivityReports/weekly" element={<WeeklyProgress />} />
            <Route path="/productivityReports/overall" element={<OverallProgress />} />
            <Route path="/productivityReports/weekly/:day" element={<WeeklyDayDetails />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/aiinsights" element={<AIInsights />} />




          </Route>
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;