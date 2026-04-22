import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CatalogueFilters, { type FilterState } from "./catalogue-filters";

const defaultFilters: FilterState = {
  search: "",
  category: "",
  condition: "",
  priceMin: "",
  priceMax: "",
  sort: "date_desc",
};

function renderFilters(
  overrides?: Partial<FilterState>,
  onFilterChange = vi.fn(),
) {
  const filters = { ...defaultFilters, ...overrides };

  render(
    <CatalogueFilters filters={filters} onFilterChange={onFilterChange} />,
  );

  return { onFilterChange };
}

describe("CatalogueFilters", () => {
  it("utilisateur tape dans la recherche", async () => {
    const user = userEvent.setup();
    const { onFilterChange } = renderFilters();

    const searchInput = screen.getByPlaceholderText("Rechercher...");
    await user.type(searchInput, "a");

    expect(onFilterChange).toHaveBeenCalledWith("search", "a");
  });

  it("utilisateur sélectionne une catégorie", async () => {
    const user = userEvent.setup();
    const { onFilterChange } = renderFilters();

    const categorySelect = screen.getByLabelText("Catégorie");
    await user.selectOptions(categorySelect, "tops");

    expect(onFilterChange).toHaveBeenCalledWith("category", "tops");
  });

  it("affiche le bouton Réinitialiser", () => {
    renderFilters();
    expect(screen.queryByText("Réinitialiser")).not.toBeInTheDocument();
  });

  it("affiche le bouton Réinitialiser quand filtre est modifié", () => {
    renderFilters({ search: "nike" });
    expect(screen.getByText("Réinitialiser")).toBeInTheDocument();
  });
});
