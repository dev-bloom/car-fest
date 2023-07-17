import { IonButton, IonContent, IonPage } from "@ionic/react";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import Badge from "../../components/Badge";
import { BadgeType } from "../../components/Badge/types";
import { getEmptyQRList } from "../../api/qr";

const BadgesPage = () => {
  const [badges, setBadges] = useState<BadgeType[]>([]);

  const fetchEmptyQRList = async () => {
    const QRList = await getEmptyQRList();
    const badges: BadgeType[] = QRList.map(({ id }) => {
      const badge: BadgeType = {
        qr: id as string,
      };
      return badge;
    });
    setBadges(badges);
  };

  useEffect(() => {
    fetchEmptyQRList();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <IonPage>
      <IonContent>
        <IonButton
          className="no-print"
          onClick={handlePrint}
          expand="block"
          color="dark"
        >
          Imprimir
        </IonButton>
        <div className={styles.container}>
          {badges.map((badge) => (
            <div className={styles.badge}>
              <Badge key={badge.qr} badge={badge} />
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BadgesPage;
