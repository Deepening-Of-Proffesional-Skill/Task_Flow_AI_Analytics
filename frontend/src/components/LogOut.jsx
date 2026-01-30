import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../css/logout.css";

const Logout = () => {
  const navigate = useNavigate();

  //handle logout
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      const response = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);

        //clear frontend session
        localStorage.clear();
        sessionStorage.clear();

        navigate("/");
      } else {
        alert(data.error || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Server error. Please try again.");
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
