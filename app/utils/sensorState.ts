export const sensorState = ({ date }: any) => {
  const currentTimestamp = Date.now();
  const duration = currentTimestamp - new Date(date).getTime();
  const minutes = Math.floor(duration / 1000 / 60);
  if (minutes > 60) {
    return false;
  }
  return true;
};
