import { Entity } from "./common";

export enum IdType {
  CC = "cc",
  CE = "ce",
  PASSPORT = "passport",
}

export type Representative = {
  name: string;
  email: string;
  idNumber: number | null;
  idType: IdType;
  role: string;
} & Entity;

export type Media = {
  name: string;
  type: string;
  social: {
    instagram: string;
    facebook: string;
    webpage: string;
    tikTok: string;
    youtube: string;
  };
  representatives: Representative[];
  letter: string;
} & Entity;

export type MediaInfoReferences = Pick<Media, "social" | "representatives">;
