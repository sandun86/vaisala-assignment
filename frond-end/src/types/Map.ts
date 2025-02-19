export type LocationData = {
  lat: number;
  lon: number;
  temp: number;
};

type TemperatureUnit = 1 | 2; // 1 = Celsius, 2 = Fahrenheit

export interface MapDataProps {
  data: LocationData[];
  unit: TemperatureUnit;
}

export interface MapProps extends MapDataProps {
  mapContainerRef: React.RefObject<HTMLDivElement>;
}

export type FileUploadProps = {
  onDataUploaded: (data: LocationData[], error?: string) => void;
};

export type TemperatureToggleProps = {
  isCelsius: boolean;
  onToggle: () => void;
};
