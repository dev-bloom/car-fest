import {
  Aspiration,
  CarInfo,
  CarInfoReferences,
  DriveType,
  SocialInfo,
  SpecsInfo,
} from "../../types";

export const carInfoSpecsConstraints: Partial<Record<keyof SpecsInfo, any>> = {
  modelYear: {
    presence: {
      allowEmpty: false,
      message: "^El año es requerido",
    },
    numericality: {
      onlyInteger: true,
      greaterThan: 1900,
      lessThanOrEqualTo: new Date().getFullYear() + 1,
      notGreaterThan: "^El año debe ser mayor a %{count}",
      notLessThanOrEqualTo: "^El año debe ser menor o igual a %{count}",
    },
  },
  make: {
    presence: {
      allowEmpty: false,
      message: "^La marca es requerida",
    },
    length: {
      minimum: 2,
      maximum: 20,
      tooShort: "^La marca debe tener al menos %{count} caracteres",
      tooLong: "^La marca debe tener menos de %{count} caracteres",
    },
  },
  model: {
    presence: {
      allowEmpty: false,
      message: "^El modelo es requerida",
    },
    length: {
      minimum: 2,
      maximum: 20,
      tooShort: "^El modelo debe tener al menos %{count} caracteres",
      tooLong: "^El modelo debe tener menos de %{count} caracteres",
    },
  },
};

export const carInfoSocialConstraints: Partial<Record<keyof SocialInfo, any>> =
  {
    instagram: {
      presence: {
        allowEmpty: false,
        message: "^La marca es requerida",
      },
      length: {
        minimum: 2,
        maximum: 20,
        tooShort: "^La marca debe tener al menos %{count} caracteres",
        tooLong: "^La marca debe tener menos de %{count} caracteres",
      },
    },
    tikTok: {
      presence: {
        allowEmpty: true,
        message: "^La marca es requerida",
      },
      length: {
        minimum: 2,
        maximum: 20,
        tooShort: "^La marca debe tener al menos %{count} caracteres",
        tooLong: "^La marca debe tener menos de %{count} caracteres",
      },
    },
    youtube: {
      presence: {
        allowEmpty: true,
        message: "^La marca es requerida",
      },
      length: {
        minimum: 2,
        maximum: 20,
        tooShort: "^La marca debe tener al menos %{count} caracteres",
        tooLong: "^La marca debe tener menos de %{count} caracteres",
      },
    },
  };

export const carInfoConstraints = {
  alias: {
    presence: true,
  },
  gallery: {
    presence: true,
  },
};

export const carInfoChildrenConstraints: Record<keyof CarInfoReferences, any> =
  {
    specs: carInfoSpecsConstraints,
    social: carInfoSocialConstraints,
  };

export const emptyCarInfo: CarInfo = {
  alias: "",
  gallery: [],
  events: [],
  specs: {
    modelYear: 2023,
    make: "",
    model: "",
    horsePower: 0,
    hpRPM: 0,
    torque: 0,
    torqueRPM: 0,
    zeroToSixty: 0,
    topSpeed: 0,
    displacement: 0,
    cylinders: 0,
    cylindersLayout: "",
    transmission: "",
    driveType: DriveType.RWD,
    weight: 0,
    aspiration: Aspiration.NaturallyAspirated,
  },
  social: {
    instagram: "",
    tikTok: "",
    youtube: "",
  },
};
