import { Card, Typography } from "@mui/material";
import { Diagnoses, OccupationalHealthCareEntry } from "../../types";

interface OccupationalHealthCareEntryProps {
  entry: OccupationalHealthCareEntry;
  diagnoses: Diagnoses[];
}

const OccupationalHealthCareEntryComponent = ({
  entry,
  diagnoses,
}: OccupationalHealthCareEntryProps) => {
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
          className="healthicons-chaplaincy"
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
      <Typography style={{ marginTop: "10px" }} variant="body1">
        Diagnose by: {entry.specialist}
      </Typography>
      {entry.sickLeave && (
        <Typography style={{ marginTop: "10px" }} variant="body1">
          Healthcare by {entry.employerName} started{" "}
          <em>{entry.sickLeave?.startDate}</em> and finished{" "}
          <em>{entry.sickLeave?.endDate}</em>
        </Typography>
      )}
    </Card>
  );
};

export default OccupationalHealthCareEntryComponent;
