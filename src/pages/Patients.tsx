import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Patient } from "../types";

export default function Patients() {
  const { id } = useParams<{ id: string }>();
  const [patientsData, setPatientsData] = useState([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const { data: patientList } = await axios.get<Patient[]>(
          `http://localhost:3001/patients`
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatientList();
  }, []);

  return (
    <div>
      <div>
        <h4>Patients List</h4>
      </div>
      <div></div>
    </div>
  );
}
