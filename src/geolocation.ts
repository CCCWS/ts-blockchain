interface GeolocationAPI {
  getCurrentPosition(
    success: GeolocationPosition,
    error?: GeolocationPositionError,
    option?: Options
  ): void;

  watchPosition(
    success: GeolocationPosition,
    error?: GeolocationPositionError,
    option?: Options
  ): number;

  clearWatch(id: number): void;
}

interface GeolocationPosition {
  (position: PositionInterface): void;
}

interface PositionInterface {
  readonly coords: Coords;
  readonly timestamp: number;
}

interface Coords {
  readonly latitude: number;
  readonly longitude: number;
  readonly altitude: number | null;
  readonly accuracy: number;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly speed: number | null;
}

interface Options {
  maximumAge: number;
  timeout: number;
  enableHighAccuracy: boolean;
}

interface GeolocationPositionError {
  (positionError: PositionErrorInterface): void;
}

interface PositionErrorInterface {
  readonly code: number;
  readonly message: string;
  readonly PERMISSION_DENIED: number;
  readonly POSITION_UNAVAILABLE: number;
  readonly TIMEOUT: number;
}

class UserGeolocation implements GeolocationAPI {
  getCurrentPosition = (
    success: GeolocationPosition,
    error?: GeolocationPositionError,
    option?: Options
  ) => {
    console.log(success);
    if (error) console.log(error);
    if (option) console.log(option);
  };

  watchPosition = (
    success: GeolocationPosition,
    error?: GeolocationPositionError,
    option?: Options
  ) => {
    console.log(success);
    if (error) console.log("error");
    if (option) console.log(option);

    return 0;
  };

  clearWatch = (id: number) => {
    console.log(`${id} : 등록 해제`);
  };
}

const userGeolocation = new UserGeolocation();

const success = (coords: Coords, timestamp: number): void => {
  console.log("test");
};
const error = () => {};
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

// userGeolocation.getCurrentPosition(success);
// userGeolocation.getCurrentPosition(success, error);
// userGeolocation.getCurrentPosition(success, error, options);
