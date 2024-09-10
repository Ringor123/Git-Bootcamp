import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";

// interface Result {
//   weight: number,
//   height: number,
//   bmi: string
// }

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  try {
    return res.status(200).json({
      weight,
      height,
      bmi: calculateBmi(weight, height),
    });
  } catch (error: unknown) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
