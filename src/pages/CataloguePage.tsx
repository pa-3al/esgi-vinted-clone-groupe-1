import { useState } from "react";
import type { FilterState } from "../components/catalogue/catalogue-filters";
import CatalogueFilters from "../components/catalogue/catalogue-filters";
import ArticleCard from "../components/catalogue/article-card";
import Spinner from "../components/ui/spinner.tsx";
import { useArticles } from "../hooks/useArticles.ts";
import { useFavorites } from "../hooks/useFavorites.ts";

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
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const { data: articles, isLoading, isError } = useArticles(filters);
  const { data: favorites, toggleFavorites } = useFavorites();
  const favoriteIds = new Set(favorites?.map((f) => f.id));

  const articlesWithFavorite = articles?.map((article) => ({
    ...article,
    isFavorite: favoriteIds.has(article.id),
  }));

  const handleFilterChange = (name: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const handleUpdateFavorite = (articleId: string) => {
    toggleFavorites.mutate(articleId);
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => key !== "sort" && value !== "",
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 pb-20 md:pb-0 relative">
      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileFiltersOpen(false)}
        />
      )}

      <div
        className={`
          fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-in-out
          md:static md:translate-y-0 md:w-64 md:z-auto
          ${isMobileFiltersOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="bg-white rounded-t-2xl p-4 md:p-0 md:bg-transparent md:rounded-none max-h-[85vh] overflow-y-auto md:max-h-none md:overflow-visible">
          <CatalogueFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClose={() => setIsMobileFiltersOpen(false)}
          />
        </div>
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

        {!isLoading &&
          !isError &&
          articlesWithFavorite &&
          articlesWithFavorite?.length === 0 && (
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

        {!isLoading &&
          !isError &&
          articlesWithFavorite &&
          articlesWithFavorite.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {articlesWithFavorite.map((article) => (
                <ArticleCard
                  key={article.id}
                  favorite={article.isFavorite}
                  article={article}
                  onClickFavorite={handleUpdateFavorite}
                />
              ))}
            </div>
          )}
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-30">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="bg-teal-700 text-white px-6 py-3 rounded-full shadow-lg font-medium flex items-center gap-2 hover:bg-teal-800 transition"
        >
          Filtres
        </button>
      </div>
    </div>
  );
}
