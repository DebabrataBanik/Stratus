import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FavoriteItem {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

export function useFavorite() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>(
    "favorite",
    []
  );
  const queryClient = useQueryClient();

  const favoriteQuery = useQuery({
    queryKey: ["favorite"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity
  });

  const addToFavorites = useMutation({
    mutationFn: async (city: Omit<FavoriteItem, "id" | "addedAt">) => {
      const newFavorite: FavoriteItem = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };

      const exists = favorites.some(fav => fav.id === newFavorite.id);
      if(exists) return favorites

      const newFavorites = [...favorites, newFavorite].slice(0, 10);

      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorite']
      })
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorites = favorites.filter(city => city.id !== cityId)
      setFavorites(newFavorites)
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorite']
      })
    },
  });

  return {
    favorites: favoriteQuery.data,
    addToFavorites,
    removeFavorite,
    isFavorite: (lat: number, lon: number) => favorites.some(city => city.lat === lat && city.lon === lon)
  };
}