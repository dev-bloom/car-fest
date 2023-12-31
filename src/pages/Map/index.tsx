import cn from "classnames";
import styles from "./styles.module.scss";
import {
  IonButton,
  IonContent,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import { LocationName, LocationPin, locationGroups } from "./utils";

export const MapPage = () => {
  const svgRef = useRef<any>(null);
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null);
  const location = useLocation();

  const highlightPart = (part: string) => {
    if (highlightedPart === part) {
      setHighlightedPart(null);
      return;
    }
    setHighlightedPart(part);
  };

  useLayoutEffect(() => {
    const { location: routerLocation } = queryString.parse(location.search);

    if (routerLocation) {
      setTimeout(() => {
        setHighlightedPart(routerLocation as string);
      }, 1500);
    } else {
      setTimeout(() => {
        setHighlightedPart("entrance");
      }, 1500);
      setTimeout(() => {
        setHighlightedPart(null);
      }, 3500);
    }
  }, [location]);

  return (
    <IonPage>
      <IonContent>
        <svg className={styles.svg} viewBox="0 0 168.88 332.84" ref={svgRef}>
          <path
            className={cn(styles.trackPath, {
              [styles.highlightActive]: highlightedPart,
            })}
            d="m2.57,331.3l28.3-47.26s2.03-50.02,4.48-59.7c1.04-4.09,7.42-13.32,7.96-17.98,4.73-41.41,18.24-170.82,18.92-189.29.74-20.13,22.91-13.13,28.74-11.86,11.27,2.45,46.23,6.31,59.41,16.76,4.53,3.59,11.87,14.9,11.3,22.44-1.86,24.17-28.44,77.7-26.51,100.97,4.24,51.15,18.6,112.21,28.93,146.3,7.72,25.48-11.47,28.94-20.76,29.99-14.41,1.64-62.72.06-70.07-4.74-11.61-7.59-42.4-32.88-42.4-32.88"
          />
          <line
            className={cn(styles.trackPath, styles.trackPathDelay, {
              [styles.highlightActive]: highlightedPart,
            })}
            x1="57.89"
            y1="66.99"
            x2="153.4"
            y2="76.58"
          />
          <circle
            className={styles.trackPath}
            cx="40"
            cy="218"
            r="8"
            fill="white"
          />
          <line
            className={cn(styles.trackPath, styles.trackPathDelay, {
              [styles.highlightActive]: highlightedPart,
            })}
            x1="57.89"
            y1="80"
            x2="145"
            y2="90"
          />
          <line
            className={cn(styles.trackPath, styles.trackPathDelay, {
              [styles.highlightActive]: highlightedPart,
            })}
            x1="48.57"
            y1="158.15"
            x2="136.99"
            y2="163.24"
          />
          <polyline
            className={cn(styles.trackPath, styles.trackPathDelay, {
              [styles.highlightActive]: highlightedPart,
            })}
            points="38.43 217.62 94.46 220.91 147.15 224"
          />
          <line
            className={cn(styles.trackPath, styles.trackPathDelayDouble, {
              [styles.highlightActive]: highlightedPart,
            })}
            x1="94.46"
            y1="220.91"
            x2="88.86"
            y2="320.36"
          />
          <g
            style={{
              ["--custom-color" as string]: locationGroups[0].color,
            }}
          >
            {highlightedPart === "entrance" && (
              <circle
                className={styles.entranceHighlight}
                cx="90"
                cy="320"
                r="12"
              />
            )}
            {highlightedPart === "comida" && (
              <line
                className={styles.foodHighlight}
                x1="41"
                y1="218"
                x2="145"
                y2="224.38"
              />
            )}
          </g>
          <g
            style={{
              ["--custom-color" as string]: locationGroups[1].color,
            }}
          >
            {highlightedPart === "eight" && (
              <line
                className={cn(styles.eightMileHighlight)}
                x1="46"
                y1="190"
                x2="63"
                y2="15"
              />
            )}

            {highlightedPart === "donuts" && (
              <circle
                className={styles.donutHighlight}
                cx="40"
                cy="218"
                r="12"
              />
            )}

            {highlightedPart === "slalom" && (
              <line
                className={styles.slalomHighlight}
                x1="60"
                y1="67"
                x2="151"
                y2="77"
              />
            )}

            {highlightedPart === "exhibition" && (
              <line
                className={styles.exhibitionHighlight}
                x1="89"
                y1="318"
                x2="95"
                y2="221.31"
              />
            )}

            {highlightedPart === "exhibition" && (
              <line
                className={styles.exhibitionHighlight}
                x1="51"
                x2="135"
                y1="158"
                y2="163"
              />
            )}

            {highlightedPart === "pops" && (
              <circle
                className={styles.entranceHighlight}
                cx="40"
                cy="218"
                r="12"
              />
            )}
          </g>
          {locationGroups.map((group) => (
            <g
              key={group.name}
              style={{ ["--custom-color" as string]: group.color }}
              className={cn(styles.mapIcon)}
            >
              {group.locations.map((location) => (
                <LocationPin
                  key={location.key}
                  onHighlightPart={highlightPart}
                  location={location}
                  className={cn({
                    [styles.pinHighlightActive]: highlightedPart,
                    [styles.highlightedPin]: highlightedPart === location.key,
                  })}
                />
              ))}
            </g>
          ))}
        </svg>
        <IonList className={styles.legend}>
          {locationGroups.map((group) => (
            <IonItemGroup
              key={group.name}
              style={{
                "--custom-color": group.color,
              }}
            >
              <IonItemDivider className={styles.groupLabel}>
                <IonLabel color="dark">{group.name}</IonLabel>
              </IonItemDivider>
              {group.locations.map((location) => (
                <IonItem
                  key={location.key}
                  className={cn(styles.item, {
                    [styles.highlightActiveItem]:
                      highlightedPart === location.key,
                  })}
                  onClick={() => highlightPart(location.key)}
                >
                  <svg className={styles.itemLocationName}>
                    <LocationName
                      x2={24}
                      y2={24}
                      shortName={location.shortName}
                      size={12}
                    />
                  </svg>
                  <IonLabel>{location.name}</IonLabel>
                  <IonButton fill="outline" color="dark">
                    {highlightedPart === location.key ? "Esconder" : "Mostrar"}
                  </IonButton>
                </IonItem>
              ))}
            </IonItemGroup>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
