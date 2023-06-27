import { Entity } from "./common";

export type Customer = {
  names: string;
  lastNames: string;
  idNumber: number | null;
  vehicleType: string;
  plate: string;
  dreamCar?: string;
  dreamBike?: string;
  phone: string;
  email: string;
} & Entity;
