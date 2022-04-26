import React, { useEffect, useState } from "react";
import axios from "axios";
import { Patient } from "../types";
import { useStateValue, setPatientList } from "../state";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { apiBaseUrl } from "../constant";
import { PatientFormValues } from "../components/AddPatientModal/AddPatientForm";
import AddPatientModal from "../components/AddPatientModal/AddPatientModal";

export default function Patients() {
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const fetchPatientList = async () => {
    try {
      const { data: patientList } = await axios.get<Patient[]>(
        `${apiBaseUrl}/patients`
      );
      dispatch(setPatientList(patientList));
    } catch (error) {
      console.error(error);
    }
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        errorMessage = error.response.data.error;
      }
      setError(errorMessage);
    }
  };

  useEffect(() => {
    fetchPatientList();
  }, []);

  return (
    <div>
      <div>
        <h4>Patients List</h4>
      </div>
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Occupation</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(patients).map((patient: Patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.dateOfBirth}</TableCell>
                  <TableCell>{patient.occupation}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>
                    <Button href={`patients/${patient.id}`} variant="contained">
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddPatientModal
          modalOpen={modalOpen}
          onSubmit={submitNewPatient}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Patient</Button>
      </div>
    </div>
  );
}
