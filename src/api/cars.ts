import { getCRUD } from "./global";
import { CarInfo } from "../types";

export const {
  get: getCar,
  getAll: getCars,
  create: createCar,
  update: updateCar,
  delete: deleteCar,
} = getCRUD<CarInfo>("cars");
