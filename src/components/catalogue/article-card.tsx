import { type Article, CATEGORIES, CONDITIONS } from "../../types/article";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatPrice } from "../../utils/formatters";
import FavoriteButton from "../ui/favorite-button.tsx";

type ArticleCardProps = {
  article: Article;
  favoriteView?: boolean;
  favorite?: boolean;
  onClickFavorite: (articleId: string) => void;
};

export default function ArticleCard({ article, favoriteView = false, favorite = false, onClickFavorite }: ArticleCardProps) {
  const articleCategory = CATEGORIES.find(
    (category) => category.id === article.category,
  );
  const articleCondition = CONDITIONS.find(
    (condition) => condition.value === article.condition,
  );

  const [imageError, setImageError] = useState(false);

  const commonContent = (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition h-full flex flex-col">
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {!imageError && article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition"
          />
        ) : (
          <img
            src="/not-found-picture.png"
            alt="Image non trouvée"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition"
          />
        )}
      </div>

      <div className="p-3 space-y-1 flex-1">
        <h2 className="text-sm font-medium text-gray-800 line-clamp-2">
          {article.title}
        </h2>

        <p className="text-base font-semibold text-teal-700">
          {formatPrice(article.price)}
        </p>

        <div className="text-xs text-gray-500 space-y-0.5">
          {articleCategory ? (
            <p>{articleCategory.label}</p>
          ) : (
            <p>Pas de catégorie</p>
          )}
          {articleCondition ? (
            <p>{articleCondition.label}</p>
          ) : (
            <p>Pas de condition définie</p>
          )}
          <p className="text-gray-400">{article.userName}</p>
        </div>

        <FavoriteButton isFavorite={favorite} onClickChange={() => onClickFavorite(article.id)} />
      </div>
    </div>
  );

  if (favoriteView) {
    return <div className="block group">{commonContent}</div>;
  } else {
    return (
      <Link to={`/articles/${article.id}`} className="block group">
        {commonContent}
      </Link>
    );
  }


}
