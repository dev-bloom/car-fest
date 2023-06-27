import { getCRUD } from "./global";
import { Media } from "../types";

export const {
  get: getMedia,
  getAll: getMedias,
  create: createMedia,
  update: updateMedia,
  delete: deleteMedia,
} = getCRUD<Media>("media");
