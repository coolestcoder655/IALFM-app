import * as Location from "expo-location";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const getLocation = async (): Promise<Coordinates | undefined> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission not granted!");
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};

export { getLocation };
export type { Coordinates };
