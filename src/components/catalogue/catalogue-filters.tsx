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
    <aside className="bg-white border border-gray-200 rounded-xl p-4 h-fit sticky top-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtres</h2>

      <div className="space-y-4">
        <label htmlFor="titleAndDescription">Recherche textuelle</label>
        <input
          type="text"
          id="titleAndDescription"
          placeholder="Rechercher..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <label htmlFor="categorySelect">Catégorie</label>
        <select
          value={filters.category}
          id="categorySelect"
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">Toutes les catégories</option>

          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>

        <label htmlFor="conditionSelect">Condition</label>
        <select
          value={filters.condition}
          id="conditionSelect"
          onChange={(e) => onFilterChange("condition", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">Tous les états</option>

          {CONDITIONS.map((cond) => (
            <option key={cond.value} value={cond.value}>
              {cond.label}
            </option>
          ))}
        </select>

        <label htmlFor="minimumPrice">Prix minimum</label>
        <input
          type="number"
          id="minimumPrice"
          placeholder="Prix min"
          value={filters.priceMin}
          onChange={(e) => onFilterChange("priceMin", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <label htmlFor="maximumPrice">Prix maximum</label>
        <input
          type="number"
          id="maximumPrice"
          placeholder="Prix max"
          value={filters.priceMax}
          onChange={(e) => onFilterChange("priceMax", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <label htmlFor="sortBy">Trier par</label>
        <select
          value={filters.sort}
          id="sortBy"
          onChange={(e) => onFilterChange("sort", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="date_desc">Plus récents</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="w-full text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 transition"
          >
            Réinitialiser
          </button>
        )}
      </div>
    </aside>
  );
}
