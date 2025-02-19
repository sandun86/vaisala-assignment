import React from "react";
import { Button } from "react-bootstrap";
import { TemperatureToggleProps } from "../types/Map";

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ isCelsius, onToggle }) => {
  return (
    <Button variant="secondary" className="w-100" onClick={onToggle}>
      Switch to {isCelsius ? "°F" : "°C"}
    </Button>
  );
};

export default TemperatureToggle;
