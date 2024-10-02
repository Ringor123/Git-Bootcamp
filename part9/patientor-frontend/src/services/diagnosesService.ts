import axios from "axios";
import { Diagnoses } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async (): Promise<Diagnoses[]> => {
  const { data } = await axios.get<Diagnoses[]>(
    `${apiBaseUrl}/diagnoses`
  );
  return data;
};

export default {
  getAll
};

