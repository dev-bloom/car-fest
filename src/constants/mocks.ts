import { Aspiration, CarInfo, DriveType } from "../types";

export const mockImage = "/mockImage.jpg";

export const mockCar: CarInfo = {
  id: "1",
  alias: "Obscure",
  gallery: [mockImage, mockImage, mockImage],
  likes: 12,
  specs: {
    modelYear: 2022,
    make: "BMW",
    model: "M340i XDrive",
    horsePower: 382,
    hpRPM: 5500,
    torque: 500,
    torqueRPM: 1900,
    zeroToSixty: 3.6,
    topSpeed: 255,
    displacement: 2998,
    cylinders: 6,
    cylindersLayout: "en línea",
    transmission: "8-speed automatic",
    driveType: DriveType.AWD,
    weight: 1670,
    aspiration: Aspiration.Turbocharged,
  },
  eightMile: {
    time: 11.7,
    speed: 200,
    ranking: 1,
  },
  donuts: {
    time: 45,
    amount: 12,
    ranking: 1,
  },
  social: {
    instagram: "obscure_m340i",
    tikTok: "obscure_m340i",
    youtube: "obscure_m340i",
  },
};
