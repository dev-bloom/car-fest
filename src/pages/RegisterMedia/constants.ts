import {
  IdType,
  Media,
  MediaInfoReferences,
  Representative,
  SocialInfo,
} from "../../types";

export const emptyRepresentative: Representative = {
  name: "",
  email: "",
  idNumber: 0,
  idType: IdType.CC,
  role: "",
};

export const mediaInfoSpecsConstraints: Partial<Record<keyof Media, any>> = {
  name: {
    presence: {
      allowEmpty: false,
      message: "^El nombre es requerido",
    },
  },
  type: {
    presence: {
      allowEmpty: false,
      message: "^El tipo es requerido",
    },
  },
  letter: {
    presence: {
      allowEmpty: false,
      message: "^La carta es requerida",
    },
  },
};

export const mediaInfoSocialConstraints: Record<keyof SocialInfo, any> = {
  instagram: {
    presence: {
      allowEmpty: false,
      message: "^Instagram es requerido",
    },
    length: {
      minimum: 2,
      maximum: 30,
      tooShort: "^Instagram debe tener al menos %{count} caracteres",
      tooLong: "^Instagram debe tener menos de %{count} caracteres",
    },
  },
  tikTok: {
    presence: {
      allowEmpty: true,
    },
    length: {
      minimum: 2,
      maximum: 30,
      tooShort: "^Tik Tok debe tener al menos %{count} caracteres",
      tooLong: "^Tik Tok debe tener menos de %{count} caracteres",
    },
  },
  youtube: {
    presence: {
      allowEmpty: true,
    },
    length: {
      minimum: 2,
      maximum: 30,
      tooShort: "^Youtube debe tener al menos %{count} caracteres",
      tooLong: "^Youtube debe tener menos de %{count} caracteres",
    },
  },
  facebook: {
    presence: {
      allowEmpty: true,
    },
    length: {
      minimum: 2,
      maximum: 20,
      tooShort: "^Facebook debe tener al menos %{count} caracteres",
      tooLong: "^Facebook debe tener menos de %{count} caracteres",
    },
  },
  webpage: {
    presence: {
      allowEmpty: true,
      message: "^La webpage es requerida",
    },
    length: {
      minimum: 2,
      maximum: 20,
      tooShort: "^La url debe tener al menos %{count} caracteres",
      tooLong: "^La url debe tener menos de %{count} caracteres",
    },
  },
};

export const mediaInfoRepresentativeConstraints: Record<
  keyof Omit<Representative, "id">,
  any
> = {
  name: {
    presence: {
      allowEmpty: false,
      message: "^El nombre es requerido",
    },
  },
  email: {
    presence: {
      allowEmpty: false,
      message: "^El email es requerido",
    },
    email: {
      message: "^El email no es válido",
    },
  },
  idNumber: {
    presence: {
      allowEmpty: false,
      message: "^El número de identificación es requerido",
    },
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
      message: "^El número de identificación debe ser un número positivo",
    },
  },
  idType: {
    presence: {
      allowEmpty: false,
      message: "^El tipo de identificación es requerido",
    },
  },
  role: {
    presence: {
      allowEmpty: false,
      message: "^El rol es requerido",
    },
  },
};

export const mediaInfoConstraints: Record<keyof MediaInfoReferences, any> = {
  social: mediaInfoSocialConstraints,
  representatives: mediaInfoRepresentativeConstraints,
};

export const emptyMedia = {
  name: "",
  type: "",
  representatives: [],
  letter: "",
  social: {
    instagram: "",
    facebook: "",
    webpage: "",
    tikTok: "",
    youtube: "",
  },
};
