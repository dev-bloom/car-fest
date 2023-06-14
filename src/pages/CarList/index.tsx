import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonList,
  IonNote,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import styles from "./style.module.scss";
import { mockCar } from "../../constants/mocks";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faFireAlt,
  faSpinner,
  faTrafficLight,
} from "@fortawesome/free-solid-svg-icons";
const carList = [mockCar, mockCar, mockCar, mockCar, mockCar, mockCar];

const Carlist = () => {
  const [activeSegment, setActiveSegment] = useState<string>("eight");

  const handleSegmentChange = ({ detail: { value } }: CustomEvent) => {
    setActiveSegment(value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BlackList</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar placeholder="Buscar"></IonSearchbar>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={activeSegment} onIonChange={handleSegmentChange}>
            <IonSegmentButton className={styles.segment} value="eight">
              <FontAwesomeIcon
                className={styles.segmentIcon}
                icon={faTrafficLight}
              ></FontAwesomeIcon>
              1/8 Mile
            </IonSegmentButton>
            <IonSegmentButton className={styles.segment} value="donuts">
              <FontAwesomeIcon
                className={styles.segmentIcon}
                icon={faSpinner}
              ></FontAwesomeIcon>
              Donuts
            </IonSegmentButton>
            <IonSegmentButton className={styles.segment} value="pops">
              <FontAwesomeIcon
                className={styles.segmentIcon}
                icon={faFireAlt}
              ></FontAwesomeIcon>
              Pops
            </IonSegmentButton>
            <IonSegmentButton className={styles.segment} value="exhibition">
              <FontAwesomeIcon
                className={styles.segmentIcon}
                icon={faCarSide}
              ></FontAwesomeIcon>
              Exhibition
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">BlackList</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {carList.map((car, index) => (
            <IonCard
              className={styles.participantCard}
              key={car.id}
              routerLink={`/car/${car.id}`}
            >
              <IonCardHeader className={styles.participantCardHeader}>
                <IonNote>
                  {car.specs.make} {car.specs.model}
                </IonNote>
                <IonCardTitle>{car.alias}</IonCardTitle>
                {activeSegment === "eight" && car.eightMile && (
                  <IonCardSubtitle>
                    Récord: {car.eightMile.time}s
                  </IonCardSubtitle>
                )}
                {activeSegment === "donuts" && car.donuts && (
                  <IonCardSubtitle>
                    Récord: {car.donuts.amount} donas
                  </IonCardSubtitle>
                )}
                {activeSegment === "exhibition" && car.exhibition && (
                  <IonCardSubtitle>
                    Stand: {car.exhibition.stand}
                  </IonCardSubtitle>
                )}

                <div
                  className={styles.cardImage}
                  style={{ backgroundImage: `url(${car.gallery[0]})` }}
                ></div>
                <div className={styles.carRanking}>
                  <IonText className={styles.carRakingNumber}>
                    # {index + 1}
                  </IonText>
                </div>
              </IonCardHeader>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Carlist;
