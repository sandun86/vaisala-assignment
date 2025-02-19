import React, { useRef } from "react";
import { useMap } from "../hooks/useMap";
import { MapDataProps } from "../types/Map";

const Map: React.FC<MapDataProps> = ({ data, unit }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null!);

  useMap({ mapContainerRef, data, unit }); // use custom hook

  return (
    <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} className="map-container" />
  );
};

export default Map;
