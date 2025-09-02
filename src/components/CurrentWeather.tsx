import type { WeatherData, GeocodingResponse } from "@/api/types"
import { Card, CardContent } from "./ui/card";
import { Droplets, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

function CurrentWeather({ data, locationName }: CurrentWeatherProps) {

  const {
    weather: [currentWeather],
    main: { temp, feels_like, humidity, temp_min, temp_max },
    wind: { speed },
  } = data;
  
  return (
    <div>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-baseline">
                  <h2 className="text-2xl font-bold tracking-tight">{locationName?.name}</h2>
                  {
                    locationName?.state && 
                    <span className="text-muted-foreground">, {locationName?.state}</span>
                  }
                </div>
                <p className="text-sm text-muted-foreground">
                  {locationName?.country}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-7xl font-bold tracking-tighter">
                  {Math.round(temp)}°
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Feels like {Math.round(feels_like)}°</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Humidity</p>
                    <p className="text-sm text-muted-foreground">{humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-blue-400" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Wind speed</p>
                    <p className="text-sm text-muted-foreground">{speed} m/s</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="relative flex apsect-square w-full max-w-[200px] items-center justify-center">
                <img src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`} alt={currentWeather.description}
                className="h-full w-full object-contain" />
                <div className="absolute bottom-0 text-center">
                  <p className="text-sm font-medium capitalize">
                    {currentWeather.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CurrentWeather