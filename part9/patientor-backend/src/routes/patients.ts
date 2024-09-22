import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEnty = patientsService.addPatient(newPatientEntry);
    res.json(addedEnty);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404).send({ error: "Patient not found" });
  }
});

export default router;
