import {
  InputChangeEventDetail,
  InputCustomEvent,
  IonButton,
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
  SelectChangeEventDetail,
} from "@ionic/react";
import { IonSelectCustomEvent } from "@ionic/core";
import { Document, Thumbnail } from "react-pdf";
import { add, checkmark, document, trash } from "ionicons/icons";
import { ChangeEvent, FC, useRef, useState } from "react";
import validate from "validate.js";
import { set } from "lodash";
import { useParams } from "react-router";
import styles from "./style.module.scss";
import { isAfter, parse } from "date-fns";
import { Media, MediaInfoReferences, Representative } from "../../types";
import {
  emptyMedia,
  emptyRepresentative,
  mediaConstraints,
  mediaInfoConstraints,
} from "./constants";
import { createMedia, updateMedia } from "../../api/media";
import { fileToBase64 } from "../../utils/api";
import RegisterMediaRequirements from "./requirements";
import ClosedRegistration from "./closed";
import RegistrationSuccess from "./success";

const RegisterMedia: FC = () => {
  const [touched, setTouched] = useState<any>({} as any);
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
  const windowWidth = window.innerWidth;
  const [PDFPreview, setPDFPreview] = useState<string | undefined>();
  const [representatives, setRepresentatives] = useState<Representative[]>([
    { ...emptyRepresentative },
  ]);
  const [media, setMedia] = useState<Media>({ ...emptyMedia });
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const [errors, setErrors] = useState<Record<keyof Media, any>>({} as any);
  const canSubmit = Object.values(errors).every((error) => !error);

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    fileUploadRef.current?.click();
  };
  const setFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setPDFPreview(url);
    const base64File = await fileToBase64(file);
    setMedia({ ...media, letter: base64File });
  };

  const handleSubmit = async () => {
    const completeMedia = {
      ...media,
      representatives,
    };
    if (isEditing) {
      await updateMedia(completeMedia);
    } else {
      await createMedia(completeMedia);
    }
    setHasBeenSubmitted(true);
  };

  const updateValue =
    (key: string) =>
    ({
      detail: { value },
    }:
      | InputCustomEvent<InputChangeEventDetail>
      | IonSelectCustomEvent<SelectChangeEventDetail<any>>) => {
      setMedia(set({ ...media }, key, value));
    };

  const validateRepresentativeField =
    (key: keyof Representative, index: number) =>
    ({ target: { value } }: InputCustomEvent<FocusEvent>) => {
      const representative = representatives[index];
      const updatedRepresentative = set({ ...representative }, key, value);
      const representativeErrors = validate(
        updatedRepresentative,
        mediaInfoConstraints.representatives
      );
      const newRepresentativeErrors = [...(errors.representatives ?? [])];
      newRepresentativeErrors[index] = representativeErrors;
      setErrors((currentErrors) => ({
        ...currentErrors,
        representatives: newRepresentativeErrors,
      }));
      setTouched(set({ ...touched }, `representatives[${index}].${key}`, true));
    };

  const validateField =
    (key: keyof Media, subKey?: string) =>
    ({ target: { value } }: InputCustomEvent<FocusEvent>) => {
      const parsedKey = subKey ? `${key}.${subKey}` : key;
      const updatedMedia = set({ ...media }, parsedKey, value);

      const errors = subKey
        ? validate(
            updatedMedia[key],
            mediaInfoConstraints[key as keyof MediaInfoReferences]
          )
        : validate(updatedMedia, mediaConstraints);
      setErrors((currentErrors) => {
        const newErrors = subKey
          ? {
              ...currentErrors,
              [key]: errors,
            }
          : { ...currentErrors, ...errors };
        return newErrors;
      });
      const newTouched = set({ ...touched }, parsedKey, true);
      setTouched(newTouched);
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

  const updateRepresentativeValue = (
    value: any,
    index: number,
    key: keyof Representative
  ) => {
    setRepresentatives((currentRepresentatives) => {
      const updatedRepresentatives = [...currentRepresentatives];
      const representative = updatedRepresentatives[index];
      // @ts-ignore
      representative[key] = value;
      return updatedRepresentatives;
    });
  };

  const updateRepresentativeValueFromInput =
    (index: number, key: keyof Representative) =>
    (
      event:
        | InputCustomEvent<InputChangeEventDetail>
        | IonSelectCustomEvent<SelectChangeEventDetail<any>>
    ) => {
      const { value } = event.detail;
      if (!value) return;
      updateRepresentativeValue(value, index, key);
    };

  if (isAfterEdgeDate) {
    return <ClosedRegistration />;
  }

  if (hasBeenSubmitted) {
    return <RegistrationSuccess />;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        {!showForm && (
          <RegisterMediaRequirements onCheckboxChange={handleCheckboxChange} />
        )}
        {showForm && (
          <IonList>
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Datos del medio</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonInput
                  className={
                    errors.name?.[0] && touched.name
                      ? "ion-touched ion-invalid"
                      : ""
                  }
                  labelPlacement="stacked"
                  label="* Nombre del medio"
                  onIonInput={updateValue("name")}
                  onIonBlur={validateField("name")}
                  errorText={errors.name?.[0]}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonSelect
                  onIonChange={updateValue("type")}
                  label="* Tipo de Medio"
                >
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
                      errors.social?.instagram?.[0] && touched.social.instagram
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
                      errors.social?.facebook?.[0] && touched.social.facebook
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
                      errors.social?.webpage?.[0] && touched.social.webpage
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
                      errors.social?.tikTok?.[0] && touched.social.tikTok
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
                      errors.social?.youtube?.[0] && touched.social?.youtube
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
                        labelPlacement="stacked"
                        label="* Nombre completo"
                        className={
                          errors.representatives?.[index]?.name?.[0] &&
                          touched.representatives?.[index]?.name
                            ? "ion-touched ion-invalid"
                            : ""
                        }
                        onIonInput={updateRepresentativeValueFromInput(
                          index,
                          "name"
                        )}
                        onIonBlur={validateRepresentativeField("name", index)}
                        errorText={errors.representatives?.[index]?.name?.[0]}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonInput
                        value={representative.email}
                        labelPlacement="stacked"
                        label="* Correo electrónico"
                        className={
                          errors.representatives?.[index]?.email?.[0] &&
                          touched.representatives?.[index]?.email
                            ? "ion-touched ion-invalid"
                            : ""
                        }
                        onIonInput={updateRepresentativeValueFromInput(
                          index,
                          "email"
                        )}
                        onIonBlur={validateRepresentativeField("email", index)}
                        errorText={errors.representatives?.[index]?.email?.[0]}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonSelect
                        value={representative.idType}
                        label="* Tipo de documento"
                        className={
                          errors.representatives?.[index]?.idType?.[0] &&
                          touched.representatives?.[index]?.idType
                            ? "ion-touched ion-invalid"
                            : ""
                        }
                        onIonChange={updateRepresentativeValueFromInput(
                          index,
                          "idType"
                        )}
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
                        type="number"
                        labelPlacement="stacked"
                        label="* Número de documento"
                        value={representative.idNumber}
                        className={
                          errors.representatives?.[index]?.idNumber?.[0] &&
                          touched.representatives?.[index]?.idNumber
                            ? "ion-touched ion-invalid"
                            : ""
                        }
                        onIonInput={updateRepresentativeValueFromInput(
                          index,
                          "idNumber"
                        )}
                        onIonBlur={validateRepresentativeField(
                          "idNumber",
                          index
                        )}
                        errorText={
                          errors.representatives?.[index]?.idNumber?.[0]
                        }
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonInput
                        labelPlacement="stacked"
                        label="* Cargo"
                        value={representative.role}
                        className={
                          errors.representatives?.[index]?.role?.[0] &&
                          touched.representatives?.[index]?.role
                            ? "ion-touched ion-invalid"
                            : ""
                        }
                        onIonInput={updateRepresentativeValueFromInput(
                          index,
                          "role"
                        )}
                        onIonBlur={validateRepresentativeField("role", index)}
                        errorText={errors.representatives?.[index]?.role?.[0]}
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
              <IonItemDivider>
                <IonLabel>Carta de Solicitud de Acreditación</IonLabel>
              </IonItemDivider>
              <input
                ref={fileUploadRef}
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={setFile}
              />
              {PDFPreview && (
                <Document file={PDFPreview}>
                  <Thumbnail
                    width={windowWidth}
                    className={styles.PDFPreview}
                    pageNumber={1}
                  />
                </Document>
              )}
              <IonButton
                size="large"
                color="dark"
                fill="outline"
                expand="block"
                onClick={openFileDialog}
              >
                <IonIcon slot="start" icon={document}></IonIcon>
                <IonLabel>
                  * {PDFPreview ? "Reemplazar" : "Adjuntar"} PDF
                </IonLabel>
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
                disabled={!canSubmit}
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
