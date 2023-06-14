import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
} from "@ionic/react";
import { FC } from "react";

type ModificationsCardProps = {};

const ModificationsCard: FC<ModificationsCardProps> = ({}) => {
  return (
    <IonCard color="dark">
      <IonCardHeader>
        <IonCardTitle>Modificaciones</IonCardTitle>
      </IonCardHeader>

      <IonCardContent className="ion-no-padding">
        <IonList>
          <IonItemGroup>
            <IonItemDivider color="light">
              <IonLabel>Funcional</IonLabel>
            </IonItemDivider>
            <IonItem color="dark">
              <IonLabel>Downpipe sin catalizador</IonLabel>
              <IonLabel>+ 10hp</IonLabel>
            </IonItem>
            <IonItem color="dark">
              <IonLabel>JB4</IonLabel>
              <IonLabel>+ 60hp</IonLabel>
            </IonItem>
            <IonItem color="dark">
              <IonLabel>Pilot Sport 5</IonLabel>
              <IonLabel>+ Agarre</IonLabel>
            </IonItem>
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider color="light">
              <IonLabel>Estético</IonLabel>
            </IonItemDivider>
            <IonItem color="dark">Underglow</IonItem>
            <IonItem color="dark">Wrap</IonItem>
          </IonItemGroup>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
export default ModificationsCard;
