import { CarEvent } from "../../types";
import { Entity } from "../../types/common";

export type BadgeType = {
  event?: CarEvent;
  year?: Date;
  car?: string;
  qr: string;
};

export type BannerColor = {
  color: string;
  highlight: string;
};

export type BannerColors = {
  golden: BannerColor;
  silver: BannerColor;
  bronze: BannerColor;
  default: BannerColor;
};
