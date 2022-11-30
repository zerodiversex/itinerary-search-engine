import React from "react";
import { Map, MapProps } from "react-leaflet";
import L from "leaflet";

import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

type PMDrawCircleEvent = { layer: L.Circle & { pm: { enable: () => void } } };
type PMEditCircleEvent = { target: L.Circle };

interface Props extends MapProps {
  onSelectionCircleAdded: (latLang: L.LatLng, radius: number) => void;
  onSelectionCircleMoved: (latLang: L.LatLng, radius: number) => void;
  onSelectionCircleRemoved: () => void;
}

const MapWithGeoman: React.FC<Props> = (props) => {
  const {
    children,
    onSelectionCircleAdded: onCircleAdded,
    onSelectionCircleMoved: onCircleMoved,
    onSelectionCircleRemoved: onCircleRemoved,
    ...mapProps
  } = props;

  const leafletMapRef = React.useRef<Map>(null);

  React.useEffect(() => {
    if (leafletMapRef.current) {
      const mapElement = leafletMapRef.current.leafletElement;

      (mapElement as any).pm.addControls({
        drawMarker: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawPolygon: false,
        editMode: false,
        dragMode: false,
        cutPolygon: false
      });

      (mapElement as any).pm.setGlobalOptions({ pmIgnore: false });

      mapElement.on("pm:create", (e) => {
        if (e.layer && e.layer.pm) {
          const circle = (e as unknown) as PMDrawCircleEvent;

          // enable editing of circle
          circle.layer.pm.enable();

          onCircleAdded(circle.layer.getLatLng(), circle.layer.getRadius());

          circle.layer.on("pm:edit", (e) => {
            const event = (e as unknown) as PMEditCircleEvent;
            onCircleMoved(event.target.getLatLng(), event.target.getRadius());
          });
        }
      });

      mapElement.on("pm:remove", () => {
        onCircleRemoved();
      });
    }
  });

  return (
    <Map ref={leafletMapRef} {...mapProps}>
      {children}
    </Map>
  );
};

export default MapWithGeoman;
