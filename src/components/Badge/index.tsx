import { useEffect, useMemo, useRef, useState } from "react";
import cn from "classnames";
import QRCodeStyling, {
  CornerDotType,
  CornerSquareType,
  DotType,
  DrawType,
  ErrorCorrectionLevel,
  Mode,
  Options,
  TypeNumber,
} from "qr-code-styling";
import { BadgeType, BannerColors } from "./types";
import { bannerColors, eventNames } from "./constants";
import styles from "./style.module.scss";
import { getEndpoint } from "../../api/global";

type BadgeProps = {
  className?: string;
  style?: React.CSSProperties;
  badge: BadgeType;
};

const qrEndpoint = getEndpoint("qr");

const Badge = ({ badge }: BadgeProps) => {
  const link = useMemo(() => {
    return `${qrEndpoint("scan")}/${badge.qr}`;
  }, [badge]);
  const QRRef = useRef<SVGElement | null>(null);

  const showBanner = useMemo(
    () => badge?.event?.ranking && badge.event.ranking < 4,
    [badge]
  );

  const highlight: keyof BannerColors = useMemo(() => {
    switch (badge?.event?.ranking) {
      case 1:
        return "golden";
      case 2:
        return "silver";
      case 3:
        return "bronze";
      default:
        return "default";
    }
  }, [badge]);

  const { color: bannerColor, highlight: bannerHighlight } = useMemo(
    () => bannerColors[highlight],
    [highlight]
  );
  const size = 123;
  const options = useMemo<Options>(
    () => ({
      width: size,
      height: size,
      type: "svg" as DrawType,
      data: link,
      qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: "Byte" as Mode,
        errorCorrectionLevel: "H" as ErrorCorrectionLevel,
      },
      dotsOptions: {
        color: bannerColor,
        gradient: {
          type: "linear",
          rotation: 10,
          colorStops: [
            { offset: 0, color: bannerColor },
            { offset: 0.5, color: bannerHighlight },
            { offset: 0.8, color: bannerColor },
          ],
        },
        type: "square" as DotType,
      },
      backgroundOptions: {
        color: "black",
      },
      cornersSquareOptions: {
        color: bannerColor,
        type: "extra-rounded" as CornerSquareType,
        gradient: {
          type: "linear",
          rotation: 20,
          colorStops: [
            { offset: 0, color: bannerColor },
            { offset: 0.4, color: bannerHighlight },
            { offset: 0.45, color: bannerColor },
          ],
        },
      },
      cornersDotOptions: {
        color: bannerColor,
        type: "round" as CornerDotType,
        gradient: {
          type: "linear",
          rotation: 20,
          colorStops: [
            { offset: 0.5, color: bannerColor },
            { offset: 0.7, color: bannerHighlight },
            { offset: 0.75, color: bannerColor },
          ],
        },
      },
    }),
    [bannerColor, bannerHighlight, link]
  );
  const qrCode: QRCodeStyling = useMemo(
    () => new QRCodeStyling(options),
    [options]
  );

  const category = useMemo(() => {
    switch (badge?.event?.type) {
      case "eightMile":
        return badge.event.time ? Math.floor(badge.event.time) : null;
      default:
        return null;
    }
  }, [badge]);

  const eventName = useMemo(() => {
    return badge?.event?.type ? eventNames[badge?.event?.type] : null;
  }, [badge]);

  useEffect(() => {
    if (QRRef.current) {
      qrCode.append(QRRef.current as unknown as HTMLElement);
    }
  }, [qrCode, QRRef]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
    qrCode.append(QRRef.current as unknown as HTMLElement);
  }, [qrCode, options]);

  return (
    <svg
      style={{
        ["--banner-color" as string]: bannerColor,
        ["--banner-highlight" as string]: bannerHighlight,
      }}
      className={styles.svg}
      viewBox="0 0 371.35 360.38"
    >
      <defs>
        <linearGradient id="gradient">
          <stop offset="10%" stopColor={bannerColor} />
          <stop offset="20%" stopColor={bannerHighlight} />
          <stop offset="70%" stopColor={bannerColor} />
          <stop offset="75%" stopColor={bannerHighlight} />
          <stop offset="95%" stopColor={bannerColor} />
          <stop offset="100%" stopColor={bannerHighlight} />
        </linearGradient>
      </defs>
      <g>
        <path
          className={styles.f}
          d="m351.99,58.99c-.13-.2-45.98-41.15-46.17-41.22-.07-.04-1.09.57-2.26,1.33-12.66,8.26-27.32,13.38-42.91,15.01-25.38,2.65-49.65-2.85-71.95-16.31-1.76-1.06-3.2-1.93-3.24-1.93s-.93.56-2,1.24c-15.81,10-32.62,15.64-51.65,17.31-3.48.3-14.66.3-18.05,0-17.92-1.61-32.3-6.33-45.89-15.07-1.41-.91-2.63-1.61-2.7-1.59-.09.04-10.53,9.33-23.23,20.66l-23.07,20.62.43.52c4.98,6.11,6.7,8.4,9.68,12.96,4.63,7.02,8.64,14.96,11.74,23.19l1.06,2.81,143.94.06,143.93.04.8-2.26c4.37-12.62,11.64-25.42,20.25-35.58.76-.91,1.35-1.72,1.3-1.8Z"
        />
        <text className={styles.k} transform="translate(43.36 70.04)">
          <tspan className={styles.p} x="0" y="0">
            most{" "}
          </tspan>
          <tspan className={styles.o} x="122.85" y="0">
            w
          </tspan>
          <tspan className={styles.q} x="158.9" y="0">
            anted
          </tspan>
        </text>
        {badge?.year && (
          <text className={styles.k}>
            <tspan className={styles.yearLabel} x="148" y="92">
              {badge?.year.getFullYear()}
            </tspan>
          </text>
        )}
        <path
          className={styles.j}
          d="m182.89,3.03c-14.11,10.69-29.35,16.76-47.07,18.75-14.92,1.68-30.45.28-42.85-3.85-3.56-1.2-6.6-2.47-10.3-4.35-5.23-2.65-8.2-4.61-13.87-9.12l-3.28-2.62-.59.55c-.33.31-14.35,12.77-31.17,27.69C16.95,45.03,2.8,57.59,2.32,58.02l-.85.79,4.15,3.81c6.02,5.53,10.26,10.28,14.19,15.88,10.87,15.53,16.45,34.95,16.03,55.8-.13,6.3-.81,10.96-2.62,18.02-2.65,10.35-5.97,19.27-13.61,36.66-7.48,17-11.85,30.97-13.3,42.56-.42,3.32-.41,10.15,0,14.55.81,8.36,2.69,16.34,5.67,23.91,7.06,17.93,20.95,34.82,37.93,46.15,6.8,4.55,14.44,8.25,22.73,11.02,6.91,2.3,8.7,2.65,20.67,4.13,13.08,1.6,29.57,3.7,34.14,4.33,14.41,1.97,26.69,5.23,37.16,9.86,7.07,3.13,12.58,6.63,17.98,11.44,1.31,1.16,2.56,2.21,2.78,2.36.41.26.53.17,3.08-2.1,4.92-4.38,9.28-7.31,15.18-10.22,8.4-4.11,17.85-7.17,29.57-9.56,6.25-1.27,13.43-2.25,44.82-6.1,9.49-1.16,10.98-1.4,13.82-2.12,17.28-4.38,32.09-12.73,44.97-25.33,16.99-16.62,26.23-35.02,28.59-56.93.46-4.27.48-12.79.02-16.12-1.69-12.32-6.06-25.66-15.05-45.96-9.41-21.3-14.04-37.18-14.5-49.74-.13-3.63.18-10.17.7-14.68,2.06-18.4,8.29-33.88,18.88-47.03,2.87-3.57,5.88-6.71,10.24-10.74l4.18-3.83-2.98-2.73c-1.64-1.49-15.79-14.06-31.45-27.93-15.66-13.85-28.72-25.44-29.05-25.75l-.59-.55-2.41,2.16c-5.75,5.12-10,8-15.9,10.8-9.76,4.61-20.32,6.95-34.27,7.57-9.47.44-18.77-.46-27.85-2.67-12.38-3.04-23.49-8.05-35.98-16.27-2.06-1.34-3.76-2.45-3.78-2.43-.02,0-1.23.92-2.71,2.03Zm5.95,15.16c22.2,13.39,46.35,18.86,71.61,16.23,15.51-1.62,30.1-6.72,42.7-14.94,1.16-.76,2.17-1.36,2.25-1.33.18.07,45.82,40.82,45.95,41.03.06.07-.53.88-1.29,1.79-8.57,10.11-15.81,22.84-20.15,35.41l-.79,2.25-143.23-.04-143.25-.06-1.05-2.8c-3.08-8.2-7.07-16.1-11.68-23.08-2.97-4.53-4.68-6.82-9.63-12.9l-.42-.52,22.95-20.52c12.64-11.27,23.03-20.52,23.12-20.56.07-.02,1.29.68,2.69,1.58,13.52,8.7,27.84,13.39,45.67,15,3.37.29,14.5.29,17.96,0,18.94-1.66,35.67-7.28,51.4-17.22,1.07-.68,1.95-1.23,1.99-1.23s1.47.87,3.22,1.92Zm136.58,93.55c-.29,1.16-1.11,6.47-1.42,9.16-2.08,18.29.41,34.41,8.53,55.01,2.27,5.75,3.76,9.12,7.5,16.86,5.77,11.92,8.9,20.12,11.05,28.83,1.95,7.85,2.54,14.19,2.03,21.37-.99,13.58-5.32,25.96-13.12,37.49-5.49,8.11-15.36,18.79-23.05,24.91-6.54,5.23-11.83,7.74-21.04,10-5.95,1.46-9.78,2.06-37.34,5.9-31.34,4.35-31.85,4.44-38.1,5.91-11.59,2.74-21.98,7.09-30.3,12.66-1.22.81-2.69,1.84-3.26,2.28-.57.42-1.12.79-1.23.79-.09,0-1.18-.74-2.39-1.62-10.24-7.46-24.24-12.95-40.18-15.77-1.47-.26-6.72-1.01-11.7-1.68-25.2-3.37-45.43-6.26-48.54-6.93-15.36-3.28-28.85-10.92-40.62-23.03-13.25-13.63-21.17-29.02-23.49-45.63-1.6-11.51-.61-20.52,3.68-33.38,2.32-6.96,4.48-12.09,9.14-21.78,4.16-8.62,6.37-13.76,8.73-20.23,7.66-21.02,9.47-38.39,6.06-58.49-.2-1.22-.42-2.39-.48-2.63l-.09-.41h279.73l-.09.41Z"
        />

        <path d="m25.32,191.6c-4.87,10.12-7.12,15.46-9.54,22.73-4.48,13.42-5.52,22.83-3.85,34.85,2.42,17.35,10.69,33.41,24.52,47.64,12.29,12.64,26.37,20.62,42.41,24.04,3.25.69,24.37,3.71,50.68,7.23,5.19.69,10.67,1.48,12.21,1.75,16.64,2.94,31.25,8.67,41.94,16.46,1.27.92,2.4,1.69,2.5,1.69.12,0,.69-.38,1.29-.83.6-.46,2.13-1.54,3.4-2.38,8.69-5.81,19.54-10.35,31.64-13.21,6.52-1.54,7.06-1.63,39.77-6.17,28.77-4,32.77-4.63,38.98-6.15,9.62-2.37,15.14-4.98,21.96-10.44,8.02-6.39,18.33-17.54,24.06-26,8.13-12.04,12.65-24.96,13.69-39.14.54-7.5-.08-14.12-2.12-22.31-2.25-9.1-5.52-17.65-11.54-30.1-3.9-8.08-5.46-11.6-7.83-17.6-8.48-21.5-11.08-38.33-8.9-57.43.33-2.81,1.17-8.35,1.48-9.56l.1-.42H40.16l.1.42c.06.25.29,1.48.5,2.75,3.56,20.98,1.67,39.12-6.33,61.06-2.46,6.75-4.77,12.12-9.12,21.12Z" />
        <path className={styles.f} d="m173.7,125.68h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m180.38,126.11h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m187.96,125.68h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m195.08,125.68h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m201.76,126.11h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m201.76,277.5h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m151.88,132.99h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m159.45,132.56h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m166.13,132.99h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m173.26,132.99h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m180.83,132.56h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m187.96,132.56h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m194.64,132.99h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m201.76,132.99h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m209.34,132.56h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m216.46,132.56h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m223.59,132.56h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m223.59,270.19h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m144.75,139.87h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m151.88,139.87h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m159,139.87h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m166.13,139.87h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m173.26,139.87h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m180.38,139.87h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m187.51,139.87h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m195.08,139.44h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m202.21,139.44h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m208.89,139.87h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m216.02,139.87h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m223.59,139.44h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m230.27,139.87h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m123.37,160.52h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m251.65,160.52h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m116.24,167.4h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m123.37,167.4h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m252.1,166.97h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m259.22,166.97h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m116.24,174.28h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m123.81,173.85h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m251.65,174.28h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m259.22,173.85h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m116.69,180.73h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m123.81,180.73h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m251.65,181.16h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m258.78,181.16h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m109.56,187.61h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m116.69,187.61h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m123.37,188.04h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m251.65,188.04h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m258.78,188.04h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m265.91,188.04h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m109.11,194.92h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m116.69,194.49h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m123.81,194.49h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m252.1,194.49h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m259.22,194.49h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m266.35,194.49h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m109.11,201.81h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m116.24,201.81h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m123.37,201.81h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m252.1,201.38h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m259.22,201.38h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m266.35,201.38h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m109.56,208.26h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m116.24,208.69h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m123.81,208.26h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m251.65,208.69h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m258.78,208.69h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m266.35,208.26h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m109.11,215.57h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m265.91,215.57h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m116.24,215.57h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m123.37,215.57h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m251.65,215.57h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m259.22,215.14h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m116.69,222.02h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m123.37,222.45h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m252.1,222.02h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m259.22,222.02h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m116.69,228.9h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m123.81,228.9h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m251.65,229.33h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m258.78,229.33h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m116.24,236.21h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m258.78,236.21h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m123.37,236.21h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m251.65,236.21h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m123.37,243.09h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m251.65,243.09h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m145.19,263.31h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m152.32,263.31h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m159,263.74h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m166.58,263.31h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m173.7,263.31h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m180.38,263.74h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m187.96,263.31h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m195.08,263.31h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m201.76,263.74h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m209.34,263.31h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m216.46,263.31h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m223.59,263.31h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m230.72,263.31h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m152.32,270.19h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m159.45,270.19h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m166.58,270.19h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m173.7,270.19h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m180.38,270.62h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m187.96,270.19h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m194.64,270.62h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m201.76,270.62h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m209.34,270.19h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m216.02,270.62h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m173.7,277.07h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m180.83,277.07h-3.56v3.44h3.56v-3.44Z" />
        <path className={styles.f} d="m187.51,277.5h-2.67v2.58h2.67v-2.58Z" />
        <path className={styles.f} d="m194.64,277.5h-2.67v2.58h2.67v-2.58Z" />
        <polygon
          className={styles.i}
          points="185.66 316.34 173.17 322.32 175.55 309.66 165.44 300.68 179.41 298.84 185.66 287.31 191.91 298.84 205.88 300.68 195.77 309.66 198.16 322.32 185.66 316.34"
        />
        <polygon
          className={styles.i}
          points="236.1 302.66 223.6 308.64 225.99 295.98 215.88 287 229.85 285.16 236.1 273.63 242.34 285.16 256.31 287 246.2 295.98 248.59 308.64 236.1 302.66"
        />
        <polygon
          className={styles.i}
          points="185.66 316.34 173.17 322.32 175.55 309.66 165.44 300.68 179.41 298.84 185.66 287.31 191.91 298.84 205.88 300.68 195.77 309.66 198.16 322.32 185.66 316.34"
        />
        <polygon
          className={styles.i}
          points="135.23 302.66 122.73 308.64 125.12 295.98 115.01 287 128.98 285.16 135.23 273.63 141.48 285.16 155.44 287 145.34 295.98 147.72 308.64 135.23 302.66"
        />
        <polygon
          className={styles.i}
          points="93.35 272.13 80.86 278.11 83.24 265.44 73.13 256.47 87.1 254.62 93.35 243.09 99.6 254.62 113.57 256.47 103.46 265.44 105.85 278.11 93.35 272.13"
        />
        <polygon
          className={styles.i}
          points="279.44 272.13 266.95 278.11 269.33 265.44 259.22 256.47 273.19 254.62 279.44 243.09 285.69 254.62 299.66 256.47 289.55 265.44 291.94 278.11 279.44 272.13"
        />
      </g>
      {showBanner && (
        <g transform="translate(24.5,268)">
          <path
            className={cn(styles.boxGradient)}
            d="m.36,79.93c-.09,0-.17-.05-.21-.12-.04-.08-.04-.17,0-.25l11.55-19.03c.09-.15.09-.34,0-.49L.17,41.03c-.05-.08-.05-.17,0-.25.04-.08.12-.12.21-.12h54.71c.13,0,.24.11.24.24v38.78c0,.13-.11.24-.24.24H.36Z"
          />

          {category && (
            <text className={styles.h} transform="translate(17.71 64.58)">
              <tspan className={styles.t} x="0" y="0">
                {category}
              </tspan>
              <tspan className={styles.s} x="13.36" y="0">
                s
              </tspan>
            </text>
          )}

          <polygon
            className={cn(styles.boxGradient)}
            points="48.49 69.94 55.03 69.94 55.02 79.6 48.49 69.94"
          />

          <path
            className={cn(styles.boxGradient)}
            d="m267.38,79.93c-.13,0-.24-.11-.24-.24v-38.78c0-.13.11-.24.24-.24h54.71c.09,0,.17.05.21.12.04.08.04.17,0,.25l-11.53,19c-.09.15-.09.34,0,.49l11.55,19.03c.05.08.05.17,0,.25s-.12.12-.21.12h-54.72Z"
          />

          {category && (
            <text className={styles.h} transform="translate(282.62 64.39)">
              <tspan className={styles.t} x="0" y="0">
                {category}
              </tspan>
              <tspan className={styles.s} x="13.36" y="0">
                s
              </tspan>
            </text>
          )}
          <path
            className={cn(styles.boxGradient)}
            d="m48.62,69.82c-.38,0-.7-.31-.7-.7v-36.96c0-1.34,1.09-2.43,2.43-2.43h221.74c1.34,0,2.43,1.09,2.43,2.43v36.96c0,.39-.31.7-.7.7H48.62Z"
          />
          <polygon
            className={cn(styles.boxGradient)}
            points="267.44 69.93 273.97 69.94 267.43 79.61 267.44 69.93"
          />

          <text className={styles.e} transform="translate(143.02 42.95)">
            <tspan x="0" y="0">
              {badge?.event?.ranking}
            </tspan>
          </text>
          <text className={styles.g} transform="translate(99.97 65.63)">
            <tspan className={styles.r} x="0" y="0">
              {eventName}
            </tspan>
          </text>
        </g>
      )}
      <g transform="translate(125,142)" ref={(ref) => (QRRef.current = ref)} />
    </svg>
  );
};

export default Badge;
