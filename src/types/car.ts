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
  modelYear: number;
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

export type CarInfo = {
  alias: string;
  gallery: string[];
  likes?: number;
  specs?: SpecsInfo;
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
  social?: SocialInfo;
} & Entity;

export type CarInfoReferences = Pick<CarInfo, "specs" | "social">;
