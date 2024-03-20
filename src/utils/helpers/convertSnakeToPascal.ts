import transform from 'lodash/transform';

/**
Convert snake_case to PascalCase
 **/
export const convertSnakeToPascal = (key: string) => {
  return key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

export const pascalizeObject = (obj: any) =>
  transform(obj, (acc: any, value, key, target) => {
    const camelKey = Array.isArray(target) ? key : convertSnakeToPascal(String(key));

    acc[camelKey] = typeof value === 'object' && value !== null ? pascalizeObject(value) : value;
  });
