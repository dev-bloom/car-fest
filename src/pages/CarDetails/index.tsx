import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import EightMileCard from "../../components/CarDetails/EightMileCard";
import DonutsCard from "../../components/CarDetails/DonutsCard";
import ModificationsCard from "../../components/CarDetails/ModificationsCard";
import MainCard from "../../components/CarDetails/MainCard";
import { CarInfo } from "../../types";
import { mockCar } from "../../constants/mocks";

const carInfo: CarInfo = mockCar;

const CarDetails: React.FC = () => {
  const [activeSegment, setActiveSegment] =
    useState<string>("technicalDetails");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Carfest</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <MainCard
          activeSegment={activeSegment}
          onSegmentChange={setActiveSegment}
          carInfo={carInfo}
        />

        <EightMileCard />

        <DonutsCard />

        <ModificationsCard />
      </IonContent>
    </IonPage>
  );
};

export default CarDetails;
