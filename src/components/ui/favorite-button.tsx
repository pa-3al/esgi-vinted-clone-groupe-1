type FavoriteButtonProps = {
  isFavorite: boolean;
  onClickChange: () => void;
};

export default function FavoriteButton({
  isFavorite = false,
  onClickChange,
}: FavoriteButtonProps) {

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClickChange();
      }}
    >
      {isFavorite ? "Supprimer des favoris" : "Ajouter aux favoris"}
    </button>
  );
}
