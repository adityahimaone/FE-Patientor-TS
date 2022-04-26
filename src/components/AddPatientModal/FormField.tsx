import React from "react";
import { Gender } from "../../types";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import {
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

export type GenderOption = {
  value: Gender;
  label: string;
};

type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => (
  <Select {...field} {...props} />
);

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextFieldCustom = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: "1em" }}>
    <TextField fullWidth label={label} placeholder={placeholder} {...field} />
    <Typography variant="subtitle2" style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export default function FormField() {
  return <div>FormField</div>;
}
