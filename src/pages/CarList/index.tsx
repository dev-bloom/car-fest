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
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faFireAlt,
  faSpinner,
  faTrafficLight,
} from "@fortawesome/free-solid-svg-icons";
import { CarInfo, CarInfoEvents } from "../../types";
import { getCars } from "../../api/cars";

const Carlist = () => {
  const [activeSegment, setActiveSegment] =
    useState<keyof CarInfoEvents>("eightMile");
  const [carList, setCarList] = useState<CarInfo[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const handleSegmentChange = ({ detail: { value } }: CustomEvent) => {
    setActiveSegment(value);
  };

  const getCarList = async () => {
    const data = await getCars();
    setCarList(data);
  };

  useEffect(() => {
    getCarList();
  }, []);

  const currentCarList = carList
    .filter(
      ({ events, alias, specs: { make, model } }) =>
        events.includes(activeSegment) &&
        (alias.toLowerCase().includes(searchText.toLowerCase()) ||
          make.toLowerCase().includes(searchText.toLowerCase()) ||
          make.toLowerCase().includes(searchText.toLowerCase()) ||
          model.toLowerCase().includes(searchText.toLowerCase()))
    )
    .sort(
      (a, b) =>
        (a[activeSegment]?.ranking ?? 0) - (b[activeSegment]?.ranking ?? 0)
    );

  const handleSearch = ({ target: { value } }: CustomEvent) => {
    setSearchText(value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BlackList</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            onIonInput={handleSearch}
            placeholder="Buscar"
          ></IonSearchbar>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={activeSegment} onIonChange={handleSegmentChange}>
            <IonSegmentButton className={styles.segment} value="eightMile">
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
          {currentCarList.map((car) => (
            <IonCard
              className={styles.participantCard}
              key={car.id}
              routerLink={`/car/${car.id}`}
            >
              <IonCardHeader className={styles.participantCardHeader}>
                <IonNote>
                  {car.specs?.make} {car.specs?.model}
                </IonNote>
                <IonCardTitle>{car.alias}</IonCardTitle>
                {activeSegment === "eightMile" && car.eightMile && (
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
                {car[activeSegment]?.ranking && (
                  <div className={styles.carRanking}>
                    <IonText className={styles.carRakingNumber}>
                      # {car[activeSegment]?.ranking}
                    </IonText>
                  </div>
                )}
              </IonCardHeader>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Carlist;
