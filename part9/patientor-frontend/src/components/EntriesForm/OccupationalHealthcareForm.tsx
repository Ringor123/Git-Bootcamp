import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
  Button,
  TextField,
  Card,
  Alert,
} from "@mui/material";
import { Diagnoses, Entry, OccupationalHealthCareEntry } from "../../types";
import { useState } from "react";
import patientsService from "../../services/patientsService";
import { isAxiosError } from "axios";

interface OccupationalFormProps {
  diagnoses: Diagnoses[];
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  id: string;
}

const OccupationalHealthForm = ({
  diagnoses,
  entries,
  setEntries,
  id,
}: OccupationalFormProps) => {
  const [diagnosesCode, setDiagnosesCodes] = useState<string[]>([]);

  const INITIAL_STATE: OccupationalHealthCareEntry = {
    id: "",
    type: "OccupationalHealthcare",
    description: "",
    specialist: "",
    date: "",
    employerName: "",
    diagnosisCodes: undefined,
    sickLeave: undefined
  };

  const [inputValues, setInputValues] =
    useState<OccupationalHealthCareEntry>(INITIAL_STATE);
  const [alert, setAlert] = useState<string>("");

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

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
  
    if (name.startsWith("sickLeave")) {
      const sickField = name.split(".")[1];
      setInputValues({
        ...inputValues,
        sickLeave: {
          ...(inputValues.sickLeave || { startDate: "", endDate: "" }), 
          [sickField]: value,
        },
      });
    } else {
      setInputValues({
        ...inputValues,
        diagnosisCodes: diagnosesCode,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setDiagnosesCodes(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newEntry: OccupationalHealthCareEntry = {
      ...inputValues,
    } as OccupationalHealthCareEntry;

    try {
      const addedEntry = await patientsService.addEntry(newEntry, id);
      console.log("New Entry added:", addedEntry);

      setEntries([...entries, addedEntry]);
      setInputValues(INITIAL_STATE);
      setDiagnosesCodes([]);
      setAlert("Success: Entry added");
      setTimeout(() => setAlert(""), 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("Error: ", error.response?.data);
        setAlert("Error: " + error.response?.data);
        setTimeout(() => setAlert(""), 3000);
      }
    }
  };

  console.log(inputValues);
  return (
    <Card
      style={{
        marginBottom: "1em",
        marginTop: "1em",
        padding: "15px",
        textAlign: "center",
        backgroundColor: "#ecf0f1",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">New Occupational Healthcare Entry</Typography>
        {alert.includes("Error") && (
          <Alert style={{ border: "solid, red, 1px" }} severity="error">
            {alert}
          </Alert>
        )}

        {alert.includes("Success") && (
          <Alert style={{ border: "solid, green, 1px" }} severity="success">
            {alert}
          </Alert>
        )}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Description"
            variant="outlined"
            onChange={handleTextFieldChange}
            name="description"
            value={inputValues.description}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            onChange={handleTextFieldChange}
            name="date"
            value={inputValues.date}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Specialist"
            variant="outlined"
            onChange={handleTextFieldChange}
            name="specialist"
            value={inputValues.specialist}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="diagnosis-codes-label">
            Diagnosis Codes (optional)
          </InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            onChange={handleSelectChange}
            multiple
            value={diagnosesCode || ""}
            input={<OutlinedInput label="Diagnosis Codes (optional)" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            name="diagnosisCodes"
          >
            {diagnoses.map((diagnose) => (
              <MenuItem key={diagnose.code} value={diagnose.code}>
                <Checkbox checked={diagnosesCode.includes(diagnose.code)} />
                <ListItemText primary={diagnose.code} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Employer Name"
            variant="outlined"
            onChange={handleTextFieldChange}
            name="employerName"
            value={inputValues.employerName}
          />
        </FormControl>
        <Typography>Sick Leave</Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Start Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            onChange={handleTextFieldChange}
            name="sickLeave.startDate"
            value={inputValues.sickLeave?.startDate || ""}
          ></TextField>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="End Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            onChange={handleTextFieldChange}
            name="sickLeave.endDate"
            value={inputValues.sickLeave?.endDate || ""}
          ></TextField>
        </FormControl>
        <Button
          variant="contained"
          style={{ backgroundColor: "#00CCDD", marginTop: "2em" }}
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default OccupationalHealthForm;
