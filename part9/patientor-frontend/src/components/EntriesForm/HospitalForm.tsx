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
import { Diagnoses, Entry, HospitalEntry } from "../../types";
import { useState } from "react";
import { isAxiosError } from "axios";
import patientsService from "../../services/patientsService";

interface HospitalFormProps {
  diagnoses: Diagnoses[];
  id: string;
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

const HospitalForm = ({
  diagnoses,
  id,
  entries,
  setEntries,
}: HospitalFormProps) => {
  const [diagnosesCode, setDiagnosesCodes] = useState<string[]>([]);

  const INITIAL_STATE: HospitalEntry = {
    id: "",
    type: "Hospital",
    description: "",
    specialist: "",
    date: "",
    discharge: {
      date: "",
      criteria: "",
    },
  };

  const [inputValues, setInputValues] = useState<HospitalEntry>(INITIAL_STATE);
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

  // const handleTextFieldChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   event.preventDefault();

  //   const {name, value} = event.target;
  //   const dischargeField = name.split(".")[1];

  //   setInputValues({
  //     ...inputValues,
  //     [name]: value,
  //     diagnosisCodes: diagnosesCode,
  //     discharge: {
  //       ...inputValues.discharge,
  //       [dischargeField]: value,
  //     }
  //   });
  // };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (name.startsWith("discharge")) {
      const dischargeField = name.split(".")[1];
      setInputValues({
        ...inputValues,
        discharge: {
          ...inputValues.discharge,
          [dischargeField]: value,
        },
      });
    } else {
      setInputValues({
        ...inputValues,
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

    const newEntry: HospitalEntry = {
      ...inputValues,
    } as HospitalEntry;

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
        <Typography variant="h6">New Hospital Entry</Typography>
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

        <Typography marginTop={"2em"}>Discharge</Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Discharge Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            onChange={handleTextFieldChange}
            name="discharge.date"
            value={inputValues.discharge.date}
          ></TextField>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Criteria"
            variant="outlined"
            onChange={handleTextFieldChange}
            name="discharge.criteria"
            value={inputValues.discharge.criteria}
          />
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

export default HospitalForm;
