import { defaultGet, defaultPatch, defaultPost, getCRUD } from "./global";
import { CarInfo, QR } from "../types";

export const {
  get: getQR,
  getAll: getQRList,
  create: createQR,
  update: updateQR,
  patch: patchQR,
  delete: deleteQR,
  parseEndpoint,
} = getCRUD<QR>("qr");

export const getEmptyQRList = () => defaultGet<QR[]>(parseEndpoint(`empty`));

export const generateEmptyQRs = () =>
  defaultPost<QR[]>(parseEndpoint(`/batch`));

export const assignQR = (QRId: string, carId: string, uid: string) =>
  defaultPatch<QR & Pick<CarInfo, "uid">>(parseEndpoint(QRId), {
    id: QRId,
    car: carId,
    uid,
  });

export const getQRForCar = (carId: string) =>
  defaultGet<QR>(parseEndpoint(`/car/${carId}`));
