import express from "express";
import patientsService from "../services/patientsService";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    console.log(req.body);

    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
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

router.post("/:id/entries", (req, res) => {
  const { id } = req.params;
  console.log("Request body:", req.body);   
  console.log("Request params:", req.params); 
  console.log("Request headers:", req.headers); 

  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addEntry(newEntry, id);
    if (addedEntry) {
      res.json(addedEntry);
    } else {
      res.status(404).send({ error: "Patient not found" });
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
