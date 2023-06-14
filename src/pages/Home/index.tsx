import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import styles from "./styles.module.scss";
import { chevronDown, chevronUp } from "ionicons/icons";
import { useState } from "react";

const Home: React.FC = () => {
  const [firstCompetitorVotes, setFirstCompetitorVotes] = useState(0);
  const [secondCompetitorVotes, setSecondCompetitorVotes] = useState(0);

  const vote = (competitor: number) => () => {
    if (competitor === 1) {
      setFirstCompetitorVotes(firstCompetitorVotes + 1);
    } else {
      setSecondCompetitorVotes(secondCompetitorVotes + 1);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className={styles.voteContainer}>
          <div
            style={{
              flexBasis: `${
                (firstCompetitorVotes /
                  (firstCompetitorVotes + secondCompetitorVotes)) *
                100
              }%`,
            }}
            onClick={vote(1)}
            className={styles.firstCompetitor}
          >
            {firstCompetitorVotes}
          </div>

          <div className={styles.versusLabel}>
            <IonRouterLink href={`/car/${1}`}>
              <div className={styles.firstCompetitorName}>
                <IonIcon icon={chevronUp} size="large" />
                Obscure
              </div>
            </IonRouterLink>
            <div className={styles.vs}>VS</div>
            <IonRouterLink href={`/car/${1}`}>
              <div className={styles.secondCompetitorName}>
                TNTSupra
                <IonIcon icon={chevronDown} size="large" />
              </div>
            </IonRouterLink>
          </div>

          <div onClick={vote(0)} className={styles.secondCompetitor}>
            {secondCompetitorVotes}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
