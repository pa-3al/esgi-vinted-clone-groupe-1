import { useState, useEffect } from "react";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClickChange: () => void;
};

export default function FavoriteButton({
  isFavorite = false,
  onClickChange,
}: FavoriteButtonProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isFavorite) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 200);
      return () => clearTimeout(t);
    }
  }, [isFavorite]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClickChange();
        setAnimate(true);
        setTimeout(() => setAnimate(false), 200);
      }}
      aria-label={isFavorite ? "Supprimer des favoris" : "Ajouter aux favoris"}
      className="flex items-center gap-2 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        className={`
          w-6 h-6
          transition-all duration-200
          ${animate ? "scale-125" : "scale-100"}
          group-hover:scale-110
          ${
            isFavorite
              ? "fill-pink-500 stroke-pink-500"
              : "fill-none stroke-gray-400"
          }
        `}
      >
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      </svg>
    </button>
  );
}