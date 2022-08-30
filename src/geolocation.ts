interface GeolocationFunc {
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

  clearWatch(id): void;
}

interface GeolocationPosition {
  (position: PositionInterface): void;
}

interface PositionInterface {
  readonly coords: Coords;
  readonly timestamp: number;
}

interface Coords {
  readonly latitude: number; //위도
  readonly longitude: number; //경도
  readonly altitude: number | null; //위치의 고도를 미터 단위로 표시
  readonly accuracy: number; //미터로 표시된 및 속성의 정확도
  readonly altitudeAccuracy: number | null; //미터로 표현된 정확도
  readonly heading: number | null; //장치가 향하고 있는 방향을
  readonly speed: number | null; //초당 미터 단위로 장치의 속도
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
  readonly code: ErrorCode;
  readonly message: string;
}

type ErrorCode = {
  PERMISSION_DENIED?: 1;
  POSITION_UNAVAILABLE?: 2;
  TIMEOUT?: 3;
};

class UserGeolocation implements GeolocationFunc {
  getCurrentPosition(
    success: GeolocationPosition,
    error?: GeolocationPositionError,
    option?: Options
  ) {}

  watchPosition(
    success: GeolocationPosition,
    error?: GeolocationPositionError,
    option?: Options
  ) {
    return 1;
  }

  clearWatch(id: number) {
    console.log(`${id} : 등록 해제`);
  }
}

const user = new UserGeolocation();

interface Test {
  test: Func;
}

interface Func {
  (item: number): void;
}

class ABC implements Test {
  constructor() {}
  test() {
    console.log("test");
  }
}

const abc = new ABC();

abc.test();

type Tttest = {
  a?: 1;
  b?: 2;
  c?: 3;
};

let tttest: Tttest;

tttest = { b: 2, c: 3 };
