import patients from '../../data/patients';
import { v1 as uuidv1 } from 'uuid';

import { NonSensitivePatient, Patient, NewPatientEntry } from '../types';


const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const id: string = uuidv1();
  const newPatientEntry = {
    id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(patient => patient.id === id);
  return entry;
};

export default {
  findById,
  getPatients,
  addPatient,
  getNonSensitivePatients
};
