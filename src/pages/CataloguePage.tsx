import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "../types/article";
import { api } from "../services/api";
import type { FilterState } from "../components/catalogue/catalogue-filters";
import CatalogueFilters from "../components/catalogue/catalogue-filters";
import ArticleCard from "../components/catalogue/article-card";

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

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => key !== "sort" && value !== "",
  );

  return (
    <div>
      <CatalogueFilters filters={filters} onFilterChange={handleFilterChange} />

      <main style={{ flex: 1 }}>
        <h1>Catalogue</h1>

        {isLoading && <p>Chargement des articles...</p>}

        {isError && <p>Une erreur est survenue, merci de réessayer ultérieurement</p>}

        {!isLoading && !isError && articles?.length === 0 && (
          <div>
            {hasActiveFilters ? (
              <>
                <p>Aucun article ne correspond à votre recherche</p>

                <button onClick={resetFilters}>
                  Réinitialiser les filtres
                </button>
              </>
            ) : (
              <p>Aucun article n'est disponible sur Vinted actuellement</p>
            )}
          </div>
        )}

        {!isLoading && !isError && articles && articles.length > 0 && (
          <div>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
