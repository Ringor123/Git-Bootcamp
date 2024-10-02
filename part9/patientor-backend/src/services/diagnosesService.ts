import diagnoses from '../../data/diagnoses';

import { Diagnoses } from '../types';


const getDiagnoses = (): Diagnoses[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};
