import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Media } from "../../types";
import { getMedias } from "../../api/media";
import { arrowForward, people } from "ionicons/icons";
import styles from "./styles.module.scss";

const MediaListPage = () => {
  const [mediaList, setMediaList] = useState<Media[]>([]);

  const loadMedia = async () => {
    const mediaList = await getMedias();
    setMediaList(mediaList);
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
