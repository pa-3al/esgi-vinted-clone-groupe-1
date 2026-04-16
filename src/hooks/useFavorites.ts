import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Article } from "../types/article.ts";
import { api } from "../services/api.ts";


export function useFavorites() {

  const queryClient = useQueryClient();

  const favoritesQuery = useQuery<Article[]>({
    queryKey: ["favorites"],
    queryFn : async () => { return api.get<Article[]>("/api/favorites")}
  })

  const toggleFavorites = useMutation({
    mutationFn: async (articleId: string) => {
      const favorites = favoritesQuery.data;
      let isFavorite: Article | null = null;
      if (favorites) {
        isFavorite = favorites.find((favorite) => favorite.id === articleId) ?? null;
      }

      if (isFavorite) {
        return api.delete(`/api/favorites/${articleId}`);
      } else {
        return api.post(`/api/favorites/${articleId}`, {});
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({queryKey : ["favorites"]});
    }
  })

  return {
    ...favoritesQuery,
    toggleFavorites,
  }

}