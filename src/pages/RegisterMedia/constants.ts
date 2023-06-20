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
  representatives: {
    presence: {
      allowEmpty: false,
      message: "^Al menos un representante es requerido",
    },
  },
  letter: {
    presence: {
      allowEmpty: false,
      message: "^Al menos un representante es requerido",
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
      maximum: 20,
      tooShort: "^Instagram debe tener al menos %{count} caracteres",
      tooLong: "^Instagram debe tener menos de %{count} caracteres",
    },
  },
  tikTok: {
    presence: {
      allowEmpty: true,
      message: "^Tik Tok es requerido",
    },
    length: {
      minimum: 2,
      maximum: 20,
      tooShort: "^Tik Tok debe tener al menos %{count} caracteres",
      tooLong: "^Tik Tok debe tener menos de %{count} caracteres",
    },
  },
  youtube: {
    presence: {
      allowEmpty: true,
      message: "^Youtube es requerido",
    },
    length: {
      minimum: 2,
      maximum: 20,
      tooShort: "^Youtube debe tener al menos %{count} caracteres",
      tooLong: "^Youtube debe tener menos de %{count} caracteres",
    },
  },
  facebook: {
    presence: {
      allowEmpty: true,
      message: "^Facebook es requerido",
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

export const mediaInfoConstraints: Record<keyof MediaInfoReferences, any> = {
  social: mediaInfoSocialConstraints,
  representatives: {},
};

export const emptyMedia = {
  name: "",
  type: "",
  representatives: [emptyRepresentative],
  letter: "",
  social: {
    instagram: "",
    facebook: "",
    webpage: "",
    tikTok: "",
    youtube: "",
  },
};
