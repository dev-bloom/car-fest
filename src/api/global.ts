import axios from "axios";
import { Entity } from "../types/common";

export const API_URL =
  process.env.NODE_ENV === "prod"
    ? "https://carfest-api.glitch.me"
    : "http://localhost:3000";

const getEndpoint = (endpoint: string) => (fn?: string) =>
  `${API_URL}/${endpoint}${fn ? `/${fn}` : ""}`;

export const defaultGet = async <T>(endpoint: string): Promise<T> => {
  const { data } = await axios.get(endpoint);
  return data;
};

export const defaultPost = async <T>(endpoint: string, body: T): Promise<T> => {
  const { data } = await axios.post(endpoint, body);
  return data;
};

export const defaultPut = async <T>(endpoint: string, body: T): Promise<T> => {
  const { data } = await axios.put(endpoint, body);
  return data;
};

export const defaultDelete = async <T>(endpoint: string): Promise<T> => {
  const { data } = await axios.delete(endpoint);
  return data;
};

export const ping = async () => defaultGet(getEndpoint("ping")());

export const getCRUD = <T extends Entity>(endpoint: string) => {
  const parseEndpoint = getEndpoint(endpoint);
  return {
    get: (id: string) => defaultGet<T>(parseEndpoint(id)),
    getAll: () => defaultGet<T[]>(parseEndpoint()),
    create: (body: T) => defaultPost<T>(parseEndpoint(), body),
    update: (body: T) => defaultPut<T>(parseEndpoint(body.id), body),
    delete: (body: T) => defaultDelete<T>(parseEndpoint(body.id)),
    parseEndpoint,
  };
};
