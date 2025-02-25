import { Transform } from 'class-transformer';
import { toArray } from '../utils/converter';

export const TransformToArray = () => {
  return Transform(({ value }) => toArray(value));
};

export const TransformToArrayOrString = () => {
  return Transform(({ value }: { value: unknown }) => {
    if (typeof value === 'string' && value === 'all') {
      return value;
    }
    value = toArray(value).map(Number);
    return value;
  });
};
