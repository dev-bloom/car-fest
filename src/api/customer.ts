import { getCRUD } from "./global";
import { Customer } from "../types/customer";

export const {
  get: getCustomer,
  getAll: getCustomers,
  create: createCustomer,
  update: updateCustomer,
  delete: deleteCustomer,
} = getCRUD<Customer>("customers");
