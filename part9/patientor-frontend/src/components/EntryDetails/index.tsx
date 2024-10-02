import { Typography } from "@mui/material";
import { Diagnoses, Entry } from "../../types";
import { useEffect, useState } from "react";
import diagnosesService from "../../services/diagnosesService";
import HospitalEntryComponent from "./HospitalEntryComponent";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareEntryComponent";
import HealthCheckEntryComponent from "./HealthCheckEntryComponent";

interface EntryDetailsProps {
  entries: Entry[];
}

const EntryDetails = ({ entries }: EntryDetailsProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnoses[]>([]);

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    fetchDiagnosesList();
  }, []);

  return (
    <div>
      {entries.length > 0 && (
        <Typography
          variant="h5"
          style={{ marginBottom: "1em", marginTop: "2em" }}
        >
          <strong>Entries</strong>
        </Typography>
      )}
      {entries.length === 0 && (
        <Typography
          variant="h5"
          style={{ marginBottom: "1em", marginTop: "2em" }}
        >
          <strong>No entries</strong>
        </Typography>
      )}
      {entries.map((entry: Entry) => {
        switch (entry.type) {
          case "Hospital":
            return (
              <HospitalEntryComponent key={entry.id} entry={entry} diagnoses={diagnoses} />
            );
          case "OccupationalHealthcare":
            return (
              <OccupationalHealthcareEntryComponent
              key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            );
          case "HealthCheck":
            return (
              <HealthCheckEntryComponent key={entry.id} entry={entry} diagnoses={diagnoses} entries={entries} />
            );
          default:
            return <div>Unknown entry type</div>;
        }
      })}
    </div>
  );
};

export default EntryDetails;
