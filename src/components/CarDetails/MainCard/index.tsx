import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonText,
  IonNote,
  IonList,
  IonItemGroup,
  IonItem,
  IonToggle,
  IonButtons,
} from "@ionic/react";
import cn from "classnames";
import {
  heart,
  logoInstagram,
  logoTiktok,
  logoYoutube,
  qrCode,
} from "ionicons/icons";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { EffectCoverflow, Pagination, Zoom } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/zoom";
import styles from "./style.module.scss";
import { CarInfo, QR } from "../../../types";
import { getQR, getQRForCar } from "../../../api/qr";

type MainCardProps = {
  activeSegment: string;
  onSegmentChange: (value: string) => void;
  carInfo: CarInfo;
};

const MainCard: FC<MainCardProps> = ({
  activeSegment,
  onSegmentChange,
  carInfo,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [qr, setQR] = useState<QR | null>(null);

  const fetchQR = async () => {
    if (!carInfo.id) return;
    const responseQR: QR = await getQRForCar(carInfo.id);
    setQR(responseQR);
  };

  useEffect(() => {
    fetchQR();
  }, [carInfo]);

  useLayoutEffect(() => {
    if (swiper) {
      setTimeout(() => {
        swiper.update();
      }, 0);
    }
  }, [swiper]);

  const handleFavoriteClick = () => {
    setIsLiked(!isLiked);
  };

  const handleSegmentChange = ({ detail }: CustomEvent) => {
    onSegmentChange(detail.value);
  };

  return (
    <IonCard>
      <Swiper
        className={styles.swiper}
        modules={[Zoom, Pagination, EffectCoverflow]}
        pagination={{
          clickable: true,
          dynamicMainBullets: 3,
          dynamicBullets: true,
          enabled: true,
        }}
        zoom={{ maxRatio: 5 }}
        effect="coverflow"
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {carInfo.gallery.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container">
              <img src={image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <IonCardHeader className={styles.header}>
        <div className={styles.cardHeader}>
          <div>
            <IonCardTitle>{carInfo.alias}</IonCardTitle>
            <IonCardSubtitle>
              {carInfo.specs?.modelYear} {carInfo.specs?.make}{" "}
              {carInfo.specs?.model}
            </IonCardSubtitle>
          </div>
          <IonButtons>
            <IonButton
              disabled
              size="large"
              fill="clear"
              onClick={handleFavoriteClick}
            >
              <div className={styles.likeButton}>
                <IonIcon
                  className={cn(styles.likeIcon, {
                    [styles.isLiked]: isLiked,
                  })}
                  icon={heart}
                />
                <IonText color="dark" className={styles.likeButtonText}>
                  {carInfo.likes}
                </IonText>
              </div>
            </IonButton>
            <IonButton
              disabled={!qr}
              size="large"
              fill="clear"
              routerLink={`/badge/${qr?.id}`}
            >
              <div>
                <IonIcon icon={qrCode} />
              </div>
            </IonButton>
          </IonButtons>
        </div>
        <IonSegment
          color="dark"
          value={activeSegment}
          onIonChange={handleSegmentChange}
        >
          <IonSegmentButton value="technicalDetails">
            <IonLabel>Datos</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="carfest">
            <IonLabel>Carfest</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="social">
            <IonLabel>Social</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonCardHeader>

      <IonCardContent>
        {activeSegment === "technicalDetails" && (
          <div className={styles.specsGrid}>
            <div className={styles.specItem}>
              <IonLabel color="dark">Caballos De Fuerza (HP@rpm)</IonLabel>
              <IonNote>
                {carInfo.specs?.horsePower}@{carInfo.specs?.hpRPM}
              </IonNote>
            </div>
            <div className={styles.specItem}>
              <IonLabel color="dark">Torque (NM@rpm)</IonLabel>
              <IonNote>
                {carInfo.specs?.torque}@{carInfo.specs?.torqueRPM}
              </IonNote>
            </div>
            <div className={styles.specItem}>
              <IonLabel color="dark">Cilindraje (CC)</IonLabel>
              <IonNote>{carInfo.specs?.displacement}</IonNote>
            </div>
            <div className={styles.specItem}>
              <IonLabel color="dark">Disposición cilindros</IonLabel>
              <IonNote>
                {carInfo.specs?.cylinders} {carInfo.specs?.cylindersLayout}
              </IonNote>
            </div>
            <div className={styles.specItem}>
              <IonLabel color="dark">Aspiración</IonLabel>
              <IonNote>{carInfo.specs?.aspiration}</IonNote>
            </div>
            <div className={styles.specItem}>
              <IonLabel color="dark">Transmisión</IonLabel>
              <IonNote>{carInfo.specs?.transmission}</IonNote>
            </div>
            <div className={styles.specItem}>
              <IonLabel color="dark">Tracción</IonLabel>
              <IonNote>{carInfo.specs?.driveType}</IonNote>
            </div>
            <div className={styles.specItem}>
              <IonLabel color="dark">Peso (KG)</IonLabel>
              <IonNote>{carInfo.specs?.weight}</IonNote>
            </div>
            <div className={styles.specItem}>
              <IonLabel color="dark">0-100</IonLabel>
              <IonNote>{carInfo.specs?.zeroToSixty}s</IonNote>
            </div>
            <div className={styles.specItem}>
              <IonLabel color="dark">Velocidad Máxima</IonLabel>
              <IonNote>{carInfo.specs?.topSpeed}</IonNote>
            </div>
          </div>
        )}
        {activeSegment === "carfest" && (
          <IonList className={styles.eventsContainer}>
            <IonItemGroup>
              <IonItem>
                <IonToggle
                  disabled
                  checked={carInfo.events.includes("eightMile")}
                >
                  1/8 De Milla
                </IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle disabled checked={carInfo.events.includes("donuts")}>
                  Donas
                </IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle disabled checked={carInfo.events.includes("pops")}>
                  Pops & Bangs
                </IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle
                  disabled
                  checked={carInfo.events.includes("exhibition")}
                >
                  Exhibición
                </IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle disabled checked={carInfo.events.includes("slalom")}>
                  Slálom
                </IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle disabled checked={carInfo.events.includes("limbo")}>
                  Carro Mas Bajo
                </IonToggle>
              </IonItem>
            </IonItemGroup>
          </IonList>
        )}
        {activeSegment === "social" && (
          <div className={styles.socialMediaContainer}>
            {carInfo.social?.tikTok && (
              <IonButton
                className={styles.socialMediaButton}
                shape="round"
                color="light"
                size="large"
                href={`https://www.tiktok.com/${carInfo.social?.tikTok}`}
              >
                <IonIcon slot="icon-only" icon={logoTiktok} />
              </IonButton>
            )}
            {carInfo.social?.instagram && (
              <IonButton
                className={styles.socialMediaButton}
                shape="round"
                color="light"
                size="large"
                href={`https://instagram.com/${carInfo.social?.instagram}`}
              >
                <IonIcon slot="icon-only" icon={logoInstagram} />
              </IonButton>
            )}
            {carInfo.social?.youtube && (
              <IonButton
                className={styles.socialMediaButton}
                shape="round"
                color="light"
                size="large"
                href={`https://youtube.com/${carInfo.social?.youtube}`}
              >
                <IonIcon slot="icon-only" icon={logoYoutube} />
              </IonButton>
            )}
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default MainCard;
