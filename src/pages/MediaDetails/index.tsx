import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Media } from "../../types";
import { getMedia } from "../../api/media";
import { useParams } from "react-router";
import { arrowBack } from "ionicons/icons";

const MediaDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [media, setMedia] = useState<Media | null>(null);

  const loadMedia = async () => {
    const media = await getMedia(id);
    setMedia(media);
  };

  useEffect(() => {
    if (!id) return;
    loadMedia();
  }, []);

  if (!id) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton fill="clear" slot="start" routerLink="/media-list">
            <IonIcon slot="icon-only" icon={arrowBack} />
          </IonButton>
          <IonTitle size="large">Prensa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Prensa</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeSm="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{media?.name}</IonCardTitle>
                  <IonCardSubtitle>Tipo: {media?.type}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItemGroup>
                      <IonItemDivider color="primary">
                        <IonTitle size="small">Redes sociales</IonTitle>
                      </IonItemDivider>
                      <IonItem>Instagram: {media?.social.instagram}</IonItem>
                      <IonItem>Página web: {media?.social.webpage}</IonItem>
                      <IonItem>Facebook: {media?.social.facebook}</IonItem>
                      <IonItem>TikTok: {media?.social.tikTok}</IonItem>
                      <IonItem>Youtube: {media?.social.youtube}</IonItem>
                    </IonItemGroup>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeSm="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{media?.name}</IonCardTitle>
                  <IonCardSubtitle>Tipo: {media?.type}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList className="ion-no-padding">
                    <IonItemGroup className="ion-no-padding">
                      <IonItemDivider color="tertiary">
                        <IonTitle size="small">Representantes</IonTitle>
                      </IonItemDivider>
                      {media?.representatives.map((representative) => (
                        <IonItem
                          key={representative.idNumber}
                          className="ion-margin-bottom ion-margin-top"
                        >
                          <div>
                            <div>Nombre: {representative.name}</div>
                            <div>Rol: {representative.role}</div>
                            <div>Correo: {representative.email}</div>
                            <div>
                              {representative.idType}: {representative.idNumber}
                            </div>
                          </div>
                        </IonItem>
                      ))}
                    </IonItemGroup>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MediaDetailsPage;
