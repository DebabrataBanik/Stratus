import type { Coordinates } from "@/api/types"
import { useState, useEffect } from "react"

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

const useGeolocation = () => {

  const [ locationData , setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true
  })

  const getLocation = () => {

    setLocationData(prev => ({
      ...prev, error: null, isLoading: true
    }))

    if(!navigator.geolocation){
      setLocationData(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser.',
        isLoading: false,
      }))
      return
    }

    navigator.geolocation.getCurrentPosition(pos => {
      setLocationData(prev => ({
        ...prev,
        coordinates: {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        },
        error: null,
        isLoading: false
      }))
    }, 
    (err) => {
      let errMsg: string;

      switch (err.code) {
        case err.PERMISSION_DENIED:
          errMsg = "Location permission denied. Please enable location access.";
          break;
        case err.POSITION_UNAVAILABLE:
          errMsg = "Location information is unavailable.";
          break;
        case err.TIMEOUT:
          errMsg = "Location request timed out.";
          break;
        default:
          errMsg = "An unknown error occurred.";
      }

      setLocationData(prev => ({
        ...prev,
        error: errMsg,
        isLoading: false
      }))
    }, {
      enableHighAccuracy: true,
      maximumAge: 0
    }
  )
  }

  useEffect(() => {
    getLocation()
  }, [])

  return {
    ...locationData,
    getLocation
  }
}

export default useGeolocation;