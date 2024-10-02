import { Card, Typography } from "@mui/material";
import { Diagnoses, HealthCheckEntry, HealthCheckRating } from "../../types";

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnoses[];
}

const healthRating = (rating: HealthCheckRating) => {
  switch (rating) {
    case 0:
      return (
        <Typography style={{ color: "green", marginTop: "10px" }}>
          Healthy
        </Typography>
      );
    case 1:
      return (
        <Typography style={{ color: "yellow", marginTop: "10px" }}>
          Low risk
        </Typography>
      );
    case 2:
      return (
        <Typography style={{ color: "orange", marginTop: "10px" }}>
          Medium risk
        </Typography>
      );
    case 3:
      return (
        <Typography style={{ color: "red", marginTop: "10px" }}>
          High risk
        </Typography>
      );
    default:
      return <Typography>Unknown Rating</Typography>;
  }
};

const HealthCheckEntryComponent = ({
  entry,
  diagnoses,
}: HealthCheckEntryProps) => {
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
          className="healthicons-doctor_male"
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
      {healthRating(entry.healthCheckRating)}
      <Typography style={{ marginTop: "10px" }} variant="body1">
        Diagnose by: {entry.specialist}
      </Typography>
    </Card>
  );
};

export default HealthCheckEntryComponent;
