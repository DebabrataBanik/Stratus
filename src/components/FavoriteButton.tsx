import type { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/use-favorite";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavoriteButtonProps{
  data: WeatherData;
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {

  const { addToFavorites, isFavorite, removeFavorite } = useFavorite();
  const isCurrentFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const toggleFavorite = () => {
    if(isCurrentFavorite){
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from favorites.`)
    } else {
      addToFavorites.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country
      });
      toast.success(`Added ${data.name} to favorites.`)
    }
  }


  return (
    <Button 
      size='icon' 
      variant={isCurrentFavorite ? 'default' : 'outline'}
      className={`cursor-pointer ${isCurrentFavorite ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}  
      onClick={toggleFavorite}
    >
      <Star className={`h-4 w-4 ${isCurrentFavorite ? 'fill-current' : ''}`} />
    </Button>
  )
}

export default FavoriteButton