import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Article } from "../types/article.ts";
import { api } from "../services/api.ts";
import Spinner from "../components/ui/spinner.tsx";
import ArticleCard from "../components/catalogue/article-card.tsx";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery<Article[]>({
    queryKey: ["articles-favorites"],
    queryFn: () => {
      return api.get<Article[]>("/api/favorites")
    }
  });

  const updateFavoriteArticle = useMutation({
    mutationFn: async(articleId: string) => {

      if(!articles) {
        return;
      }

      const articleToUpdate: Article | undefined = articles.find((article) => article.id === articleId);
      if (!articleToUpdate) {
        return;
      }
      return api.delete('/api/favorites/' + articleId);
    },
    onSuccess(){
      queryClient.invalidateQueries({queryKey: ["articles-favorites"]});
    }
  })

  function handleFavoritesChange (articleId: string) {
    updateFavoriteArticle.mutate(articleId)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">

      <main className="flex-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Mes favoris</h1>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Spinner text="Chargement des articles en cours" />
          </div>
        )}

        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
            Une erreur est survenue, merci de réessayer ultérieurement
          </div>
        )}

        {!isLoading && !isError && articles?.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-sm text-gray-600">
              <p>Vous ne possédez aucun favoris</p>
              <button onClick={() => navigate("/")}>Accéder aux articles</button>
          </div>
        )}

        {!isLoading && !isError && articles && articles.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} favorite={true} onClickFavorite={handleFavoritesChange} favoriteView={true} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
