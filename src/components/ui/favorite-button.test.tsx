import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FavoriteButton from "./favorite-button";

describe("FavoriteButton", () => {
  it("Ajouter aux favoris", () => {
    render(<FavoriteButton isFavorite={false} onClickChange={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "Ajouter aux favoris" }),
    ).toBeInTheDocument();
  });

  it("Supprimer des favoris", () => {
    render(<FavoriteButton isFavorite={true} onClickChange={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "Supprimer des favoris" }),
    ).toBeInTheDocument();
  });

  it("appelle onClickChange au clic", async () => {
    const user = userEvent.setup();
    const onClickChange = vi.fn();

    render(<FavoriteButton isFavorite={false} onClickChange={onClickChange} />);

    await user.click(
      screen.getByRole("button", { name: "Ajouter aux favoris" }),
    );

    expect(onClickChange).toHaveBeenCalledTimes(1);
  });
});
