import {
  Card,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Diagnoses, Entry, Patient } from "../../types";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "../EntryDetails";
import HealthCheckForm from "../EntriesForm/HealthCheckForm";
import { useEffect, useState } from "react";
import HospitalForm from "../EntriesForm/HospitalForm";
import OccupationalHealthcareForm from "../EntriesForm/OccupationalHealthcareForm";

interface PatientInfoProps {
  patients: Patient[];
  diagnoses: Diagnoses[];
}

const PatientInfo = ({ patients, diagnoses }: PatientInfoProps) => {
  const { id } = useParams();

  const patient = patients.find((patient) => patient.id === id) as Patient;
  const [entryType, setEntryType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >();
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    if (patient && patient.entries) {
      setEntries(patient.entries);
    }
  }, [patient]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  if (!patient) {
    return (
      <Typography
        variant="h4"
        style={{ marginBottom: "1em", marginTop: "2em" }}
      >
        Patient not found
      </Typography>
    );
  }

  if (id === undefined) {
    return <Typography>Wrong Patient Id</Typography>;
  }

  const handleEntryTypeChange = (
    event: SelectChangeEvent<
      "HealthCheck" | "Hospital" | "OccupationalHealthcare"
    >
  ) => {
    setEntryType(
      event.target.value as
        | "HealthCheck"
        | "Hospital"
        | "OccupationalHealthcare"
    );
  };

  return (
    <div key={patient.id}>
      <Typography
        variant="h4"
        style={{ marginBottom: "1em", marginTop: "2em", textAlign: "center" }}
      >
        <strong>Patient Info</strong>
      </Typography>
      <Card
        style={{
          marginBottom: "1em",
          marginTop: "1em",
          padding: "15px",
          textAlign: "center",
          backgroundColor: "#ecf0f1",
        }}
      >
        <Typography variant="h5" style={{ marginBottom: "0.5em" }}>
          <strong>{patient.name}</strong>
          {patient.gender === "male" && <MaleIcon />}
          {patient.gender === "female" && <FemaleIcon />}
        </Typography>
        <Typography variant="body1">SSN: {patient.ssn}</Typography>
        <Typography variant="body1">
          Occupation: {patient.occupation}
        </Typography>
      </Card>
      <Typography variant="h5" style={{ marginTop: "2em" }}>
        Add New Entry
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="entry-type-label">Select Entry Type</InputLabel>
        <Select
          labelId="entry-type-label"
          onChange={handleEntryTypeChange}
          value={entryType || ""}
          input={<OutlinedInput label="Select Entry Type" />}
          MenuProps={MenuProps}
        >
          <MenuItem value="HealthCheck">
            <ListItemText primary="Health Check Entry" />
          </MenuItem>
          <MenuItem value="Hospital">
            <ListItemText primary="Hospital Entry" />
          </MenuItem>
          <MenuItem value="OccupationalHealthcare">
            <ListItemText primary="Occupational Healthcare Entry" />
          </MenuItem>
        </Select>
      </FormControl>
      {entryType === "HealthCheck" && (
        <HealthCheckForm diagnoses={diagnoses} id={id} entries={entries} setEntries={setEntries}/>
      )}
      {entryType === "Hospital" && (
        <HospitalForm diagnoses={diagnoses} entries={entries} id={id} setEntries={setEntries} />
      )}
      {entryType === "OccupationalHealthcare" && (
        <OccupationalHealthcareForm diagnoses={diagnoses} entries={entries} setEntries={setEntries} id={id} />
      )}

      {entries.length === 0 ? (
        <Typography>No hay entradas</Typography>
      ) : (
        <EntryDetails entries={entries} />
      )}
    </div>
  );
};

export default PatientInfo;
