import { Aspiration, CarInfo, CarInfoEvents, DriveType } from "../types";

export const mockImage = "/mockImage.jpg";

export const mockCarEvents: CarInfoEvents = {
  exhibition: {
    ranking: 1,
    stand: "1",
  },
  pops: {
    ranking: 1,
  },
  limbo: {
    ranking: 1,
    record: 1,
  },
  slalom: {
    ranking: 1,
    record: 1,
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
};

export const mockCar: CarInfo = {
  id: "1",
  alias: "Obscure",
  gallery: [mockImage, mockImage, mockImage],
  likes: 12,
  events: ["eightMile", "donuts"],
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
  ...mockCarEvents,
  social: {
    instagram: "obscure_m340i",
    tikTok: "obscure_m340i",
    youtube: "obscure_m340i",
  },
};
