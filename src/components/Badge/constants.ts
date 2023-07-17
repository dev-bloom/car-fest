import { CarInfoEvents } from "../../types";
import { BadgeType, BannerColors } from "./types";

export const bannerColors: BannerColors = {
  golden: {
    color: "#D4AF37",
    highlight: "#FFCC00",
  },
  silver: {
    color: "#eee",
    highlight: "#bcc6cc",
  },
  bronze: {
    color: "#9C7A3C",
    highlight: "#B08D57",
  },
  default: {
    color: "white",
    highlight: "white",
  },
};

export const eventNames: Record<keyof CarInfoEvents, string> = {
  eightMile: "1/8 Mile",
  pops: "Pops & Bangs",
  slalom: "Slalom",
  limbo: "Limbo",
  donuts: "Donuts",
  exhibition: "Exhibition",
};
export const defaultBadge = {} as BadgeType;
