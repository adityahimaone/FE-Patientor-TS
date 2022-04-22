import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";
import Home from "./pages/Home";
import Layout from "./components/Layout";

export default function RoutesPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
