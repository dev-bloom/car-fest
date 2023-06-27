import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import type { IonRefresherCustomEvent } from "@ionic/core";
import { useEffect, useState } from "react";
import { Media } from "../../types";
import { getMedia } from "../../api/media";
import { useParams } from "react-router";
import { arrowBack } from "ionicons/icons";
import { getCustomer } from "../../api/customer";
import { Customer } from "../../types/customer";

const vehicleTypeMap = {
  car: "Carro",
  bike: "Moto",
  both: "Ambos",
};

const CustomerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setMedia] = useState<Customer | null>(null);

  const loadMedia = async (
    e?: IonRefresherCustomEvent<RefresherEventDetail>
  ) => {
    const loadedCustomer = await getCustomer(id);
    setMedia(loadedCustomer);
    e?.detail?.complete();
  };

  useEffect(() => {
    if (!id) return;
    loadMedia();
  }, []);

  if (!customer) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton fill="clear" slot="start" routerLink="/customer-list">
            <IonIcon slot="icon-only" icon={arrowBack} />
          </IonButton>
          <IonTitle size="large">Cliente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={loadMedia}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cliente</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeSm="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    {customer.names} {customer.lastNames}
                  </IonCardTitle>
                  <IonCardSubtitle>Email: {customer.email}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <strong className="ion-margin-end">Cédula:</strong>
                      <span>{customer.idNumber}</span>
                    </IonItem>
                    <IonItem>
                      <strong className="ion-margin-end">Celular:</strong>
                      <span>{customer.phone}</span>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeSm="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Info vehicular</IonCardTitle>
                  <IonCardSubtitle>
                    Vehículo:{" "}
                    {
                      vehicleTypeMap[
                        customer.vehicleType as keyof typeof vehicleTypeMap
                      ]
                    }
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList className="ion-no-padding">
                    <IonItemGroup className="ion-no-padding">
                      <IonItem>
                        <strong className="ion-margin-end">Placa:</strong>
                        <span>{customer.plate}</span>
                      </IonItem>
                      <IonItem>
                        <strong className="ion-margin-end">
                          Carro soñado:
                        </strong>
                        <span>{customer.dreamCar || "N/A"}</span>
                      </IonItem>
                      <IonItem>
                        <strong className="ion-margin-end">Moto soñada:</strong>
                        <span>{customer.dreamBike || "N/A"}</span>
                      </IonItem>
                    </IonItemGroup>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CustomerDetailsPage;
