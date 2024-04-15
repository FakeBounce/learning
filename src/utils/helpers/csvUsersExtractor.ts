import { t } from '@lingui/macro';
import { UserForBulk } from '@services/users/interfaces';

interface MappingTable {
  [key: string]: string[];
}

interface CsvUserValidationResult {
  validRows: UserForBulk[];
  faultyRows: UserForBulk[];
}

const mappingTableUser: MappingTable = {
  firstname: ['Prénom', 'firstname', 'prenom'],
  lastname: ['Nom de naissance', 'Lastname', 'Nom de famille', 'Nom'],
  email: ['Email', 'mail'],
  login: ['Login', 'identifiant']
};

// MD = MANADATORY DATA
const mandatoryDataMessage = 'MD';
// IF = INVALID FORMAT
const invalidFormatMessage = 'IF';

function transformCsvToArrayOfObjects(
  csvArray: string[][],
  mappingTable: MappingTable
): UserForBulk[] {
  const headers = csvArray[0].map((header) => normalizeHeader(header)); // Normalize headers
  const dataRows = csvArray.slice(1);

  return dataRows.map((row) => {
    const rowData: UserForBulk = {} as UserForBulk;
    Object.entries(mappingTable).forEach(([key, headerOptions]) => {
      const matchedHeader = headers.find((header) =>
        headerOptions.some((option) => normalizeHeader(option) === header)
      );
      if (matchedHeader) {
        const headerIndex = headers.indexOf(matchedHeader);
        rowData[key as keyof UserForBulk] = row[headerIndex];
      }
    });
    return rowData;
  });
}
function validateRows(arrayOfObjects: UserForBulk[]): CsvUserValidationResult {
  const faultyRows: UserForBulk[] = [];
  const validRows: UserForBulk[] = arrayOfObjects.filter((row) => {
    let isValidRow = true;

    // Iterate over each field of the row
    Object.entries(row).forEach(([fieldName, fieldValue]) => {
      // Check mandatory fields
      const mandatoryFields: (keyof UserForBulk)[] = ['lastname', 'firstname', 'login', 'email'];
      if (
        (mandatoryFields.includes(fieldName as keyof UserForBulk) && !fieldValue) ||
        fieldValue === ''
      ) {
        row[fieldName as keyof UserForBulk] = mandatoryDataMessage;
        isValidRow = false;
      }

      // Validate email format
      if (fieldName === 'email' && fieldValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
        row[fieldName as keyof UserForBulk] = invalidFormatMessage;
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

function checkForMissingColumns(firstRow: UserForBulk, mappingTable: MappingTable): void {
  const normalizedFirstRow: UserForBulk = {} as UserForBulk;
  Object.entries(firstRow).forEach(([key, value]) => {
    normalizedFirstRow[normalizeHeader(key) as keyof UserForBulk] = value;
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

export function extractUserFromCsv(csvArray: string[][]): CsvUserValidationResult {
  const arrayOfObjects = transformCsvToArrayOfObjects(csvArray, mappingTableUser);
  checkForMissingColumns(arrayOfObjects[0], mappingTableUser);
  return validateRows(arrayOfObjects);
}
