export default function getTimeDistance({
  currentLocation,
  distanceLocation,
}: {
  currentLocation: number[];
  distanceLocation: { longitude: number; latitude: number };
}) {
  const distance =
    Math.abs(currentLocation[0] - distanceLocation?.longitude) +
    Math.abs(currentLocation[1] - distanceLocation?.latitude);

  return Math.round(distance * 1000);
}
