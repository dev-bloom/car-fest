import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import { lockClosed } from "ionicons/icons";
import styles from "./style.module.scss";

const ClosedRegistration = () => {
  return (
    <IonPage>
      <IonContent>
        <div className={styles.closedRegistrationContainer}>
          <IonCard color="dark" className={styles.closedRegistrationCard}>
            <IonCardHeader>
              <IonCardTitle>Inscripión cerrada</IonCardTitle>
              <IonCardSubtitle>Formulario no disponible</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className={styles.closedRegistrationCardContent}>
              <IonIcon color="medium" size="large" icon={lockClosed}></IonIcon>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ClosedRegistration;
