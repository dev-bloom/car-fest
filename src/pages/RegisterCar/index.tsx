import {
  InputChangeEventDetail,
  InputCustomEvent,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToggle,
  IonToolbar,
  ToggleChangeEventDetail,
} from "@ionic/react";
import { IonToggleCustomEvent } from "@ionic/core";
import { camera } from "ionicons/icons";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { set } from "lodash";
import { CarInfo, CarInfoEvents, CarInfoReferences } from "../../types";
import validate from "validate.js";
import { useHistory, useParams } from "react-router";
import { createCar, getCar, updateCar } from "../../api/cars";
import {
  carInfoChildrenConstraints,
  carInfoConstraints,
  emptyCarInfo,
} from "./constants";
import { fileToBase64 } from "../../utils/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const RegisterCar: FC = () => {
  const history = useHistory();
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
  const [imagePreviewURLS, setImagePreviewURLS] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const [errors, setErrors] = useState<Record<keyof CarInfo, any>>({} as any);
  const [car, setCar] = useState<CarInfo>(emptyCarInfo);
  const [events, setEvents] = useState<(keyof CarInfoEvents)[]>([]);

  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [currentSegment, setCurrentSegment] = useState("technicalData");
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSegmentChange = (e: CustomEvent) => {
    setCurrentSegment(e.detail.value);
  };

  const openFileDialog = () => {
    fileUploadRef.current?.click();
  };
  const setImages = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const { files } = e.target;
    const previewURLs = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviewURLS(previewURLs);
    const base64Files = await Promise.all(
      Array.from(files).map((file) => fileToBase64(file))
    );
    setCar({ ...car, gallery: base64Files });
  };

  const handleQRError = (error: any) => {
    console.debug(error);
  };

  const handleQRResult = (data: any) => {
    setShowQRScanner(false);
    alert(data);
  };

  const handleSubmit = async () => {
    const carToSubmit = { ...car, events };
    if (isEditing) {
      await updateCar(carToSubmit);
    } else {
      await createCar({ ...carToSubmit, uid: user.uid });
    }
    setHasBeenSubmitted(true);
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

  const fetchCar = async () => {
    const car = await getCar(id);
    setCar(car);
    setErrors({} as any);
  };

  useEffect(() => {
    if (id) {
      fetchCar();
    }
  }, [id]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        history.push("/profile");
        return;
      }
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEventChange =
    (key: keyof CarInfoEvents) =>
    ({
      detail: { checked },
    }: IonToggleCustomEvent<ToggleChangeEventDetail<any>>) => {
      if (checked) {
        setEvents((currentEvents) => [...currentEvents, key]);
        return;
      }
      setEvents((currentEvents) =>
        currentEvents.filter((event) => event !== key)
      );
    };

  if (isLoading) {
    return (
      <IonPage>
        <IonGrid className="ion-margin-top ion-padding-top">
          <IonSpinner name="circular" />
        </IonGrid>
      </IonPage>
    );
  }

  if (hasBeenSubmitted) {
    return (
      <IonPage>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonTitle>Registro de vehículo completado</IonTitle>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }

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
          {/* <IonButton
            className="ion-margin-bottom ion-margin-top"
            color="dark"
            expand="block"
            onClick={() => setShowQRScanner(!showQRScanner)}
          >
            <IonIcon slot="start" icon={camera}></IonIcon>
            <IonLabel>Asignar QR</IonLabel>
          </IonButton> */}

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
                disabled
                labelPlacement="stacked"
                label="* Correo electrónico"
                value={user.email}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                labelPlacement="stacked"
                label="* Marca"
                placeholder="BMW"
                value={car.specs?.make}
                onIonInput={updateValue("specs.make")}
                onIonBlur={validateField("specs", "make")}
                className={
                  errors.specs?.make?.[0] ? "ion-touched ion-invalid" : ""
                }
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
              onChange={setImages}
            />

            {imagePreviewURLS.length > 0 && (
              <IonItem>
                <IonGrid>
                  <IonRow>
                    {imagePreviewURLS.map((image, index) => (
                      <IonCol key={index}>
                        <IonImg src={image} />
                      </IonCol>
                    ))}
                  </IonRow>
                </IonGrid>
              </IonItem>
            )}

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
                <IonToggle
                  checked={events.includes("eightMile")}
                  onIonChange={handleEventChange("eightMile")}
                >
                  1/8 De Milla
                </IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle
                  checked={events.includes("donuts")}
                  onIonChange={handleEventChange("donuts")}
                >
                  Donas
                </IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle
                  checked={events.includes("pops")}
                  onIonChange={handleEventChange("pops")}
                >
                  Pops & Bangs
                </IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle
                  checked={events.includes("exhibition")}
                  onIonChange={handleEventChange("exhibition")}
                >
                  Exhibición
                </IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle
                  checked={events.includes("slalom")}
                  onIonChange={handleEventChange("slalom")}
                >
                  Slálom
                </IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle
                  checked={events.includes("limbo")}
                  onIonChange={handleEventChange("limbo")}
                >
                  Carro Mas Bajo
                </IonToggle>
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
