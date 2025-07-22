// frontend/src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import { LecturePage } from "./pages/LecturePage/LecturePage.tsx";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hello")
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
      <div>
        {/* <nav
          style={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            marginBottom: "20px",
          }}
        >
          <Link to="/" style={{ marginRight: "20px", textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/pages/LecturePage" style={{ textDecoration: "none" }}>
            Lecture Page
          </Link>
        </nav> */}

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>React + Node App</h1>
                <p>{message}</p>
              </div>
            }
          />
          <Route path="/pages/LecturePage" element={<LecturePage />} />
          <Route path="/pages/Home" element={<Home />} />
          <Route path="/pages/Login" element={<Login />} />
          <Route path="/pages/Register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
