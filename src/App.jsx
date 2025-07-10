import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Whitepaper from "./Whitepaper";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ textAlign: "center", margin: "30px 0 12px 0" }}>
        <Link to="/" style={{ marginRight: 24, color: "#61a5fb", fontWeight: 700 }}>Dashboard</Link>
        <Link to="/whitepaper" style={{ color: "#61a5fb", fontWeight: 700 }}>Whitepaper</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/whitepaper" element={<Whitepaper />} />
      </Routes>
    </BrowserRouter>
  );
}
