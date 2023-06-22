import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonNote,
  IonPage,
  IonRouterLink,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { Steps } from "antd";
import { chevronForward } from "ionicons/icons";
import styles from "./style.module.scss";

type ScheduleItem = {
  time: string;
  title: string;
  place?: string;
};

const firstDaySchedule: ScheduleItem[] = [
  {
    time: "6:00 am",
    title: "Ingreso de pilotos permitido",
    place: "entrance",
  },
  {
    time: "7:00 am",
    title: "Reunión de pilotos",
  },
  {
    time: "7:30 am",
    title: "Revisión de seguridad",
  },
  {
    time: "8:30 am",
    title: "Organización pregrilla (Y confirmacion bomberos para arrancar)",
  },
  {
    time: "9:00 am",
    title: "Himno cantado (Apertura del evento)",
  },
  {
    time: "9:15 am",
    title: "Prácticas ⅛ de milla",
    place: "eight",
  },
  {
    time: "11:20 am",
    title: "Exhibición de Marcas y Movimiento cultura (Artistas)",
  },
  {
    time: "12:00 am",
    title: "Exhibición slalom prácticas (pilotos expertos)",
    place: "slalom",
  },
  {
    time: "1:00 pm",
    title: "Exhibición  (pilotos expertos)",
    place: "slalom",
  },
  {
    time: "1:30 pm",
    title: "Clasificatorias 1/8 Milla",
    place: "eight",
  },
  {
    time: "4:00 pm",
    title: "Movimiento marcas",
  },
  {
    time: "4:20 pm",
    title: "Movimiento cultural (artistas)",
  },
];

const secondDaySchedule: ScheduleItem[] = [
  {
    time: "6:00 am",
    title: "Ingreso de pilotos permitido y organización pregrilla",
    place: "entrance",
  },
  {
    time: "7:00 am",
    title: "Reclasificación de pilotos",
    place: "eight",
  },
  {
    time: "8:00 am",
    title: "Semifinales",
    place: "eight",
  },
  {
    time: "10:30 am",
    title: "Carro mas bajo",
    place: "eight",
  },
  {
    time: "11:00 am",
    title: "Exhibición (pilotos expertos)",
    place: "slalom",
  },
  {
    time: "11:30 am",
    title: "Movimiento cultural (artistas)",
  },
  {
    time: "12:00 pm",
    title: "Movimiento de marcas y cultural",
  },
  {
    time: "1:10 pm",
    title: "Slalom tiempo final",
    place: "slalom",
  },
  {
    time: "1:30 pm",
    title: "Finales",
    place: "eight",
  },
  {
    time: "2:30 pm",
    title: "Pops and bangs",
    place: "pops",
  },
  {
    time: "4:00 pm",
    title: "Premiacion y cierre (DJ)",
  },
];

const mapScheduleTime = ({ time, title, place }: ScheduleItem) => ({
  subTitle: place && (
    <IonText color="dark">
      <sub>
        <IonRouterLink href={`/map?location=${place}`}>
          <div className={styles.scheduleItemPlace}>
            Ubicación
            <IonIcon icon={chevronForward} />
          </div>
        </IonRouterLink>
      </sub>
    </IonText>
  ),
  title: (
    <IonText color="dark">
      <sub>{time}</sub>
    </IonText>
  ),
  description: <IonText color="dark">{title}</IonText>,
});

const firstDayTimeLine = firstDaySchedule.map(mapScheduleTime);
const secondDayTimeline = secondDaySchedule.map(mapScheduleTime);

const Schedule = () => {
  const [activeSegment, setActiveSegment] = useState<string>("first");
  const handleSegmentChange = (e: CustomEvent) => {
    setActiveSegment(e.detail.value);
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard color="light" className="ion-padding">
          <IonCardHeader>
            <IonSegment
              value={activeSegment}
              color="dark"
              onIonChange={handleSegmentChange}
            >
              <IonSegmentButton value="first">
                <IonLabel>Julio 2</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="second">
                <IonLabel>Julio 3</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCardHeader>
          <IonCardContent>
            <Steps
              current={-1}
              percent={100}
              direction="vertical"
              items={
                activeSegment === "first" ? firstDayTimeLine : secondDayTimeline
              }
            />
          </IonCardContent>
          <IonNote>
            <p>
              <strong>Nota:</strong> El cronograma puede cambiar sin previo
              aviso.
            </p>
          </IonNote>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
