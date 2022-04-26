import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import AddPatientForm, { PatientFormValues } from "./AddPatientForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

export default function AddPatientModal({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) {
  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Patient
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {error && `Error: ${error}`}
        </Typography>
        <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
      </Box>
    </Modal>
  );
}
