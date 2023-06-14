import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonNote,
} from "@ionic/react";
import { time, sync } from "ionicons/icons";
import { FC } from "react";

import styles from "../carDetails.module.scss";

type DonutsCardProps = {};

const DonutsCard: FC<DonutsCardProps> = ({}) => {
  return (
    <IonCard color="secondary">
      <IonCardHeader className={styles.header}>
        <div className={styles.cardHeader}>
          <div>
            <IonCardTitle>Donas</IonCardTitle>
            <IonCardSubtitle>Récord: 10</IonCardSubtitle>
          </div>
          <IonNote color="dark" className={styles.participantNumber}>
            # 12
          </IonNote>
        </div>
      </IonCardHeader>

      <IonCardContent className="ion-no-padding">
        <IonList>
          <IonItemGroup>
            <IonItemDivider color="dark">
              <IonLabel>10:30:03 AM</IonLabel>
            </IonItemDivider>
            <IonItem color="secondary">
              <IonIcon icon={time} slot="start"></IonIcon>
              <IonLabel>Tiempo</IonLabel>
              <IonLabel>1:30</IonLabel>
            </IonItem>
            <IonItem color="secondary">
              <IonIcon icon={sync} slot="start"></IonIcon>
              <IonLabel>Donas</IonLabel>
              <IonLabel>10</IonLabel>
            </IonItem>
          </IonItemGroup>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
export default DonutsCard;
