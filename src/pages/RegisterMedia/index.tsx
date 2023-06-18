import {
  CheckboxChangeEventDetail,
  InputChangeEventDetail,
  InputCustomEvent,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { add, camera, document, fileTray, paperPlane } from "ionicons/icons";
import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
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
import styles from "./style.module.scss";
import { format, isAfter, parse } from "date-fns";

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

const RegisterMedia: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const [errors, setErrors] = useState<Record<keyof CarInfo, any>>({} as any);

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    fileUploadRef.current?.click();
  };
  const setImage = (e: any) => {};

  const handleSubmit = async () => {};

  const updateValue =
    (key: string) =>
    ({ detail: { value } }: InputCustomEvent<InputChangeEventDetail>) => {};

  const validateField =
    (key: keyof CarInfo, subKey?: string) =>
    ({ target: { value } }: InputCustomEvent<FocusEvent>) => {};

  const handleCheckboxChange = ({ detail: { checked } }: any) => {
    setShowForm(checked);
  };

  const isAfterEdgeDate = isAfter(
    new Date(),
    parse("26-06-2023 00:00", "dd-MM-yyyy H:mm", new Date())
  );

  if (isAfterEdgeDate) {
    return (
      <IonPage>
        <IonContent>
          <IonCard>
            <IonCardTitle>Indscripión cerrada</IonCardTitle>
            <IonCardSubtitle>Formulario no disponible</IonCardSubtitle>
            <h1></h1>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonText color="danger">
              <h1 className={styles.cardTitle}>
                Requisitos Acreditación Prensa The Carfest 2023
              </h1>
            </IonText>
          </IonCardHeader>
          <IonCardContent>
            <IonText className={styles.card}>
              <p>
                Formulario de inscripción como medio de prensa para el The
                Carfest, el cual se llevará a cabo en el Municipio de Sabaneta -
                Antioquia, los días 2 y 3 de julio de 2023.
                <br />
                <br />
                <p>
                  Los medios de comunicación interesados en realizar este
                  proceso de acreditación para hacer un cubrimiento periodístico
                  deben tener en cuenta los siguientes requisitos para acceder a
                  las acreditaciones:
                </p>
              </p>
              <p>
                <ol>
                  <li>Nombre del medio a inscribir.</li>
                  <li>
                    Link de la página del medio (Facebook, Instagram, página
                    web, etc.)
                  </li>
                  <li>
                    Máximo personas por medio 3 (presentador, camarógrafo y
                    redactor)
                  </li>
                  <li>Las personas deben ser mayor de edad.</li>
                  <li>Datos personales de o las personas inscritas.</li>
                  <li>
                    Carta donde se certifique existencia del medio y sus
                    integrantes.
                  </li>
                  <li>El medio debe tener un mínimo de 2 años de creación.</li>
                  <li>
                    Cada persona acreditada debe llevar su propio chaleco
                    reflectivo para ser fácilmente identificado, The Carfest
                    solo otorgará la escarapela a cada persona del medio (Nombre
                    de la persona, nombre del medio y número de identificación).
                  </li>
                </ol>
                <IonCard color="warning">
                  <IonCardContent>
                    <b>IMPORTANTE:</b> <br />{" "}
                    <i>
                      La escarapela de identificación es de uso personal e
                      intransferible, cualquier miembro organizador del The
                      Carfest puede corroborar la información, pidiendo
                      identificación (cedula de ciudadanía). En el caso de no
                      ser la persona identificada con los datos de la
                      escarapela, se procederá a retirar la escarapela y retirar
                      a todo el equipo del medio de prensa del evento.
                    </i>
                  </IonCardContent>
                </IonCard>
                <p>
                  Por favor, leer todos los requisitos y tener lista la
                  documentación que se solicita en el formulario antes de
                  empezar a llenarlo.
                </p>
                <br />
                <p>
                  Además, es importante tener en cuenta que el proceso de
                  acreditación es por cada medio de comunicación. Solo se tendrá
                  en cuenta un formulario por cada medio de comunicación. Los
                  datos de las personas que se acreditarán deben estar en la
                  carta y, si se envían más nombres de los permitidos por tipo
                  de medio, solamente se acreditarán las primeras personas del
                  listado. <br /> <b>NO HABRÁ EXCEPCIONES.</b>
                </p>
                <br />
                <p>
                  El equipo de prensa de The CarFest, evaluará la información y
                  soportes enviados en el formulario, confirmando antes del
                  evento a los medios acreditados por correo electrónico. Si no
                  se recibe el correo, quiere decir que el medio no fue
                  acreditado.
                </p>
                <br />
              </p>
            </IonText>
            <br />
            <IonCheckbox onIonChange={handleCheckboxChange}>
              Acepto términos y condiciones
            </IonCheckbox>
          </IonCardContent>
        </IonCard>
        {showForm && (
          <IonList>
            <IonItemGroup>
              <IonItem>
                <IonInput
                  className={
                    errors.specs?.make?.[0] ? "ion-touched ion-invalid" : ""
                  }
                  labelPlacement="stacked"
                  label="* Nombre del medio"
                  onIonInput={updateValue("specs.make")}
                  onIonBlur={validateField("specs", "make")}
                  errorText={errors.specs?.make?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonSelect label="* Tipo de Medio">
                  <IonSelectOption value="radio">Radio</IonSelectOption>
                  <IonSelectOption value="prensa">Periódico</IonSelectOption>
                  <IonSelectOption value="tv">Televisión</IonSelectOption>
                  <IonSelectOption value="youtuber">Youtuber</IonSelectOption>
                  <IonSelectOption value="influencer">
                    Influencer
                  </IonSelectOption>
                  <IonSelectOption value="audiovisual">
                    Medio audiovisual
                  </IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItemGroup>
                <IonItemDivider>
                  <IonLabel>Redes sociales</IonLabel>
                </IonItemDivider>
                <IonItem>
                  <IonInput
                    labelPlacement="stacked"
                    label="* Instagram"
                    className={
                      errors.social?.instagram?.[0]
                        ? "ion-touched ion-invalid"
                        : ""
                    }
                    onIonChange={updateValue("social.instagram")}
                    onIonBlur={validateField("social", "instagram")}
                    errorText={errors.social?.instagram?.[0]}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput
                    labelPlacement="stacked"
                    label="Facebook"
                    className={
                      errors.social?.instagram?.[0]
                        ? "ion-touched ion-invalid"
                        : ""
                    }
                    onIonChange={updateValue("social.instagram")}
                    onIonBlur={validateField("social", "instagram")}
                    errorText={errors.social?.instagram?.[0]}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonInput
                    labelPlacement="stacked"
                    label="Página web"
                    className={
                      errors.social?.tikTok?.[0]
                        ? "ion-touched ion-invalid"
                        : ""
                    }
                    onIonChange={updateValue("social.tikTok")}
                    onIonBlur={validateField("social", "tikTok")}
                    errorText={errors.social?.tikTok?.[0]}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput
                    labelPlacement="stacked"
                    label="TikTok"
                    className={
                      errors.social?.tikTok?.[0]
                        ? "ion-touched ion-invalid"
                        : ""
                    }
                    onIonChange={updateValue("social.tikTok")}
                    onIonBlur={validateField("social", "tikTok")}
                    errorText={errors.social?.tikTok?.[0]}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput
                    labelPlacement="stacked"
                    label="Youtube"
                    className={
                      errors.social?.youtube?.[0]
                        ? "ion-touched ion-invalid"
                        : ""
                    }
                    onIonChange={updateValue("social.youtube")}
                    onIonBlur={validateField("social", "youtube")}
                    errorText={errors.social?.youtube?.[0]}
                  ></IonInput>
                </IonItem>
              </IonItemGroup>
              <IonItemGroup>
                <IonItemDivider>
                  <IonLabel>Datos de los Representantes</IonLabel>
                </IonItemDivider>

                <IonItem>
                  <IonInput
                    className={
                      errors.specs?.model?.[0] ? "ion-touched ion-invalid" : ""
                    }
                    labelPlacement="stacked"
                    label="* Nombre completo"
                    onIonInput={updateValue("specs.model")}
                    onIonBlur={validateField("specs", "model")}
                    errorText={errors.specs?.model?.[0]}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput
                    className={
                      errors.specs?.model?.[0] ? "ion-touched ion-invalid" : ""
                    }
                    labelPlacement="stacked"
                    label="* Correo electrónico"
                    onIonInput={updateValue("specs.model")}
                    onIonBlur={validateField("specs", "model")}
                    errorText={errors.specs?.model?.[0]}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonSelect label="* Tipo de documento">
                    <IonSelectOption value="cc">
                      Cédula de ciudadania
                    </IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonInput
                    className={
                      errors.specs?.modelYear?.[0]
                        ? "ion-touched ion-invalid"
                        : ""
                    }
                    type="number"
                    labelPlacement="stacked"
                    label="* Número de documento"
                    onIonInput={updateValue("specs.modelYear")}
                    onIonBlur={validateField("specs", "modelYear")}
                    errorText={errors.specs?.modelYear?.[0]}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput
                    labelPlacement="stacked"
                    label="* Cargo"
                    className={
                      errors.alias?.[0] ? "ion-touched ion-invalid" : ""
                    }
                    onIonInput={updateValue("alias")}
                    onIonBlur={validateField("alias")}
                    errorText={errors.alias?.[0]}
                  ></IonInput>
                </IonItem>
              </IonItemGroup>
              <IonButton expand="block">
                <IonIcon icon={add}></IonIcon>Agregar Representante
              </IonButton>
              <input
                multiple
                ref={fileUploadRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={setImage}
              />
              <br />
              <IonNote>
                Por favor, asegúrate de que tu carta incluya:
                <ul>
                  <li>Nombre del medio</li>
                  <li>Link de la página del medio</li>
                  <li>
                    Máximo de 3 personas por medio con sus datos personales,
                    todas mayores de edad
                  </li>
                  <li>
                    Confirmación de que el medio tiene mínimo 2 años de creación
                  </li>
                  <li>
                    Compromiso de que cada acreditado llevará chaleco reflectivo
                  </li>
                </ul>
                Cada detalle es esencial para la validez de tu carta.
              </IonNote>
              <IonButton
                size="large"
                className="ion-margin-bottom ion-margin-top"
                color="dark"
                fill="outline"
                expand="block"
                onClick={openFileDialog}
              >
                <IonIcon slot="start" icon={document}></IonIcon>
                <IonLabel>* Adjuntar PDF</IonLabel>
              </IonButton>
              <IonNote>
                Diligenciar este formulario no es garantía de conseguir la
                acreditación. Solamente cuando se cumplan todos los requisitos
                establecidos por el equipo de prensa y se notifique al medio por
                correo electrónico, se considerará que un medio ha sido
                acreditado. Esto será a más tardar el 26 de junio de 2023.
              </IonNote>
              <IonButton
                size="large"
                className="ion-margin-bottom ion-margin-top"
                color="dark"
                fill="outline"
                expand="block"
                onClick={openFileDialog}
              >
                <IonIcon slot="start" icon={document}></IonIcon>
                <IonLabel>* Finalizar Inscripción</IonLabel>
              </IonButton>
            </IonItemGroup>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RegisterMedia;
