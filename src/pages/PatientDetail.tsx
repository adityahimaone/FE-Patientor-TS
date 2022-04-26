import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { setPatientDetail, setDiagnosisList } from "../state/reducer";
import axios from "axios";
import { Patient, Gender, Entry, Diagnosis, HealthCheckEntry } from "../types";
import { Male, Female, Transgender } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { apiBaseUrl } from "../constant";

export function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnosis }, dispatch] = useStateValue();

  const fetchPatientDetail = async () => {
    try {
      console.log(id);
      if (id && id !== patient.id) {
        const { data: patientDetail } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log(patientDetail, "patientDetail");
        dispatch(setPatientDetail(patientDetail));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDiagnosis = async () => {
    try {
      if (diagnosis.length === 0) {
        const { data: diagnosisList } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisList));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatientDetail();
    fetchDiagnosis();
  }, [id]);

  return (
    <div>
      <div>
        <h3>Patient Detail TEST</h3>
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
              <Typography variant="h6" sx={{ paddingTop: 2 }}>
                Entries :
              </Typography>
              {patient.entries?.map((entry) => (
                <div key={entry.id}>
                  <Card sx={{ padding: 0.5 }}>
                    <EntryDetails entry={entry} />
                  </Card>
                </div>
              ))}
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryField entry={entry} />;
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    default:
      return assertNever(entry as never);
  }
};

const HealthCheckEntryField = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnosis }] = useStateValue();
  const diagnosisCodes = entry.diagnosisCodes ? entry.diagnosisCodes : [];
  return (
    <div>
      <p>
        <b>{entry.date} : </b> {entry.description}
      </p>
      <ul>
        {diagnosisCodes.map((diagnosecode) => (
          <li key={diagnosecode}>
            {diagnosecode} :{" "}
            {diagnosis.find((d) => d.code === diagnosecode)?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const HospitalEntry = ({ entry }: { entry: Entry }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <div>
      <div>
        <h4>Hospital Entry</h4>
      </div>
      <div>
        <div>
          <Typography sx={{ fontSize: 14 }}>
            {entry.date} {entry.description}
          </Typography>
        </div>
        <div>
          <ul>
            {entry.diagnosisCodes?.map((diagnosecode) => (
              <li key={diagnosecode}>
                {diagnosecode} :{" "}
                {diagnosis.find((d) => d.code === diagnosecode)?.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const OccupationalHealthcareEntry = ({ entry }: { entry: Entry }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <div>
      <div>
        <h4>Occupational Healthcare Entry</h4>
      </div>
      <div>
        <div>
          <Typography sx={{ fontSize: 14 }}>
            {entry.date} {entry.description}
          </Typography>
        </div>
        <div>
          <ul>
            {entry.diagnosisCodes?.map((diagnosecode) => (
              <li key={diagnosecode}>
                {diagnosecode} :{" "}
                {diagnosis.find((d) => d.code === diagnosecode)?.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default PatientDetail;
