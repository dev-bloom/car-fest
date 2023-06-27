import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import type { IonRefresherCustomEvent } from "@ionic/core";
import { useEffect, useState } from "react";
import { Media } from "../../types";
import { getMedias } from "../../api/media";
import { arrowForward, people } from "ionicons/icons";
import styles from "./styles.module.scss";

const MediaListPage = () => {
  const [mediaList, setMediaList] = useState<Media[]>([]);

  const loadMedia = async (
    e?: IonRefresherCustomEvent<RefresherEventDetail>
  ) => {
    const mediaList = await getMedias();
    setMediaList(mediaList);
    e?.detail?.complete();
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Prensa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={loadMedia}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Prensa</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItemDivider>
            {mediaList.length} registros de prensa
          </IonItemDivider>
          {mediaList.map((media) => (
            <IonItem routerLink={`media-list/${media.id}`} key={media.id}>
              <div slot="start" className={styles.repCount}>
                <IonIcon icon={people} />
                {media.representatives.length}
              </div>
              <IonLabel>{media.name}</IonLabel>
              <IonIcon slot="end" icon={arrowForward} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MediaListPage;
