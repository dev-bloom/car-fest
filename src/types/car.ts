import { Entity } from "./common";

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

export type SocialInfo = {
  instagram: string;
  tikTok: string;
  youtube: string;
  facebook?: string;
  webpage?: string;
};

export type SpecsInfo = {
  modelYear: number | null;
  make: string;
  model: string;
  horsePower: number | null;
  hpRPM: number | null;
  torque: number | null;
  torqueRPM: number | null;
  zeroToSixty: number | null;
  topSpeed: number | null;
  displacement: number | null;
  cylinders: number | null;
  cylindersLayout: string;
  transmission: string;
  driveType: DriveType;
  weight: number | null;
  aspiration: Aspiration;
};

export type CarInfoEvents = {
  exhibition?: {
    ranking: number | null;
    stand: string;
  };
  pops?: {
    ranking: number | null;
  };
  limbo?: {
    ranking: number | null;
    record: number | null;
  };
  slalom?: {
    ranking: number | null;
    record: number | null;
  };
  eightMile?: {
    time: number | null;
    speed: number | null;
    ranking: number | null;
  };
  donuts?: {
    time: number | null;
    amount: number | null;
    ranking: number | null;
  };
};

export type CarInfo = {
  alias: string;
  gallery: string[];
  likes?: number | null;
  specs: SpecsInfo;
  events: (keyof CarInfoEvents)[];
  social: SocialInfo;
} & Entity &
  CarInfoEvents;

export type CarInfoReferences = Pick<CarInfo, "specs" | "social">;
