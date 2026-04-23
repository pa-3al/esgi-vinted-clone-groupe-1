import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ArticleCard from "./article-card";
import type { Article } from "../../types/article";

const mockArticle: Article = {
  id: "1",
  title: "T-shirt Nike",
  description: "Un super t-shirt",
  price: 25.5,
  category: "tops",
  size: "M",
  condition: "tres_bon_etat",
  imageUrl: "https://example.com/image.jpg",
  userName: "Alice",
  userId: "user-1",
  createdAt: "2026-02-22T10:00:00Z",
};

function renderArticleCard(overrides?: Partial<Article>) {
  const article = { ...mockArticle, ...overrides };
  const onClickFavorite = vi.fn();

  render(
    <MemoryRouter>
      <ArticleCard article={article} onClickFavorite={onClickFavorite} />
    </MemoryRouter>,
  );

  return { article, onClickFavorite };
}

describe("ArticleCard", () => {
  it("affiche le titre de l'article", () => {
    renderArticleCard();
    expect(screen.getByText("T-shirt Nike")).toBeInTheDocument();
  });

  it("affiche le prix formaté en euros", () => {
    renderArticleCard();
    expect(screen.getByText("25,50 €")).toBeInTheDocument();
  });

  it("affiche le nom du vendeur", () => {
    renderArticleCard();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("affiche la catégorie traduite", () => {
    renderArticleCard();
    expect(screen.getByText("Hauts")).toBeInTheDocument();
  });

  it("affiche la condition traduite", () => {
    renderArticleCard();
    expect(screen.getByText("Très bon état")).toBeInTheDocument();
  });

  it("affiche 'Pas de catégorie' quand la catégorie est inconnue", () => {
    renderArticleCard({ category: "unknown_category" });
    expect(screen.getByText("Pas de catégorie")).toBeInTheDocument();
  });
});
