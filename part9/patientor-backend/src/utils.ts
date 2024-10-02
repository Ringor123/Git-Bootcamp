import {
  Diagnoses,
  Entry,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  PatientWithoutId,
} from "./types";

export const toNewPatient = (object: unknown): PatientWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: PatientWithoutId = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const type = parseType(object.type);

    switch (type) {
      case "Hospital":
        if (!("discharge" in object)) {
          throw new Error("Missing discharge information for Hospital entry");
        }
        return {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type: "Hospital",
          discharge: parseDischarge(object.discharge),
          diagnosisCodes: "diagnosisCodes" in object ? parseDiagnosisCodes(object.diagnosisCodes) : undefined,
        };
      case "OccupationalHealthcare":
        if (!("employerName" in object)) {
          throw new Error("Missing employerName for OccupationalHealthcare entry");
        }

        const occupationalEntry: EntryWithoutId = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type: "OccupationalHealthcare",
          employerName: parseEmployerName(object.employerName),
          diagnosisCodes: "diagnosisCodes" in object ? parseDiagnosisCodes(object.diagnosisCodes) : undefined,
        };

        if ("sickLeave" in object) {
          occupationalEntry.sickLeave = parseSickLeave(object.sickLeave);
        }

        return occupationalEntry;
      case "HealthCheck":
        if (!("healthCheckRating" in object)) {
          throw new Error("Missing healthCheckRating for HealthCheck entry");
        }
        return {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          diagnosisCodes: "diagnosisCodes" in object ? parseDiagnosisCodes(object.diagnosisCodes) : undefined,
        };
      default:
        throw new Error("Invalid entry type");
    }
  } else {
    throw new Error("Incorrect data: missing fields for Entry");
  }
};

const isHealthRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== "number" || !isHealthRating(rating)) {
    throw new Error("Incorrect or missing health check rating");
  }
  return rating;
};

const isEntry = (entry: unknown): entry is Entry[] => {
  if (!Array.isArray(entry)) {
    return false;
  }
  return entry.every(
    (e) =>
      e &&
      typeof e === "object" &&
      "type" in e &&
      (e.type === "Hospital" ||
        e.type === "OccupationalHealthcare" ||
        e.type === "HealthCheck")
  );
};

const parseSickLeave = (
  sickLeave: unknown
): { startDate: string; endDate: string } => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (!("startDate" in sickLeave) || !("endDate" in sickLeave)) {
    throw new Error("Incorrect or missing data");
  }

  const { startDate, endDate } = sickLeave as {
    startDate: unknown;
    endDate: unknown;
  };

  if (!isString(startDate) || !isDate(startDate)) {
    throw new Error("Incorrect or missing startDate");
  }

  if (!isString(endDate) || !isDate(endDate)) {
    throw new Error("Incorrect or missing endDate");
  }

  return { startDate, endDate };
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(
      "Incorrect or missing data: employerName must be a non-empty string"
    );
  }
  return employerName;
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge data");
  }
  if (!("date" in discharge) || !("criteria" in discharge)) {
    throw new Error("Incorrect or missing discharge fields");
  }

  const { date, criteria } = discharge as { date: unknown; criteria: unknown };

  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing discharge date");
  }

  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing discharge criteria");
  }

  return { date, criteria };
};

const parseEntries = (entries: unknown): Array<Entry> => {
  if (!isEntry(entries)) {
    throw new Error("Incorrect data: entries format is invalid");
  }
  return entries;
};

const isType = (
  type: unknown
): type is "HealthCheck" | "Hospital" | "OccupationalHealthcare" => {
  const validTypes = ["HealthCheck", "Hospital", "OccupationalHealthcare"];
  return typeof type === "string" && validTypes.includes(type);
};

const parseType = (
  type: unknown
): "HealthCheck" | "Hospital" | "OccupationalHealthcare" => {
  if (!isType(type)) {
    throw new Error("Incorrect or missing data");
  }
  return type;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnoses["code"]> => {
  if (!Array.isArray(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnosis codes");
  }
  return diagnosisCodes as Array<Diagnoses["code"]>;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((gender) => gender.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

export default {
  toNewEntry,
  toNewPatient
};