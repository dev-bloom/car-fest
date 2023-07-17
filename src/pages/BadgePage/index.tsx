import { IonContent, IonPage } from "@ionic/react";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import Badge from "../../components/Badge";
import { BadgeType } from "../../components/Badge/types";
import { getQR } from "../../api/qr";
import { useParams } from "react-router";

const BadgePage = () => {
  const { id } = useParams<{ id: string }>();
  const [badge, setBadge] = useState<BadgeType | null>(null);

  const fetchQR = async () => {
    const qr = await getQR(id);
    setBadge({
      qr: qr.id as string,
    });
  };

  useEffect(() => {
    if (!id) return;
    fetchQR();
  }, [id]);

  if (!badge) return null;

  return (
    <IonPage>
      <IonContent>
        <div className={styles.container}>
          <Badge badge={badge} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BadgePage;
