import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from "./components/SignIn";
import LogIn from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn/>} />
        <Route path="/signup" element={<SignInForm />} />
      </Routes>
    </Router>
  );
}

export default App;