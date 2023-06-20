import {
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
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import {
  add,
  car,
  checkmark,
  document,
  lockClosed,
  trash,
} from "ionicons/icons";
import { FC, useRef, useState } from "react";
import validate from "validate.js";
import { set } from "lodash";
import { useParams } from "react-router";
import styles from "./style.module.scss";
import { isAfter, parse } from "date-fns";
import { Media, MediaInfoReferences, Representative } from "../../types";
import {
  emptyMedia,
  emptyRepresentative,
  mediaInfoConstraints,
} from "./constants";
import { createMedia, updateMedia } from "../../api/media";

const RegisterMedia: FC = () => {
  const [representatives, setRepresentatives] = useState<Representative[]>([
    { ...emptyRepresentative },
  ]);
  const [media, setMedia] = useState<Media>({ ...emptyMedia });
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const [errors, setErrors] = useState<Record<keyof Media, any>>({} as any);

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    fileUploadRef.current?.click();
  };
  const setImage = (e: any) => {};

  const handleSubmit = async () => {
    if (isEditing) {
      await updateMedia(media);
      return;
    }
    await createMedia(media);
  };

  const updateValue =
    (key: string) =>
    ({ detail: { value } }: InputCustomEvent<InputChangeEventDetail>) => {
      setMedia(set({ ...media }, key, value));
    };

  const validateField =
    (key: keyof Media, subKey?: string) =>
    ({ target: { value } }: InputCustomEvent<FocusEvent>) => {
      const updatedMedia = set({ ...media }, `${key}.${subKey}`, value);
      const errors = subKey
        ? validate(
            updatedMedia[key],
            mediaInfoConstraints[key as keyof MediaInfoReferences]
          )
        : validate(updatedMedia, mediaInfoConstraints);
      setErrors((currentErrors) =>
        key
          ? {
              ...currentErrors,
              [key]: errors,
            }
          : errors
      );
    };

  const handleCheckboxChange = ({ detail: { checked } }: any) => {
    setShowForm(checked);
  };

  const isAfterEdgeDate = isAfter(
    new Date(),
    parse("26-06-2023 00:00", "dd-MM-yyyy H:mm", new Date())
  );

  const addRepresentative = () => {
    if (representatives.length >= 3) return;
    setRepresentatives([...representatives, { ...emptyRepresentative }]);
  };

  const removeRepresentative = (index: number) => {
    setRepresentatives(
      representatives.filter(
        (_, representativeIndex) => index !== representativeIndex
      )
    );
  };

  if (isAfterEdgeDate) {
    return (
      <IonPage>
        <IonContent>
          <div className={styles.closedRegistrationContainer}>
            <IonCard color="dark" className={styles.closedRegistrationCard}>
              <IonCardHeader>
                <IonCardTitle>Indscripión cerrada</IonCardTitle>
                <IonCardSubtitle>Formulario no disponible</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className={styles.closedRegistrationCardContent}>
                <IonIcon
                  color="medium"
                  size="large"
                  icon={lockClosed}
                ></IonIcon>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        {!showForm && (
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
                  Carfest, el cual se llevará a cabo en el Municipio de Sabaneta
                  - Antioquia, los días 2 y 3 de julio de 2023.
                  <br />
                  <br />
                  <p>
                    Los medios de comunicación interesados en realizar este
                    proceso de acreditación para hacer un cubrimiento
                    periodístico deben tener en cuenta los siguientes requisitos
                    para acceder a las acreditaciones:
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
                    <li>
                      El medio debe tener un mínimo de 2 años de creación.
                    </li>
                    <li>
                      Cada persona acreditada debe llevar su propio chaleco
                      reflectivo para ser fácilmente identificado, The Carfest
                      solo otorgará la escarapela a cada persona del medio
                      (Nombre de la persona, nombre del medio y número de
                      identificación).
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
                        escarapela, se procederá a retirar la escarapela y
                        retirar a todo el equipo del medio de prensa del evento.
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
                    acreditación es por cada medio de comunicación. Solo se
                    tendrá en cuenta un formulario por cada medio de
                    comunicación. Los datos de las personas que se acreditarán
                    deben estar en la carta y, si se envían más nombres de los
                    permitidos por tipo de medio, solamente se acreditarán las
                    primeras personas del listado. <br />{" "}
                    <b>NO HABRÁ EXCEPCIONES.</b>
                  </p>
                  <br />
                  <p>
                    El equipo de prensa de The CarFest, evaluará la información
                    y soportes enviados en el formulario, confirmando antes del
                    evento a los medios acreditados por correo electrónico. Si
                    no se recibe el correo, quiere decir que el medio no fue
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
        )}
        {showForm && (
          <IonList>
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Datos del medio</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonInput
                  className={errors.name?.[0] ? "ion-touched ion-invalid" : ""}
                  labelPlacement="stacked"
                  label="* Nombre del medio"
                  onIonInput={updateValue("name")}
                  onIonBlur={validateField("name")}
                  errorText={errors.name?.[0]}
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
                      errors.social?.facebook?.[0]
                        ? "ion-touched ion-invalid"
                        : ""
                    }
                    onIonChange={updateValue("social.facebook")}
                    onIonBlur={validateField("social", "facebook")}
                    errorText={errors.social?.facebook?.[0]}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonInput
                    labelPlacement="stacked"
                    label="Página web"
                    className={
                      errors.social?.webpage?.[0]
                        ? "ion-touched ion-invalid"
                        : ""
                    }
                    onIonChange={updateValue("social.webpage")}
                    onIonBlur={validateField("social", "webpage")}
                    errorText={errors.social?.webpage?.[0]}
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
                  <IonLabel>Datos de los Representantes (Máximo 3)</IonLabel>
                </IonItemDivider>

                {representatives.map((representative, index) => (
                  <>
                    <IonItemDivider color="medium">
                      <IonLabel>Representante #{index + 1}</IonLabel>
                      {index > 0 && (
                        <IonButton
                          onClick={() => removeRepresentative(index)}
                          color="danger"
                          slot="end"
                        >
                          <IonIcon icon={trash}></IonIcon>
                        </IonButton>
                      )}
                    </IonItemDivider>
                    <IonItem>
                      <IonInput
                        value={representative.name}
                        className={
                          errors.representatives?.[index]?.name?.[0]
                            ? "ion-touched ion-invalid"
                            : ""
                        }
                        labelPlacement="stacked"
                        label="* Nombre completo"
                        onIonInput={updateValue(
                          `representatives[${index}].name`
                        )}
                        onIonBlur={validateField("representatives", "name")}
                        errorText={errors.representatives?.[index]?.name?.[0]}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonInput
                        value={representative.email}
                        className={
                          errors.representatives?.[index]?.email?.[0]
                            ? "ion-touched ion-invalid"
                            : ""
                        }
                        labelPlacement="stacked"
                        label="* Correo electrónico"
                        onIonInput={updateValue(
                          `representatives[${index}].email`
                        )}
                        onIonBlur={validateField("representatives", "email")}
                        errorText={errors.representatives?.[index]?.email?.[0]}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonSelect
                        value={representative.idType}
                        label="* Tipo de documento"
                      >
                        <IonSelectOption value="cc">
                          Cédula de ciudadania
                        </IonSelectOption>
                        <IonSelectOption value="passport">
                          Pasaporte
                        </IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonInput
                        className={
                          errors.representatives?.idNumber?.[0]
                            ? "ion-touched ion-invalid"
                            : ""
                        }
                        type="number"
                        labelPlacement="stacked"
                        label="* Número de documento"
                        onIonInput={updateValue("representatives.idNumber")}
                        onIonBlur={validateField("representatives", "idNumber")}
                        errorText={errors.representatives?.idNumber?.[0]}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonInput
                        labelPlacement="stacked"
                        label="* Cargo"
                        className={
                          errors.representatives?.role?.[0]
                            ? "ion-touched ion-invalid"
                            : ""
                        }
                        onIonInput={updateValue("representatives.role")}
                        onIonBlur={validateField("representatives", "role")}
                        errorText={errors.representatives?.role?.[0]}
                      ></IonInput>
                    </IonItem>
                  </>
                ))}
              </IonItemGroup>
              <IonButton
                disabled={representatives.length === 3}
                onClick={addRepresentative}
                expand="block"
              >
                <IonIcon icon={add}></IonIcon>
                Agregar Representante
              </IonButton>
              <input
                multiple
                ref={fileUploadRef}
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={setImage}
              />
              <IonItemDivider>
                <IonLabel>Carta de solicitud de acreditación</IonLabel>
              </IonItemDivider>
              <IonButton
                size="large"
                color="dark"
                fill="outline"
                expand="block"
                onClick={openFileDialog}
              >
                <IonIcon slot="start" icon={document}></IonIcon>
                <IonLabel>* Adjuntar PDF</IonLabel>
              </IonButton>
              <IonItem>
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
                      Confirmación de que el medio tiene mínimo 2 años de
                      creación
                    </li>
                    <li>
                      Compromiso de que cada acreditado llevará chaleco
                      reflectivo
                    </li>
                  </ul>
                  Cada detalle es esencial para la validez de tu carta.
                </IonNote>
              </IonItem>

              <IonButton
                size="large"
                className="ion-margin-top"
                color="success"
                fill="outline"
                expand="block"
                onClick={handleSubmit}
              >
                <IonIcon slot="start" icon={checkmark}></IonIcon>
                <IonLabel>Finalizar Inscripción</IonLabel>
              </IonButton>
              <IonItem>
                <IonNote>
                  Diligenciar este formulario no es garantía de conseguir la
                  acreditación. Solamente cuando se cumplan todos los requisitos
                  establecidos por el equipo de prensa y se notifique al medio
                  por correo electrónico, se considerará que un medio ha sido
                  acreditado. Esto será a más tardar el 26 de junio de 2023.
                </IonNote>
              </IonItem>
            </IonItemGroup>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RegisterMedia;
