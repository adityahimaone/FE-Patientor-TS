import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

export default function Layout() {
  return (
    <Container maxWidth="md">
      <Header title="Patientor" />
      <main>
        <Outlet />
      </main>
    </Container>
  );
}
