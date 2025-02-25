export const intersection = (...array: number[][]): number[] => {
  const totalArray = array.length;
  const result: number[] = [];
  const map = new Map<number, number>();
  for (const item of array) {
    for (const value of item) {
      map.set(value, (map.get(value) || 0) + 1);
    }
  }
  for (const [key, value] of map.entries()) {
    if (value === totalArray) {
      result.push(key);
    }
  }

  return result;
};

