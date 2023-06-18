import { useEffect, useState } from "react";
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
import { useParams } from "react-router";
import axios from "axios";

const carInfo: CarInfo = mockCar;

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [carInfo, setCarInfo] = useState<CarInfo | null>(null);
  const [activeSegment, setActiveSegment] =
    useState<string>("technicalDetails");

  const getCarInfo = async () => {
    const { data } = await axios.get(`http://localhost:3000/cars/${id}`);
    setCarInfo(data);
  };

  useEffect(() => {
    getCarInfo();
  }, [id]);

  if (!carInfo) {
    return <IonPage></IonPage>;
  }

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

        {carInfo.eightMile && <EightMileCard />}

        {carInfo.donuts && <DonutsCard />}

        {/* <ModificationsCard /> */}
      </IonContent>
    </IonPage>
  );
};

export default CarDetails;
