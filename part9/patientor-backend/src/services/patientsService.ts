import patients from "../../data/patients";
import { v1 as uuidv1 } from "uuid";

import {
  Entry,
  EntryWithoutId,
  NonSensitivePatient,
  Patient,
  PatientWithoutId,
} from "../types";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = (patient: PatientWithoutId): Patient => {
  const id: string = uuidv1();
  const newPatient = {
    id,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const patient = findById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
    // return undefined;
  }

  const id = uuidv1();
  const newEntry: Entry = { id, ...entry };
  patient.entries.push(newEntry);
  return newEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((patient) => patient.id === id);
  return entry;
};

export default {
  findById,
  getPatients,
  addPatient,
  getNonSensitivePatients,
  addEntry,
};
