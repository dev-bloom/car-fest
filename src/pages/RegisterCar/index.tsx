import {
  InputChangeEventDetail,
  InputCustomEvent,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { camera } from "ionicons/icons";
import { FC, useEffect, useRef, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import { set } from "lodash";
import {
  Aspiration,
  CarInfo,
  CarInfoReferences,
  DriveType,
  SocialInfo,
  SpecsInfo,
} from "../../types";
import validate from "validate.js";
import { useLocation, useParams } from "react-router";

const carInfoSpecsConstraints: Partial<Record<keyof SpecsInfo, any>> = {
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
const carInfoSocialConstraints: Record<keyof SocialInfo, any> = {
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

const carInfoConstraints = {
  alias: {
    presence: true,
  },
  gallery: {
    presence: true,
  },
};

const carInfoChildrenConstraints: Record<keyof CarInfoReferences, any> = {
  specs: carInfoSpecsConstraints,
  social: carInfoSocialConstraints,
};

const RegisterCar: FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const [errors, setErrors] = useState<Record<keyof CarInfo, any>>({} as any);
  const [car, setCar] = useState<CarInfo>({
    alias: "",
    gallery: [],
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
  });

  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [currentSegment, setCurrentSegment] = useState("technicalData");

  const handleSegmentChange = (e: CustomEvent) => {
    setCurrentSegment(e.detail.value);
  };

  const openFileDialog = () => {
    fileUploadRef.current?.click();
  };
  const setImage = (e: any) => {};

  const handleQRError = (error: any) => {
    console.debug(error);
  };

  const handleQRResult = (data: any) => {
    setShowQRScanner(false);
    alert(data);
  };

  const handleSubmit = async () => {
    if (isEditing) {
      await axios.put(`http://localhost:3000/cars/${id}`, car);
      return;
    }
    await axios.post("http://localhost:3000/cars", car);
  };

  const updateValue =
    (key: string) =>
    ({ detail: { value } }: InputCustomEvent<InputChangeEventDetail>) => {
      setCar(set({ ...car }, key, value));
    };

  const validateField =
    (key: keyof CarInfo, subKey?: string) =>
    ({ target: { value } }: InputCustomEvent<FocusEvent>) => {
      const updatedCar = set({ ...car }, `${key}.${subKey}`, value);
      const errors = subKey
        ? validate(
            updatedCar[key],
            carInfoChildrenConstraints[key as keyof CarInfoReferences]
          )
        : validate(updatedCar, carInfoConstraints);

      setErrors((currentErrors) =>
        key
          ? {
              ...currentErrors,
              [key]: errors,
            }
          : errors
      );
    };

  const getCar = async () => {
    const { data } = await axios.get(`http://localhost:3000/cars/${id}`);
    setCar(data);
    setErrors({} as any);
  };

  useEffect(() => {
    if (id) {
      getCar();
    }
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro de vehículo</IonTitle>
          <IonButton
            onClick={handleSubmit}
            className="ion-margin-end"
            slot="end"
            color="dark"
          >
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Registro de vehículo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonButton
            className="ion-margin-bottom ion-margin-top"
            color="dark"
            expand="block"
            onClick={() => setShowQRScanner(!showQRScanner)}
          >
            <IonIcon slot="start" icon={camera}></IonIcon>
            <IonLabel>Asignar QR</IonLabel>
          </IonButton>

          {showQRScanner && (
            <div>
              <QrScanner onResult={handleQRResult} onError={handleQRError} />
            </div>
          )}
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Datos básicos</IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonInput
                className={
                  errors.specs?.make?.[0] ? "ion-touched ion-invalid" : ""
                }
                labelPlacement="stacked"
                label="* Marca"
                placeholder="BMW"
                value={car.specs?.make}
                onIonInput={updateValue("specs.make")}
                onIonBlur={validateField("specs", "make")}
                errorText={errors.specs?.make?.[0]}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                className={
                  errors.specs?.model?.[0] ? "ion-touched ion-invalid" : ""
                }
                labelPlacement="stacked"
                label="* Modelo"
                placeholder="M340i"
                value={car.specs?.model}
                onIonInput={updateValue("specs.model")}
                onIonBlur={validateField("specs", "model")}
                errorText={errors.specs?.model?.[0]}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                className={
                  errors.specs?.modelYear?.[0] ? "ion-touched ion-invalid" : ""
                }
                type="number"
                labelPlacement="stacked"
                label="* Año"
                placeholder="2022"
                value={car.specs?.modelYear}
                onIonInput={updateValue("specs.modelYear")}
                onIonBlur={validateField("specs", "modelYear")}
                errorText={errors.specs?.modelYear?.[0]}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                labelPlacement="stacked"
                label="Nombre Del Carro"
                className={errors.alias?.[0] ? "ion-touched ion-invalid" : ""}
                value={car.alias}
                onIonInput={updateValue("alias")}
                onIonBlur={validateField("alias")}
                errorText={errors.alias?.[0]}
              ></IonInput>
            </IonItem>
            <input
              multiple
              ref={fileUploadRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={setImage}
            />

            <IonButton
              size="large"
              className="ion-margin-bottom ion-margin-top"
              color="dark"
              fill="outline"
              expand="block"
              onClick={openFileDialog}
            >
              <IonIcon slot="start" icon={camera}></IonIcon>
              <IonLabel>Fotos</IonLabel>
            </IonButton>
          </IonItemGroup>
          <IonItemDivider>
            <IonSegment
              value={currentSegment}
              onIonChange={handleSegmentChange}
            >
              <IonSegmentButton value="technicalData">
                Datos Técnicos
              </IonSegmentButton>
              <IonSegmentButton value="events">Eventos</IonSegmentButton>
              <IonSegmentButton value="social">Social</IonSegmentButton>
            </IonSegment>
          </IonItemDivider>
          {currentSegment === "technicalData" && (
            <IonItemGroup>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Caballos de fuerza (HP)"
                  placeholder="387hp"
                  className={
                    errors.specs?.horsePower?.[0]
                      ? "ion-touched ion-invalid"
                      : ""
                  }
                  value={car.specs?.horsePower}
                  onIonInput={updateValue("specs.horsePower")}
                  onIonBlur={validateField("specs", "horsePower")}
                  errorText={errors.specs?.horsePower?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Caballos de fuerza (RPM)"
                  placeholder="450Hp@5500Rpm"
                  className={
                    errors.specs?.hpRPM?.[0] ? "ion-touched ion-invalid" : ""
                  }
                  value={car.specs?.hpRPM}
                  onIonInput={updateValue("specs.hpRPM")}
                  onIonBlur={validateField("specs", "hpRPM")}
                  errorText={errors.specs?.hpRPM?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Torque (NM)"
                  placeholder="500NM"
                  className={
                    errors.specs?.torque?.[0] ? "ion-touched ion-invalid" : ""
                  }
                  value={car.specs?.torque}
                  onIonInput={updateValue("specs.torque")}
                  onIonBlur={validateField("specs", "torque")}
                  errorText={errors.specs?.torque?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Torque (RPM)"
                  placeholder="500Nm@1900Rpm"
                  className={
                    errors.specs?.torqueRPM?.[0]
                      ? "ion-touched ion-invalid"
                      : ""
                  }
                  value={car.specs?.torqueRPM}
                  onIonInput={updateValue("specs.torqueRPM")}
                  onIonBlur={validateField("specs", "torqueRPM")}
                  errorText={errors.specs?.torqueRPM?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Cilindraje (CC)"
                  placeholder="3000cc"
                  className={
                    errors.specs?.displacement?.[0]
                      ? "ion-touched ion-invalid"
                      : ""
                  }
                  value={car.specs?.displacement}
                  onIonInput={updateValue("specs.displacement")}
                  onIonBlur={validateField("specs", "displacement")}
                  errorText={errors.specs?.displacement?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Cantidad De Cilindros"
                  placeholder="6"
                  className={
                    errors.specs?.cylinders?.[0]
                      ? "ion-touched ion-invalid"
                      : ""
                  }
                  value={car.specs?.cylinders}
                  onIonInput={updateValue("specs.cylinders")}
                  onIonBlur={validateField("specs", "cylinders")}
                  errorText={errors.specs?.cylinders?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  labelPlacement="stacked"
                  label="Disposición De Cilindros"
                  placeholder="En línea"
                  className={
                    errors.specs?.cylindersLayout?.[0]
                      ? "ion-touched ion-invalid"
                      : ""
                  }
                  value={car.specs?.cylindersLayout}
                  onIonInput={updateValue("specs.cylindersLayout")}
                  onIonBlur={validateField("specs", "cylindersLayout")}
                  errorText={errors.specs?.cylindersLayout?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonSelect
                  label="Aspiración"
                  placeholder="Turbocargado"
                  className={
                    errors.specs?.aspiration?.[0]
                      ? "ion-touched ion-invalid"
                      : ""
                  }
                  value={car.specs?.aspiration}
                >
                  <IonSelectOption>Naturalmente Aspirado</IonSelectOption>
                  <IonSelectOption>Turbocargado</IonSelectOption>
                  <IonSelectOption>Supercargado</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonInput
                  labelPlacement="stacked"
                  label="Transmisión"
                  placeholder="Automática de 8 velocidades"
                  className={
                    errors.specs?.transmission?.[0]
                      ? "ion-touched ion-invalid"
                      : ""
                  }
                  value={car.specs?.transmission}
                  onIonChange={updateValue("specs.transmission")}
                  onIonBlur={validateField("specs", "transmission")}
                  errorText={errors.specs?.transmission?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  labelPlacement="stacked"
                  label="Tracción"
                  placeholder="AWD"
                  className={
                    errors.specs?.driveType?.[0]
                      ? "ion-touched ion-invalid"
                      : ""
                  }
                  value={car.specs?.driveType}
                  onIonChange={updateValue("specs.driveType")}
                  onIonBlur={validateField("specs", "driveType")}
                  errorText={errors.specs?.driveType?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Peso (KG)"
                  placeholder="1670kg"
                  className={
                    errors.specs?.weight?.[0] ? "ion-touched ion-invalid" : ""
                  }
                  value={car.specs?.weight}
                  onIonChange={updateValue("specs.weight")}
                  onIonBlur={validateField("specs", "weight")}
                  errorText={errors.specs?.weight?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="0-100 (s)"
                  placeholder="3.6s"
                  className={
                    errors.specs?.zeroToSixty?.[0]
                      ? "ion-touched ion-invalid"
                      : ""
                  }
                  value={car.specs?.zeroToSixty}
                  onIonChange={updateValue("specs.zeroToSixty")}
                  onIonBlur={validateField("specs", "zeroToSixty")}
                  errorText={errors.specs?.zeroToSixty?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Velocidad Máxima (Km/h)"
                  placeholder="253Km/h"
                  className={
                    errors.specs?.topSpeed?.[0] ? "ion-touched ion-invalid" : ""
                  }
                  value={car.specs?.topSpeed}
                  onIonChange={updateValue("specs.topSpeed")}
                  onIonBlur={validateField("specs", "topSpeed")}
                  errorText={errors.specs?.topSpeed?.[0]}
                ></IonInput>
              </IonItem>
            </IonItemGroup>
          )}
          {currentSegment === "events" && (
            <IonItemGroup>
              <IonItem>
                <IonToggle>1/8 De Milla</IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle>Donas</IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle>Pops & Bangs</IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle>Exhibición</IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle>Slálom</IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle>Carro Mas Bajo</IonToggle>
              </IonItem>
            </IonItemGroup>
          )}
          {currentSegment === "social" && (
            <IonItemGroup>
              <IonItem>
                <IonInput
                  labelPlacement="stacked"
                  label="TikTok"
                  placeholder="Nombre de usuario"
                  className={
                    errors.social?.tikTok?.[0] ? "ion-touched ion-invalid" : ""
                  }
                  value={car.social?.tikTok}
                  onIonChange={updateValue("social.tikTok")}
                  onIonBlur={validateField("social", "tikTok")}
                  errorText={errors.social?.tikTok?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  labelPlacement="stacked"
                  label="Instagram"
                  placeholder="Nombre de usuario"
                  className={
                    errors.social?.instagram?.[0]
                      ? "ion-touched ion-invalid"
                      : ""
                  }
                  value={car.social?.instagram}
                  onIonChange={updateValue("social.instagram")}
                  onIonBlur={validateField("social", "instagram")}
                  errorText={errors.social?.instagram?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  labelPlacement="stacked"
                  label="Youtube"
                  placeholder="Nombre de usuario"
                  className={
                    errors.social?.youtube?.[0] ? "ion-touched ion-invalid" : ""
                  }
                  value={car.social?.youtube}
                  onIonChange={updateValue("social.youtube")}
                  onIonBlur={validateField("social", "youtube")}
                  errorText={errors.social?.youtube?.[0]}
                ></IonInput>
              </IonItem>
            </IonItemGroup>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RegisterCar;
