import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from "./components/SignIn";
import LogIn from "./components/Login";
import Home from "./components/showTasks/Home";
import HomeLayout from "./layouts/HomeLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn/>} />
        <Route path="/signup" element={<SignInForm />} />
        <Route element={<HomeLayout />} >
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;