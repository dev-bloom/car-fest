import axios from "axios";

export const API_URL =
  process.env.NODE_ENV === "prod"
    ? "https://carfest-api.glitch.me/api"
    : "http://localhost:3000/api";

export const getEndpoint = (endpoint: string) => (fn?: string) =>
  `${API_URL}/${endpoint}${fn && `/${fn}`}`;

export const defaultGet = async (endpoint: string) => {
  const { data } = await axios.get(endpoint);
  return data;
};

export const defaultPost = async <T>(endpoint: string, body: T) => {
  const { data } = await axios.post(endpoint, body);
  return data;
};

export const defaultPut = async <T>(endpoint: string, body: T) => {
  const { data } = await axios.put(endpoint, body);
  return data;
};
