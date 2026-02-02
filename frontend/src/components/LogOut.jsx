import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../css/logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      const response = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      alert("An error occurred during logout");
    }
  };

  return (
    <div className="d-grid">
      <Button className="logout-button" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
