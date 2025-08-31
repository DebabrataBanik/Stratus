import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import useGeolocation from "@/hooks/use-geolocation"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"

function Dashboard() {

  const { coordinates, error: locationError , isLoading: locationLoading, getLocation } = useGeolocation();

  console.log('Coordinates', coordinates)

  const handleRefresh = () => {
    getLocation()
    if(coordinates){
      // 
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

  return (
    <div className="space-x-4">
      {/* Favorite Cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button 
          variant={'outline'}
          size={'icon'}
          className="cursor-pointer"
          onClick={handleRefresh}
          // disabled={}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Current and hourly forecast */}
    </div>
  )
}

export default Dashboard