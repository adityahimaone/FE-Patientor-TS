import React from "react";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div>
      <div>HOME</div>
      <div>
        <Button href="/patients" variant="contained" color="primary">
          Patients
        </Button>
      </div>
    </div>
  );
}
