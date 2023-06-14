import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

// Pages
import CarDetails from "./pages/CarDetails";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Schedule from "./pages/Schedule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faFireAlt,
  faListNumeric,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./App.module.scss";
import "./_antd-overrides.scss";
import Carlist from "./pages/CarList";
import RegisterCar from "./pages/RegisterCar";
import { MapPage } from "./pages/Map";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/car/:id">
            <CarDetails />
          </Route>
          <Route exact path="/participants">
            <Carlist />
          </Route>
          <Route exact path="/register">
            <RegisterCar />
          </Route>
          <Route exact path="/schedule">
            <Schedule />
          </Route>
          <Route exact path="/map">
            <MapPage />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton
            tab="schedule"
            href="/schedule"
            className={styles.tabButton}
          >
            <FontAwesomeIcon icon={faCalendarDays} className={styles.tabIcon} />
            <IonLabel className={styles.tabLabel}>Cronograma</IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="participants"
            href="/participants"
            className={styles.tabButton}
          >
            <FontAwesomeIcon icon={faListNumeric} className={styles.tabIcon} />

            <IonLabel className={styles.tabLabel}>BlackList</IonLabel>
          </IonTabButton>

          {/* <IonTabButton tab="home" href="/home" className={styles.tabButton}>
            <FontAwesomeIcon icon={faFireAlt} className={styles.tabIcon} />
            <IonLabel className={styles.tabLabel}>Evento</IonLabel>
          </IonTabButton> */}

          <IonTabButton tab="map" href="/map" className={styles.tabButton}>
            <FontAwesomeIcon icon={faMap} className={styles.tabIcon} />
            <IonLabel className={styles.tabLabel}>Mapa</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
