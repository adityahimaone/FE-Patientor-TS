import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setPatientDetail, useStateValue } from "../state";
import axios from "axios";
import { Patient, Gender } from "../types";
import { Male, Female, Transgender } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const fetchPatientDetail = async () => {
    try {
      const { data: patientDetail } = await axios.get<Patient>(
        `http://localhost:3001/patients/${id}`
      );
      dispatch(setPatientDetail(patientDetail));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatientDetail();
  }, [id]);

  return (
    <div>
      <div>
        <h3>Patient Detail</h3>
      </div>
      <div>
        <div>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h4" color="text.secondary" gutterBottom>
                {patient.name}{" "}
                {patient.gender === Gender.Male ? (
                  <Male color="primary" />
                ) : patient.gender === Gender.Female ? (
                  <Female color="primary" />
                ) : (
                  <Transgender color="primary" />
                )}
              </Typography>
              <Typography sx={{ fontSize: 14 }} component="div">
                SSN : {patient.ssn}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                occupation: {patient.occupation}
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}
