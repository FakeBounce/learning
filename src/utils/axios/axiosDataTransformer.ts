import { camelizeObject } from '@utils/helpers/convertCasing';

export const transformDataFromAPI = (data: any) => {
  const newData = { ...data };
  if (data.composition) {
    newData.composition = JSON.parse(data.composition);
  }

  if (data.rows && data.rows.length > 0 && data.rows[0].composition) {
    newData.rows = data.rows.map((row: any) => {
      return {
        ...row,
        composition: JSON.parse(row.composition)
      };
    });
  }

  return camelizeObject(newData);
};
