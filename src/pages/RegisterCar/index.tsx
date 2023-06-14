import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";

const RegisterCar: FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro de vehículo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Registro de vehículo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonInput label="Default input"></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              label="Input with placeholder"
              placeholder="Enter company name"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              label="Input with value"
              value="121 S Pinckney St #300"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              label="Readonly input"
              value="Madison"
              readonly={true}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              label="Disabled input"
              value="53703"
              disabled={true}
            ></IonInput>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RegisterCar;
