/**
 * Sprawdza, czy podana wartość to string.
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

/**
 * Sprawdza, czy podana wartość to tablica.
 */
export const isArray = (value: unknown): value is Array<unknown> => {
  return typeof value === 'object' && Array.isArray(value);
};

/**
 * Sprawdza, czy podana wartość to JSON.
 */
export const isJson = (value: string) => {
  value = typeof value !== 'string' ? JSON.stringify(value) : value;

  try {
    value = JSON.parse(value);
  } catch (e) {
    return false;
  }

  return typeof value === 'object' && value !== null;
};
