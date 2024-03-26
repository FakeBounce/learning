import { Applicant, SingleApplicantFromApi } from '@services/applicants/interfaces';
import { pascalizeObject } from '@utils/helpers/convertSnakeToPascal';

/**
 * Convert the values of the applicant object to the correct format
 **/
export const convertApplicantValues = (applicant: SingleApplicantFromApi) => {
  const convertedApplicant = pascalizeObject(applicant);

  Object.keys(convertedApplicant.currentValues).forEach((key) => {
    convertedApplicant[key] = convertedApplicant.currentValues[key];
  });

  convertedApplicant.currentValues = undefined;

  return convertedApplicant as Applicant;
};
