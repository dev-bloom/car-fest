import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonNavLink,
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
  place: string;
};

const firstDaySchedule: ScheduleItem[] = [
  {
    time: "6:00 am",
    title: "Ingreso de pilotos permitido",
    place: "Zona 1",
  },
  {
    time: "7:00 am",
    title: "Reunión de pilotos",
    place: "Zona 2",
  },
  {
    time: "7:30 am",
    title: "Revisión de seguridad",
    place: "Zona 2",
  },
  {
    time: "8:30 am",
    title: "Organización pregrilla (Y confirmacion bomberos para arrancar)",
    place: "Zona 3",
  },
  {
    time: "9:00 am",
    title: "Himno cantado (Apertura del evento)",
    place: "Zona 3",
  },
  {
    time: "9:15 am",
    title: "Prácticas ⅛ de milla",
    place: "Zona 3",
  },
  {
    time: "11:20 am",
    title: "Exhibición de Marcas y Movimiento cultura (Artistas)",
    place: "Zona 3",
  },
  {
    time: "12:00 am",
    title: "Exhibición slalom prácticas (pilotos expertos)",
    place: "Zona 3",
  },
  {
    time: "1:00 pm",
    title: "Exhibición  (pilotos expertos)",
    place: "Zona 3",
  },
  {
    time: "1:30 pm",
    title: "Clasificatorias 1/8 Milla",
    place: "Zona 3",
  },
  {
    time: "4:00 pm",
    title: "Movimiento marcas",
    place: "Zona 3",
  },
  {
    time: "4:20 pm",
    title: "Movimiento cultural (artistas)",
    place: "Zona 3",
  },
];

const secondDaySchedule: ScheduleItem[] = [
  {
    time: "6:00 am",
    title: "Ingreso de pilotos permitido y organización pregrilla",
    place: "Zona 1",
  },
  {
    time: "7:00 am",
    title: "Reclasificación de pilotos",
    place: "Zona 2",
  },
  {
    time: "8:00 am",
    title: "Semifinales",
    place: "Zona 2",
  },
  {
    time: "10:30 am",
    title: "Carro mas bajo",
    place: "Zona 2",
  },
  {
    time: "11:00 am",
    title: "Exhibición (pilotos expertos)",
    place: "Zona 2",
  },
  {
    time: "11:30 am",
    title: "Movimiento cultural (artistas)",
    place: "Zona 2",
  },
  {
    time: "12:00 pm",
    title: "Movimiento de marcas y cultural",
    place: "Zona 2",
  },
  {
    time: "1:10 pm",
    title: "Slalom tiempo final",
    place: "Zona 2",
  },
  {
    time: "1:30 pm",
    title: "Finales",
    place: "Zona 2",
  },
  {
    time: "2:30 pm",
    title: "Pops and bangs",
    place: "Zona 2",
  },
  {
    time: "4:00 pm",
    title: "Premiacion y cierre (DJ)",
    place: "Zona 2",
  },
];

const mapScheduleTime = ({ time, title, place }: ScheduleItem) => ({
  subTitle: (
    <IonText color="dark">
      <sub>
        <IonRouterLink href="/map">
          <div className={styles.scheduleItemPlace}>
            {place}
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cronograma</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cronograma</IonTitle>
          </IonToolbar>
        </IonHeader>
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
