import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from "./components/SignIn";
import LogIn from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn/>} />
        <Route path="/signup" element={<SignInForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;