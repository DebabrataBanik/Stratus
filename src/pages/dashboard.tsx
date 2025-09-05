import CurrentWeather from "@/components/CurrentWeather";
import FavoriteCities from "@/components/FavoriteCities";
import HourlyTemp from "@/components/HourlyTemp";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { useGeolocation } from "@/hooks/use-geolocation"
import { useReverseGeocodeQuery, useWeatherQuery, useForecastQuery } from "@/hooks/use-query";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"

function Dashboard() {

  const { coordinates, error: locationError , isLoading: locationLoading, getLocation } = useGeolocation();

  const weather = useWeatherQuery(coordinates);
  const forecast = useForecastQuery(coordinates);
  const location = useReverseGeocodeQuery(coordinates)

  const handleRefresh = () => {
    if(coordinates){
      weather.refetch()
      forecast.refetch()
      location.refetch()
    }
  }

  if(locationLoading){
    return <LoadingSkeleton />
  }

  if(locationError){
    return (
      <Alert variant='destructive' >
        <AlertTriangle className="w-4 h-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant='outline' className="w-fit cursor-pointer" >
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!coordinates) {
    return (
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather.</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = location.data?.[0]

  if(weather.error || forecast.error ){
    return (
      <Alert variant='destructive' >
        <AlertTriangle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please refresh again.</p>
          <Button onClick={handleRefresh} variant='outline' className="w-fit cursor-pointer" >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if(!weather.data || !forecast.data ){
    return <LoadingSkeleton />
  }

  return (
    <div className="space-y-4">
      <FavoriteCities />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button 
          variant={'outline'}
          size={'icon'}
          className="cursor-pointer"
          onClick={handleRefresh}
          disabled={weather.isFetching || forecast.isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${weather.isFetching ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <CurrentWeather data={weather.data} locationName={locationName} />
          <HourlyTemp data={forecast.data} />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weather.data} />
          <WeatherForecast data={forecast.data} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard