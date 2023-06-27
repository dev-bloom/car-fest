import {
  InputChangeEventDetail,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import type { IonInputCustomEvent } from "@ionic/core";
import { useState } from "react";
import { Entity } from "../../types/common";
import { Customer } from "../../types/customer";
import { createCustomer } from "../../api/customer";

const extractValueFromInputEvent =
  (callback: (value: string) => void) =>
  ({ detail }: IonInputCustomEvent<InputChangeEventDetail>) => {
    if (!detail?.value) return;
    callback(detail?.value);
  };

const extractValueFromSelectEvent =
  (callback: (value: string) => void) =>
  ({ detail }: CustomEvent<InputChangeEventDetail>) => {
    if (!detail?.value) return;
    callback(detail?.value);
  };

const emptyCustomer = {
  names: "",
  lastNames: "",
  idNumber: null,
  vehicleType: "car",
  plate: "",
  dreamCar: "",
  dreamBike: "",
  phone: "",
  email: "",
};

const RegisterPeople = () => {
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
  const [customer, setCustomer] = useState<Customer>({ ...emptyCustomer });

  const setCustomerField = (field: string) => (value: string | number) => {
    setCustomer({ ...customer, [field]: value });
  };
  const submit = async () => {
    await createCustomer({
      ...customer,
      idNumber: Number(customer.idNumber),
    });
    setHasBeenSubmitted(true);
  };

  if (hasBeenSubmitted) {
    return (
      <IonPage>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <h1>Registro exitoso</h1>
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
          <IonTitle size="large">Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Registro</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonInput
              value={customer.names}
              onIonInput={extractValueFromInputEvent(setCustomerField("names"))}
              labelPlacement="stacked"
              label="Nombres"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={customer.lastNames}
              onIonInput={extractValueFromInputEvent(
                setCustomerField("lastNames")
              )}
              labelPlacement="stacked"
              label="Apellidos"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={customer.idNumber}
              onIonInput={extractValueFromInputEvent(
                setCustomerField("idNumber")
              )}
              type="number"
              labelPlacement="stacked"
              label="Cédula"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonSelect
              value={customer.vehicleType}
              onIonChange={extractValueFromSelectEvent(
                setCustomerField("vehicleType")
              )}
              label="Tipo de vehículo"
            >
              <IonSelectOption value="car">Carro</IonSelectOption>
              <IonSelectOption value="bike">Moto</IonSelectOption>
              <IonSelectOption value="both">Ambos</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput
              value={customer.plate}
              onIonInput={extractValueFromInputEvent(setCustomerField("plate"))}
              labelPlacement="stacked"
              label="Placa"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={customer.dreamCar}
              onIonInput={extractValueFromInputEvent(
                setCustomerField("dreamCar")
              )}
              labelPlacement="stacked"
              label="Carro de tus sueños"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={customer.dreamBike}
              onIonInput={extractValueFromInputEvent(
                setCustomerField("dreamBike")
              )}
              labelPlacement="stacked"
              label="Moto de tus sueños"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={customer.phone}
              onIonInput={extractValueFromInputEvent(setCustomerField("phone"))}
              labelPlacement="stacked"
              label="Teléfono"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={customer.email}
              onIonInput={extractValueFromInputEvent(setCustomerField("email"))}
              labelPlacement="stacked"
              label="Correo electrónico"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonNote>
              El registro es para fines comerciales de la empresas pautantes y
              premiaciones por parte de las marcas.
            </IonNote>
          </IonItem>
          <IonButton color="dark" expand="block" onClick={submit}>
            Enviar
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default RegisterPeople;
