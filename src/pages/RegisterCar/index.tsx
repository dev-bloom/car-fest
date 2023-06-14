import {
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
import { FC, useLayoutEffect, useRef, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";

const RegisterCar: FC = () => {
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

  useLayoutEffect(() => {}, []);

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
                required
                labelPlacement="stacked"
                label="* Marca"
                placeholder="BMW"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                required
                labelPlacement="stacked"
                label="* Modelo"
                placeholder="M340i"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                required
                labelPlacement="stacked"
                label="* Año"
                placeholder="2022"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                labelPlacement="stacked"
                label="Nombre Del Carro"
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
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Caballos de fuerza (RPM)"
                  placeholder="450Hp@5500Rpm"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Torque (NM)"
                  placeholder="500NM"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Torque (RPM)"
                  placeholder="500Nm@1900Rpm"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Cilindraje (CC)"
                  placeholder="3000cc"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Cantidad De Cilindros"
                  placeholder="6"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  labelPlacement="stacked"
                  label="Disposición De Cilindros"
                  placeholder="En línea"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonSelect label="Aspiración" placeholder="Turbocargado">
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
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  labelPlacement="stacked"
                  label="Tracción"
                  placeholder="AWD"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Peso (KG)"
                  placeholder="1670kg"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="0-100 (s)"
                  placeholder="3.6s"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  type="number"
                  labelPlacement="stacked"
                  label="Velocidad Máxima (Km/h)"
                  placeholder="253Km/h"
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
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  labelPlacement="stacked"
                  label="Instagram"
                  placeholder="Nombre de usuario"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  labelPlacement="stacked"
                  label="Youtube"
                  placeholder="Nombre de usuario"
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
