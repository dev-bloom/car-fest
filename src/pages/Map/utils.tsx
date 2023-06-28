export const LocationName = ({
  shortName,
  x2,
  y2,
  size,
}: {
  shortName: string;
  x2: number;
  y2: number;
  size: number;
}) => {
  return (
    <g>
      <circle
        cx={x2}
        cy={y2}
        r={size}
        fill="#333"
        stroke="currentColor"
        strokeWidth={size * 0.15}
      />
      <text
        x={x2}
        y={y2 + (size * 0.8) / 10}
        fontSize={size * 0.75}
        fill="currentColor"
        fontWeight={900}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {shortName}
      </text>
    </g>
  );
};

export const LocationPin = ({
  onHighlightPart,
  location,
  className,
}: {
  onHighlightPart?: (key: string) => void;
  location: LocationWithPosition;
  className?: string;
}) => {
  const { key, position, shortName } = location;
  const { x1, x2, y1, y2 } = position;
  return (
    <g className={className} onClick={() => onHighlightPart?.(key)}>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="currentColor"
        strokeWidth={12}
        strokeLinecap="round"
      />
      <LocationName size={60} x2={x2} y2={y2} shortName={shortName} />
    </g>
  );
};

const labelPointerOffset = 150;

enum AlignmentModes {
  LEFT = "left",
  TOP = "top",
  TOP_RIGHT = "topRight",
  TOP_LEFT = "topLeft",
}

type Location = {
  name: string;
  shortName: string;
  key: string;
  position: {
    x: number;
    y: number;
    labelAlignment?: AlignmentModes;
  };
};

type LocationWithPosition = Location & {
  position: {
    x: number;
    y: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
};

const mapLocationPositions = (location: Location): LocationWithPosition => {
  const { x, y, labelAlignment } = location.position;
  let [x1, x2] = [x, x];
  let [y1, y2] = [y, y];
  if (!labelAlignment || labelAlignment === AlignmentModes.LEFT) {
    x1 = x;
    x2 = x - labelPointerOffset;
    y1 = y;
    y2 = y;
  }
  if (labelAlignment === AlignmentModes.TOP) {
    x1 = x;
    x2 = x;
    y1 = y;
    y2 = y - labelPointerOffset;
  }
  if (labelAlignment === AlignmentModes.TOP_RIGHT) {
    x1 = x;
    x2 = x + labelPointerOffset;
    y1 = y;
    y2 = y - labelPointerOffset;
  }
  if (labelAlignment === AlignmentModes.TOP_LEFT) {
    x1 = x;
    x2 = x - labelPointerOffset;
    y1 = y;
    y2 = y - labelPointerOffset;
  }
  return {
    ...location,
    position: {
      x,
      y,
      x1,
      x2,
      y1,
      y2,
    },
  };
};

const interestLocations: LocationWithPosition[] = [
  {
    name: "Entrada",
    shortName: "E",
    key: "entrance",
    position: {
      x: 360,
      y: 1280,
      labelAlignment: AlignmentModes.TOP_RIGHT,
    },
  },
  {
    name: "Comida",
    shortName: "C",
    key: "comida",
    position: {
      x: 380,
      y: 900,
      labelAlignment: AlignmentModes.TOP,
    },
  },
].map(mapLocationPositions);

const eventLocations: LocationWithPosition[] = [
  {
    name: "1/8 De Milla",
    shortName: "1/8",
    key: "eight",
    position: {
      x: 220,
      y: 400,
    },
  },
  {
    name: "Donas",
    shortName: "D",
    key: "donuts",
    position: {
      x: 150,
      y: 870,
    },
  },
  {
    name: "Pops and Bangs",
    shortName: "P",
    key: "pops",
    position: {
      x: 150,
      y: 870,
      labelAlignment: AlignmentModes.TOP_LEFT,
    },
  },
  {
    name: "Exhibición",
    shortName: "E",

    key: "exhibition",
    position: {
      x: 350,
      y: 644,
      labelAlignment: AlignmentModes.TOP,
    },
  },
  {
    name: "Exhibición",
    shortName: "E",

    key: "exhibition",
    position: {
      x: 380,
      y: 1050,
      labelAlignment: AlignmentModes.TOP_RIGHT,
    },
  },
  {
    name: "Slálom",
    shortName: "S",

    key: "slalom",
    position: {
      x: 430,
      y: 290,
      labelAlignment: AlignmentModes.TOP,
    },
  },
].map(mapLocationPositions);

export const locationGroups = [
  {
    name: "General",
    locations: interestLocations,
    color: "lightblue",
  },
  {
    name: "Eventos",
    locations: eventLocations,
    color: "#FFA500",
  },
];
