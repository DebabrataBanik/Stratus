import type { ForecastData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import { ArrowDown, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps{
  data: ForecastData;
}

interface DailyForecast{
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  date: number;
}

const WeatherForecast = ({data}: WeatherForecastProps) => {

  const dailyForecast = data.list.reduce((acc, cur) => {
    const date = format(new Date(cur.dt*1000), 'yyyy-MM-dd');

    if(!acc[date]){
      acc[date] = {
        temp_min: cur.main.temp_min,
        temp_max: cur.main.temp_max,
        humidity: cur.main.humidity,
        wind: cur.wind.speed,
        weather: cur.weather[0],
        date: cur.dt
      }
    }else{
      acc[date].temp_min = Math.min(acc[date].temp_min, cur.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, cur.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>)

  const forecast = Object.values(dailyForecast).slice(0,6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>5 day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {
            forecast.map(day => (
              <div key={day.date}
                className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{format(new Date(day.date*1000), 'EEE, MMM d')}</p>
                  <p className="text-sm text-muted-foreground capitalize">{day.weather.description}</p>
                </div>

                <div className="flex justify-center gap-4">
                  <span className="flex items-center text-blue-500">
                    <ArrowDown className="mr-1 w-4 h-4" />
                    {Math.round(day.temp_min)}°
                  </span>
                  <span className="flex items-center text-red-500">
                    <ArrowDown className="mr-1 w-4 h-4" />
                    {Math.round(day.temp_max)}°
                  </span>
                </div>

                <div className="flex justify-end gap-4">
                  <span className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.humidity}%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-4 2-4 text-blue-500" />
                    <span className="text-sm">{day.wind}m/s</span>
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherForecast