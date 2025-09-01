import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WeatherKeys = {
  weatherKeys: (coords: Coordinates) => ['weather', coords] as const,
  forecastKeys: (coords: Coordinates) => ['forecast', coords] as const,
  locationKeys: (coords: Coordinates) => ['location', coords] as const,
} as const;

function useWeatherQuery( coords: Coordinates | null){
  return useQuery({
    queryKey: WeatherKeys.weatherKeys(coords ?? { lat: 0, lon: 0 }),
    queryFn: () => coords ? weatherAPI.getCurrentWeather(coords) : Promise.resolve(null),
    enabled: !!coords
  })
}

function useForecastQuery( coords: Coordinates | null){
  return useQuery({
    queryKey: WeatherKeys.forecastKeys(coords ?? { lat: 0, lon: 0 }),
    queryFn: () => coords ? weatherAPI.getForecast(coords) : Promise.resolve(null),
    enabled: !!coords
  })
}

function useReverseGeocodeQuery( coords: Coordinates | null){
  return useQuery({
    queryKey: WeatherKeys.locationKeys(coords ?? { lat: 0, lon: 0 }),
    queryFn: () => coords ? weatherAPI.reverseGeocode(coords) : Promise.resolve(null),
    enabled: !!coords
  })
}

export { useWeatherQuery, useForecastQuery, useReverseGeocodeQuery }