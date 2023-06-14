export enum Aspiration {
  Turbocharged = "Turbocargado",
  Supercharged = "Supercargado",
  NaturallyAspirated = "Naturalmente Aspirado",
}

export enum DriveType {
  AWD = "AWD",
  RWD = "RWD",
  FWD = "FWD",
}

export type CarInfo = {
  id: string;
  alias: string;
  gallery: string[];
  likes: number;
  specs: {
    modelYear: string;
    make: string;
    model: string;
    horsePower: number;
    hpRPM: number;
    torque: number;
    torqueRPM: number;
    zeroToSixty: number;
    topSpeed: number;
    displacement: number;
    cylinders: number;
    cylindersLayout: string;
    transmission: string;
    driveType: DriveType;
    weight: number;
    aspiration: Aspiration;
  };
  exhibition?: {
    ranking: number;
    stand: string;
  };
  pops?: {
    ranking: number;
  };
  eightMile?: {
    time: number;
    speed: number;
    ranking: number;
  };
  donuts?: {
    time: number;
    amount: number;
    ranking: number;
  };
  social: {
    instagram: string;
    tikTok: string;
    youtube: string;
  };
};
