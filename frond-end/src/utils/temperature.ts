export const celciusToFahrenheit = (temp: number, unit: 1 | 2): number => {
    return unit === 1 ? temp : temp * 1.8 + 32;
  };
  