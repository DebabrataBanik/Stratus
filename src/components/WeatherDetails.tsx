import type { WeatherData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { format } from "date-fns";

interface WeatherDetailsProp{
  data: WeatherData;
}

const WeatherDetails = ({data}: WeatherDetailsProp) => {

  const {wind, sys, main} = data;

  const windDirection = (deg: number) => {
    const directions = ['N','NE','E','SE','S','SW','W','NW'];
    const idx = Math.round(((deg%=360) < 0 ? deg + 360: deg)/45)%8;

    return directions[idx]
  };

  const details = [
    {
      title: 'Sunrise',
      value: format(sys.sunrise*1000, 'h:mm a'),
      icon: Sunrise,
      color: 'blue'
    },
    {
      title: 'Sunset',
      value: format(sys.sunset*1000, 'h:mm a'),
      icon: Sunset,
      color: 'orange'
    },
    {
      title: 'Wind Direction',
      value: `${windDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: 'green'
    },
    {
      title: 'Pressure',
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: 'red'
    }
  ]

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Weather Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-6">
            {
              details.map(detail => (
                <div key={detail.title}
                  className="flex items-center gap-5 border p-4 rounded-lg"
                >
                  <detail.icon color={detail.color} size={20} />
                  <div>
                    <p>{detail.title}</p>
                    <p>{detail.value}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default WeatherDetails