import transform from 'lodash/transform';

/**
Convert snake_case to camelCase
 **/
export const convertSnakeToCamel = (key: string) => {
  return key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

export const camelizeObject = (obj: any) =>
  transform(obj, (acc: any, value, key, target) => {
    const camelKey = Array.isArray(target) ? key : convertSnakeToCamel(String(key));

    acc[camelKey] = typeof value === 'object' && value !== null ? camelizeObject(value) : value;
  });

/**
 Convert camelCase to snake_case
 **/
export const convertCamelToSnake = (key: string) => {
  return key
    .split(/\.?(?=[A-Z])/)
    .join('_')
    .toLowerCase();
};

export const snakizeObject = (obj: any) =>
  transform(obj, (acc: any, value, key, target) => {
    const camelKey = Array.isArray(target) ? key : convertCamelToSnake(String(key));

    acc[camelKey] =
      typeof value === 'object' && value !== null && !(value instanceof File)
        ? snakizeObject(value)
        : value;
  });
