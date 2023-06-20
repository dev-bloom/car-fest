import { defaultGet, defaultPost, defaultPut, getEndpoint } from "./global";
import { CarInfo } from "../types";

const parseEndpoint = getEndpoint("car");

export const getCar = async (id: string) => defaultGet(parseEndpoint(id));

export const getCars = async () => defaultGet(parseEndpoint());

export const createCar = async (car: CarInfo) =>
  defaultPost<CarInfo>(parseEndpoint(), car);

export const updateCar = async (car: CarInfo) =>
  defaultPut<CarInfo>(parseEndpoint(car.id), car);
