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
import { checkmarkDoneCircleOutline } from "ionicons/icons";
import styles from "./style.module.scss";

const RegistrationSuccess = () => {
  return (
    <IonPage>
      <IonContent>
        <div className={styles.closedRegistrationContainer}>
          <IonCard color="dark" className={styles.closedRegistrationCard}>
            <IonCardHeader>
              <IonCardTitle>Inscripión Enviada</IonCardTitle>
              <IonCardSubtitle>
                Pronto nos Comunicaremos con Usted
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className={styles.closedRegistrationCardContent}>
              <IonIcon
                color="success"
                size="large"
                icon={checkmarkDoneCircleOutline}
              ></IonIcon>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegistrationSuccess;
