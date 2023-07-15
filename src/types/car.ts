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

export type CarEvent = {
  ranking: number | null;
  type: keyof CarInfoEvents;
  stand?: string;
  record?: number;
  time?: number;
  speed?: number;
  amount?: number;
};

export type CarInfoEvents = {
  exhibition?: CarEvent;
  pops?: CarEvent;
  limbo?: CarEvent;
  slalom?: CarEvent;
  eightMile?: CarEvent;
  donuts?: CarEvent;
};

export type CarInfo = {
  uid: string;
  alias: string;
  gallery: string[];
  likes?: number | null;
  specs: SpecsInfo;
  events: (keyof CarInfoEvents)[];
  social: SocialInfo;
} & Entity &
  CarInfoEvents;

export type CarInfoReferences = Pick<CarInfo, "specs" | "social">;
