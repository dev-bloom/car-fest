import { defaultGet, defaultPost, defaultPut, getEndpoint } from "./global";
import { Media } from "../types";

const parseEndpoint = getEndpoint("media");

export const getMedia = async (id: string) => defaultGet(parseEndpoint(id));

export const getMedias = async () => defaultGet(parseEndpoint());

export const createMedia = async (media: Media) =>
  defaultPost(parseEndpoint(), media);

export const updateMedia = async (media: Media) =>
  defaultPut(parseEndpoint(media.id), media);
