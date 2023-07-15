import { defaultGet, getCRUD } from "./global";
import { CarInfo } from "../types";

export const {
  get: getCar,
  getAll: getCars,
  create: createCar,
  update: updateCar,
  delete: deleteCar,
  parseEndpoint,
} = getCRUD<CarInfo>("cars");

export const getCarsByUser = (userId: string) =>
  defaultGet<CarInfo[]>(parseEndpoint(`uid/${userId}`));
