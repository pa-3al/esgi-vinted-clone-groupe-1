import { CATEGORIES, CONDITIONS } from "../../types/article";
import type { SortValue } from "../../types/article";

export type FilterState = {
  search: string;
  category: string;
  condition: string;
  priceMin: string;
  priceMax: string;
  sort: SortValue;
};

type CatalogueFiltersProps = {
  filters: FilterState;
  onFilterChange: (name: keyof FilterState, value: string) => void;
};

const defaultFilters: FilterState = {
  search: "",
  category: "",
  condition: "",
  priceMin: "",
  priceMax: "",
  sort: "date_desc",
};

export default function CatalogueFilters({
  filters,
  onFilterChange,
}: CatalogueFiltersProps) {
  const hasActiveFilters =
    filters.search !== defaultFilters.search ||
    filters.category !== defaultFilters.category ||
    filters.condition !== defaultFilters.condition ||
    filters.priceMin !== defaultFilters.priceMin ||
    filters.priceMax !== defaultFilters.priceMax ||
    filters.sort !== defaultFilters.sort;

  const resetFilters = () => {
    Object.entries(defaultFilters).forEach(([key, value]) => {
      onFilterChange(key as keyof FilterState, value);
    });
  };

  return (
    <aside>
      <h2>Filtres</h2>

      <input
        type="text"
        placeholder="Rechercher..."
        value={filters.search}
        onChange={(e) => onFilterChange("search", e.target.value)}
      />

      <select
        value={filters.category}
        onChange={(e) => onFilterChange("category", e.target.value)}
      >
        <option value="">Toutes les catégories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.label}
          </option>
        ))}
      </select>

      <select
        value={filters.condition}
        onChange={(e) => onFilterChange("condition", e.target.value)}
      >
        <option value="">Tous les états</option>
        {CONDITIONS.map((cond) => (
          <option key={cond.value} value={cond.value}>
            {cond.label}
          </option>
        ))}
      </select>

      <div>
        <input
          type="number"
          placeholder="Prix min"
          value={filters.priceMin}
          onChange={(e) => onFilterChange("priceMin", e.target.value)}
        />
        <input
          type="number"
          placeholder="Prix max"
          value={filters.priceMax}
          onChange={(e) => onFilterChange("priceMax", e.target.value)}
        />
      </div>

      <select
        value={filters.sort}
        onChange={(e) => onFilterChange("sort", e.target.value)}
      >
        <option value="date_desc">Plus récents</option>
        <option value="price_asc">Prix croissant</option>
        <option value="price_desc">Prix décroissant</option>
      </select>

      {hasActiveFilters && (
        <button onClick={resetFilters}>Réinitialiser les filtres</button>
      )}
    </aside>
  );
}
