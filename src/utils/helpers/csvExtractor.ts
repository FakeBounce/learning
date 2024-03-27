import { isValid } from 'date-fns';
import { t } from '@lingui/macro';

interface MappingTable {
  [key: string]: string[];
}

interface CsvRow {
  externalId?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  city?: string;
  birthDate?: string;
  birthName?: string;
}

interface CsvValidationResult {
  validRows: CsvRow[];
  faultyRows: CsvRow[];
}

const mappingTableApplicant: MappingTable = {
  externalId: ['Id externe', 'External id'],
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
  birthDate: ['Date de naissance', 'Birth date'],
  birthName: ['Nom de naissance', 'Birth name']
};

const mappingTableTester: MappingTable = {
  externalId: ['Id externe', 'External id'],
  firstname: ['Firstname', 'prénom'],
  lastname: ['Nom de naissance', 'Lastname'],
  email: ['Email', 'Email'],
  phone: ['Téléphone', 'Phone', 'Phone number', 'Numéro de téléphone']
};

const mandatoryDataMessage = t`Donnée obligatoire`;
const invalidFormatMessage = t`Format incorrect`;

function transformCsvToArrayOfObjects(csvArray: string[][], mappingTable: MappingTable): CsvRow[] {
  const headers = csvArray[0].map((header) => normalizeHeader(header)); // Normalize headers
  const dataRows = csvArray.slice(1);

  return dataRows.map((row) => {
    const rowData: CsvRow = {};
    Object.entries(mappingTable).forEach(([key, headerOptions]) => {
      const matchedHeader = headers.find((header) =>
        headerOptions.some((option) => normalizeHeader(option) === header)
      );
      if (matchedHeader) {
        const headerIndex = headers.indexOf(matchedHeader);
        rowData[key as keyof CsvRow] = row[headerIndex];
      }
    });
    return rowData;
  });
}

function validateRows(arrayOfObjects: CsvRow[]): CsvValidationResult {
  const faultyRows: CsvRow[] = [];
  const validRows: CsvRow[] = arrayOfObjects.filter((row) => {
    let isValidRow = true;

    // Iterate over each field of the row
    Object.entries(row).forEach(([fieldName, fieldValue]) => {
      // Check mandatory fields
      const mandatoryFields: (keyof CsvRow)[] = ['lastname', 'firstname', 'birthDate', 'email'];
      if (mandatoryFields.includes(fieldName as keyof CsvRow) && !fieldValue) {
        row[fieldName as keyof CsvRow] = mandatoryDataMessage;
        faultyRows.push(row);
        isValidRow = false;
      }

      // Validate phone format
      if (fieldName === 'phone' && fieldValue && !/^\+?[0-9\s-]+$/.test(fieldValue)) {
        row[fieldName] = invalidFormatMessage;
        faultyRows.push(row);
        isValidRow = false;
      }

      // Validate email format
      if (fieldName === 'email' && fieldValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
        row[fieldName] = invalidFormatMessage;
        faultyRows.push(row);
        isValidRow = false;
      }

      // Validate birthdate format
      if (fieldName === 'birthDate' && fieldValue && !isValid(new Date(fieldValue))) {
        row[fieldName] = invalidFormatMessage;
        faultyRows.push(row);
        isValidRow = false;
      }
    });

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

function checkForMissingColumns(firstRow: CsvRow, mappingTable: MappingTable): void {
  const normalizedFirstRow: CsvRow = {};
  Object.entries(firstRow).forEach(([key, value]) => {
    normalizedFirstRow[normalizeHeader(key) as keyof CsvRow] = value;
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
    const errorMessage = t`Les colonnes ${missingColumns.join(
      ', '
    )} sont manquantes dans le fichier CSV.`;
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
