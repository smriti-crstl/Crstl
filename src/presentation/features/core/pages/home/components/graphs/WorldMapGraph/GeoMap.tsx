import { ReactElement } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { MarkerProp } from "../../../mocks";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

type GeoMapProps = {
  setTooltipContent: React.Dispatch<React.SetStateAction<string>>;
  position: { coordinates: [number, number]; zoom: number };
  setPosition: React.Dispatch<
    React.SetStateAction<{
      coordinates: [number, number];
      zoom: number;
    }>
  >;
  markers: MarkerProp[];
};

export const GeoMap = ({
  setTooltipContent,
  position,
  setPosition,
  markers,
}: GeoMapProps): ReactElement => {
  return (
    <div style={{ height: "350px" }}>
      <ComposableMap
        projection="geoAlbers"
        viewBox="0 0 680 360"
        preserveAspectRatio="none"
      >
        <ComposableMap preserveAspectRatio="none" viewBox="20 60 850 480">
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={(position) => setPosition(position)}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    fill="#BAC3DC"
                    stroke="#BAC3DC"
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            {markers.map(
              ({
                name,
                coordinates,
                color,
              }: {
                name: string;
                coordinates: any;
                color: string;
              }) => (
                <Marker
                  key={name}
                  data-tip=""
                  coordinates={coordinates}
                  onMouseEnter={() => setTooltipContent(name)}
                >
                  <circle r={5} fill={color} />
                </Marker>
              )
            )}
          </ZoomableGroup>
        </ComposableMap>
      </ComposableMap>
    </div>
  );
};
