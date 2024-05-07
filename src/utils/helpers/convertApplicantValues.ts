import { Applicant } from '@services/applicants/interfaces';
import { camelizeObject } from '@utils/helpers/convertCasing';

/**
 * Convert the values of the applicant object to the correct format
 **/
export const convertApplicantValues = (applicant: Applicant): Applicant => {
  const convertedApplicant = camelizeObject(applicant);

  if (convertedApplicant.currentValues) {
    Object.keys(convertedApplicant.currentValues).forEach((key) => {
      convertedApplicant[key] = convertedApplicant.currentValues[key];
    });

    convertedApplicant.currentValues = undefined;
  }

  return convertedApplicant as Applicant;
};

export const convertApplicantArrayValues = (applicant: Applicant[]): Applicant[] => {
  return applicant.map((applicant) => convertApplicantValues(applicant));
};
