export const getGeoLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: { coords: { latitude: number; longitude: number } }) => {
        localStorage.setItem("lat", `${position.coords.latitude}`);
        localStorage.setItem("long", `${position.coords.longitude}`);
      },
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};
