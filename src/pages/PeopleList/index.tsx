import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import type { IonRefresherCustomEvent } from "@ionic/core";
import { useEffect, useState } from "react";
import { Media } from "../../types";
import { getMedias } from "../../api/media";
import { arrowForward, people } from "ionicons/icons";
import { getCustomers } from "../../api/customer";
import { Customer } from "../../types/customer";

const PeopleListPage = () => {
  const [customerList, setCustomerList] = useState<Customer[]>([]);

  const loadCustomers = async (
    e?: IonRefresherCustomEvent<RefresherEventDetail>
  ) => {
    const customers = await getCustomers();
    setCustomerList(customers);
    e?.detail?.complete();
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Clientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={loadCustomers}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Clientes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItemDivider>
            {customerList.length} registros de clientes
          </IonItemDivider>
          {customerList.map((customer) => (
            <IonItem
              routerLink={`customer-list/${customer.id}`}
              key={customer.id}
            >
              <IonLabel>
                {customer.names} {customer.lastNames}
              </IonLabel>
              <IonIcon slot="end" icon={arrowForward} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PeopleListPage;
