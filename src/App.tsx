import * as React from "react";
import MapWithGeoman from "./map/MapWithGeoman";
import { TileLayer } from "react-leaflet";

import "./styles.css";
import "leaflet/dist/leaflet.css";

const defaultPosition = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13
};

export default function App() {
  const position: [number, number] = [defaultPosition.lat, defaultPosition.lng];

  const onSelectionCircleAdded = () => console.log("circle added");
  const onSelectionCircleMoved = () => console.log("circle moved");
  const onSelectionCircleRemoved = () => console.log("circle removed");

  

  return (
    <MapWithGeoman
      className="map"
      center={position}
      zoom={defaultPosition.zoom}
      onSelectionCircleAdded={onSelectionCircleAdded}
      onSelectionCircleMoved={onSelectionCircleMoved}
      onSelectionCircleRemoved={onSelectionCircleRemoved}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapWithGeoman>
  );
}
