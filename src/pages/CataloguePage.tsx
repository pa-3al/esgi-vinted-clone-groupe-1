import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "../types/article";
import { api } from "../services/api";
import type { FilterState } from "../components/catalogue/catalogue-filters";
import CatalogueFilters from "../components/catalogue/catalogue-filters";
import ArticleCard from "../components/catalogue/article-card";
import Spinner from "../components/ui/spinner.tsx";

const defaultFilters: FilterState = {
  search: "",
  category: "",
  condition: "",
  priceMin: "",
  priceMax: "",
  sort: "date_desc",
};

export default function CataloguePage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery<Article[]>({
    queryKey: ["articles", filters],
    queryFn: () => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      return api.get<Article[]>(`/api/articles?${params.toString()}`);
    },
  });

  const handleFilterChange = (name: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const tempOnChangeFavorite = (articleId: string) => {
    console.log(articleId);
  }

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => key !== "sort" && value !== "",
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-64">
        <CatalogueFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <main className="flex-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Catalogue</h1>

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
            {hasActiveFilters ? (
              <>
                <p className="mb-3">
                  Aucun article ne correspond à votre recherche
                </p>

                <button
                  onClick={resetFilters}
                  className="text-teal-700 font-medium hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </>
            ) : (
              <p>Aucun article n'est disponible pour le moment</p>
            )}
          </div>
        )}

        {!isLoading && !isError && articles && articles.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClickFavorite={tempOnChangeFavorite}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
