export const getTimeStampInSecond = () => {
  return Math.floor(Date.now() / 1000);
};

export const secondToMinute = (second: number) => Math.floor(second / 60);
