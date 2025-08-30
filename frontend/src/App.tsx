import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add these later */}
        {/* <Route path="/book" element={<Book />} /> */}
        {/* <Route path="/finding/:jobId" element={<Finding />} /> */}
        {/* <Route path="/track/:jobId" element={<Track />} /> */}
        {/* <Route path="/receipt/:jobId" element={<Receipt />} /> */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
