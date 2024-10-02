import { Card, Typography } from "@mui/material";
import { Diagnoses, HospitalEntry } from "../../types";

interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses: Diagnoses[];
}

const HospitalEntryComponent = ({ entry, diagnoses }: HospitalEntryProps) => {
  return (
    <Card
      style={{
        marginBottom: "1em",
        marginTop: "1em",
        padding: "15px",
        backgroundColor: "#b3b6b7",
      }}
      key={entry.id}
    >
      <Typography variant="body1">
        <strong>{entry.date}</strong>{" "}
        <i
          style={{ fontSize: "1.8em", height: "20px" }}
          className="healthicons-hospital"
        ></i>
      </Typography>
      <Typography variant="body1" style={{ marginTop: "10px" }}>
        <em>{entry.description}</em>
      </Typography>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => {
            const diagnosesDescription = diagnoses.find(
              (diagnose) => diagnose.code === code
            );
            return (
              <li key={code}>
                {code} {diagnosesDescription?.name}
              </li>
            );
          })}
        </ul>
      )}
      <Typography variant="body1" style={{ marginTop: "10px" }}>
        Hospital discharge date {entry.discharge.date}:{" "}
        <em>{entry.discharge.criteria}</em>
      </Typography>
      <Typography style={{ marginTop: "10px" }} variant="body1">
        Diagnose by: {entry.specialist}
      </Typography>
    </Card>
  );
};

export default HospitalEntryComponent;
