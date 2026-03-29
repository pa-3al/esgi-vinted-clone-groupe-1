import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "../types/article";
import { api } from "../services/api";
import type { FilterState } from "../components/catalogue/catalogue-filters";
import CatalogueFilters from "../components/catalogue/catalogue-filters";
import ArticleCard from "../components/catalogue/article-card";

export default function CataloguePage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    condition: "",
    priceMin: "",
    priceMax: "",
    sort: "date_desc",
  });

  const { data: articles, isLoading } = useQuery<Article[]>({
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

  return (
    <div>
      <CatalogueFilters filters={filters} onFilterChange={handleFilterChange} />

      <main style={{ flex: 1 }}>
        <h1>Catalogue</h1>
        {isLoading ? (
          <p>Chargement des pépites...</p>
        ) : (
          <div>
            {articles?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
