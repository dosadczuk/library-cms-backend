import { Transform } from 'class-transformer';

export const TransformArray = <T>(transform: (value: string) => T) => {
  return Transform((params) => {
    const { obj, key } = params;

    const value = String(obj[key]);
    if (value == null) {
      return value;
    }

    return value.split(',').map(transform);
  });
};
