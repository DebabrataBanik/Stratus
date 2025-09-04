import type { Coordinates } from "@/api/types";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-query";
import { useParams, useSearchParams } from "react-router-dom"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import CurrentWeather from "@/components/CurrentWeather";
import FavoriteButton from "@/components/FavoriteButton";

function CityWeatherPage() {

  const [searchParams] = useSearchParams();
  const params = useParams()
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lon = parseFloat(searchParams.get('lon') || '0')

  const coords = { lat, lon }

  const weather = useWeatherQuery(coords)
  const forecast = useForecastQuery(coords)

  if(weather.error || forecast.error ){
    return (
      <Alert variant='destructive' >
        <AlertTriangle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please refresh again.</p>
        </AlertDescription>
      </Alert>
    )
  }

  if(!weather.data || !forecast.data || !params.city){
    return <LoadingSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{params.city}, <span className="text-muted-foreground text-xl">{weather.data.sys.country}</span></h1>
        <div>
          <FavoriteButton data={{...weather.data, name: params.city}} />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weather.data} />
          
        </div>
        
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default CityWeatherPage