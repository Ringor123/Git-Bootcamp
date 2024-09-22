import { Typography } from "@mui/material";
import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

interface PatientInfoProps {
  patients: Patient[];
}

const PatientInfo = ({ patients }: PatientInfoProps) => {
  const { id } = useParams();
  const patient = patients.find((patient) => patient.id === id) as Patient;

  if(!patient) {
    return <Typography variant="h4" style={{ marginBottom: "1em", marginTop: "2em" }} >Patient not found</Typography>;
  }

  return (
    <div>
      <Typography
        variant="h4"
        style={{ marginBottom: "1em", marginTop: "2em" }}
      >
        <strong>Patient Info</strong>
      </Typography>
      <Typography variant="h5" style={{marginBottom: "0.5em"}}><strong>{patient.name}</strong>
       {patient.gender === "male" && <MaleIcon />}
       {patient.gender === "female" && <FemaleIcon />}
       </Typography>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.name}</Typography>
    </div>
  );
};


export default PatientInfo;
