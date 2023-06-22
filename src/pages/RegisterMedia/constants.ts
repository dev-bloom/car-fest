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

export const mediaInfoSocialConstraints: Record<
  keyof Pick<SocialInfo, "instagram">,
  any
> = {
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

export const mediaInfoConstraints: Record<
  keyof Pick<Media, "social" | "representatives">,
  any
> = {
  social: mediaInfoSocialConstraints,
  representatives: mediaInfoRepresentativeConstraints,
};

export const mediaConstraints: Record<
  keyof Pick<Media, "name" | "type" | "letter">,
  any
> = {
  name: {
    presence: {
      allowEmpty: false,
      message: "^El nombre es requerido",
    },
  },
  type: {
    presence: {
      allowEmpty: false,
      message: "^El tipo de medio es requerido",
    },
  },
  letter: {
    presence: {
      allowEmpty: false,
      message: "^La carta de intención es requerida",
    },
  },
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
