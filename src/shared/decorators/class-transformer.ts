import { Transform } from 'class-transformer';

export const TransformNumberArray = () => {
  return Transform((params) => {
    const { obj, key } = params;

    const value = String(obj[key]);
    if (value == null) {
      return value;
    }

    return value.split(',').map(Number);
  });
};
