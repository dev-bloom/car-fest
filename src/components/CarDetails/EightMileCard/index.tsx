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
import { time, eye, speedometer } from "ionicons/icons";
import { FC } from "react";

import styles from "../carDetails.module.scss";

type EightMileCardProps = {};

const EightMileCard: FC<EightMileCardProps> = ({}) => {
  return (
    <IonCard color="primary">
      <IonCardHeader className={styles.header}>
        <div className={styles.cardHeader}>
          <div>
            <IonCardTitle>1/8 de milla</IonCardTitle>
            <IonCardSubtitle>Categoría: 12s</IonCardSubtitle>
          </div>
          <IonNote color="dark" className={styles.participantNumber}>
            # 8
          </IonNote>
        </div>
      </IonCardHeader>

      <IonCardContent className="ion-no-padding">
        <IonList>
          <IonItemGroup>
            <IonItemDivider color="dark">
              <IonLabel>10:30:03 AM</IonLabel>
            </IonItemDivider>
            <IonItem color="primary">
              <IonIcon icon={time} slot="start"></IonIcon>
              <IonLabel>Tiempo</IonLabel>
              <IonLabel>10.200</IonLabel>
            </IonItem>
            <IonItem color="primary">
              <IonIcon icon={eye} slot="start"></IonIcon>
              <IonLabel>Reacción</IonLabel>
              <IonLabel>0.355</IonLabel>
            </IonItem>
            <IonItem color="primary">
              <IonIcon icon={speedometer} slot="start"></IonIcon>
              <IonLabel>Velocidad</IonLabel>
              <IonLabel>180km/h</IonLabel>
            </IonItem>
          </IonItemGroup>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
export default EightMileCard;
