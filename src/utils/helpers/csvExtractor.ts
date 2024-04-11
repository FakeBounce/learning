import { isValid } from 'date-fns';
import { t } from '@lingui/macro';
import { ApplicantForBulk } from '@services/applicants/interfaces';

interface MappingTable {
  [key: string]: string[];
}

interface CsvValidationResult {
  validRows: ApplicantForBulk[];
  faultyRows: ApplicantForBulk[];
}

const mappingTableApplicant: MappingTable = {
  externalId: ['Id externe', 'External id', 'externalId'],
  firstname: ['Prénom', 'firstname', 'prenom'],
  lastname: ['Nom de naissance', 'Lastname', 'Nom de famille', 'Nom'],
  email: ['Email', 'Email'],
  phone: [
    'Téléphone',
    'Phone',
    'Phone number',
    'Numéro de téléphone',
    'Telephone',
    'Numero de telephone'
  ],
  city: ['Ville', 'City'],
  birthDate: ['Date de naissance', 'Birth date', 'birthDate'],
  birthName: ['Nom de naissance', 'Birth name', 'birthName']
};

const mappingTableTester: MappingTable = {
  externalId: ['Id externe', 'External id'],
  firstname: ['Firstname', 'prénom'],
  lastname: ['Nom de naissance', 'Lastname'],
  email: ['Email', 'Email'],
  phone: ['Téléphone', 'Phone', 'Phone number', 'Numéro de téléphone']
};

// MD = MANADATORY DATA
const mandatoryDataMessage = 'MD';
// IF = INVALID FORMAT
const invalidFormatMessage = 'IF';

function transformCsvToArrayOfObjects(
  csvArray: string[][],
  mappingTable: MappingTable
): ApplicantForBulk[] {
  const headers = csvArray[0].map((header) => normalizeHeader(header)); // Normalize headers
  const dataRows = csvArray.slice(1);

  return dataRows.map((row) => {
    const rowData: ApplicantForBulk = {} as ApplicantForBulk;
    Object.entries(mappingTable).forEach(([key, headerOptions]) => {
      const matchedHeader = headers.find((header) =>
        headerOptions.some((option) => normalizeHeader(option) === header)
      );
      if (matchedHeader) {
        const headerIndex = headers.indexOf(matchedHeader);
        rowData[key as keyof ApplicantForBulk] = row[headerIndex];
      }
    });
    return rowData;
  });
}

function validateRows(arrayOfObjects: ApplicantForBulk[]): CsvValidationResult {
  const faultyRows: ApplicantForBulk[] = [];
  const validRows: ApplicantForBulk[] = arrayOfObjects.filter((row) => {
    let isValidRow = true;

    // Iterate over each field of the row
    Object.entries(row).forEach(([fieldName, fieldValue]) => {
      // Check mandatory fields
      const mandatoryFields: (keyof ApplicantForBulk)[] = [
        'lastname',
        'firstname',
        'birthDate',
        'email'
      ];
      if (mandatoryFields.includes(fieldName as keyof ApplicantForBulk) && !fieldValue) {
        row[fieldName as keyof ApplicantForBulk] = mandatoryDataMessage;
        isValidRow = false;
      }

      // Validate phone format
      if (fieldName === 'phone' && fieldValue && !/^\+?[0-9\s-]+$/.test(fieldValue)) {
        row[fieldName as keyof ApplicantForBulk] = invalidFormatMessage;
        isValidRow = false;
      }

      // Validate email format
      if (fieldName === 'email' && fieldValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
        row[fieldName as keyof ApplicantForBulk] = invalidFormatMessage;
        isValidRow = false;
      }

      // Validate birthdate format
      if (
        fieldName === 'birthDate' &&
        fieldValue &&
        !isValid(new Date(fieldValue)) &&
        fieldValue !== ''
      ) {
        row[fieldName as keyof ApplicantForBulk] = invalidFormatMessage;
        isValidRow = false;
      }
    });

    // If the row is not valid, push it to faultyRows
    if (!isValidRow) {
      faultyRows.push(row);
    }

    return isValidRow;
  });

  return { validRows, faultyRows };
}

function normalizeHeader(header: string): string {
  return header
    .toLowerCase()
    .replace(/[^a-z0-9é]/g, '')
    .replace(/\s+/g, '_');
}

function checkForMissingColumns(firstRow: ApplicantForBulk, mappingTable: MappingTable): void {
  const normalizedFirstRow: ApplicantForBulk = {} as ApplicantForBulk;
  Object.entries(firstRow).forEach(([key, value]) => {
    normalizedFirstRow[normalizeHeader(key) as keyof ApplicantForBulk] = value;
  });

  const missingColumns: string[] = [];
  Object.entries(mappingTable).forEach(([key, headerOptions]) => {
    const foundHeader = headerOptions.some((option) => {
      const normalizedOption = normalizeHeader(option);
      return normalizedOption in normalizedFirstRow;
    });

    if (!foundHeader) {
      missingColumns.push(mappingTable[key][0]); // Use the first value of the corresponding mappingTable
    }
  });

  if (missingColumns.length > 0) {
    const errorMessage = t`Une ou plusieurs colonnes sont manquantes dans le fichier CSV: ${missingColumns.join(
      ', '
    )}`;
    throw new Error(errorMessage);
  }
}

export function extractApplicantsFromCsv(csvArray: string[][]): CsvValidationResult {
  const arrayOfObjects = transformCsvToArrayOfObjects(csvArray, mappingTableApplicant);
  checkForMissingColumns(arrayOfObjects[0], mappingTableApplicant);
  return validateRows(arrayOfObjects);
}

export function extractExternalTestersFromCsv(csvArray: string[][]): CsvValidationResult {
  const arrayOfObjects = transformCsvToArrayOfObjects(csvArray, mappingTableTester);
  checkForMissingColumns(arrayOfObjects[0], mappingTableTester);
  return validateRows(arrayOfObjects);
}
