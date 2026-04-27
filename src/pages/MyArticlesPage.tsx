import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../components/ui/spinner";
import { useCurrentUserId } from "../hooks/useCurrentUserId";
import { api } from "../services/api";
import { type Article, CATEGORIES, CONDITIONS } from "../types/article";
import { formatDate, formatPrice } from "../utils/formatters";

type DeleteArticleResponse = {
  message: string;
};

type MyArticleCardProps = {
  article: Article;
  onDelete: (article: Article) => void;
  isDeleting: boolean;
};

function MyArticleCard({ article, onDelete, isDeleting }: MyArticleCardProps) {
  const [imageError, setImageError] = useState(false);

  const articleCategory = CATEGORIES.find(
    (category) => category.id === article.category,
  );
  const articleCondition = CONDITIONS.find(
    (condition) => condition.value === article.condition,
  );

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-4 sm:flex-row">
      <Link
        to={`/articles/${article.id}`}
        className="block w-full sm:w-36 sm:h-36 shrink-0"
      >
        <div className="aspect-square sm:h-full rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
          {!imageError && article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/not-found-picture.png"
              alt="Image non trouvée"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </Link>

      <div className="flex-1 flex flex-col gap-3">
        <div className="space-y-1">
          <Link
            to={`/articles/${article.id}`}
            className="text-lg font-semibold text-gray-900 hover:text-teal-700"
          >
            {article.title}
          </Link>
          <p className="text-sm text-gray-600 line-clamp-2">
            {article.description}
          </p>
        </div>

        <div className="text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-6">
          <p>
            Prix:{" "}
            <span className="font-medium text-gray-900">
              {formatPrice(article.price)}
            </span>
          </p>
          <p>
            Taille:{" "}
            <span className="font-medium text-gray-900">{article.size}</span>
          </p>
          <p>
            Catégorie:{" "}
            <span className="font-medium text-gray-900">
              {articleCategory?.label ?? article.category}
            </span>
          </p>
          <p>
            État:{" "}
            <span className="font-medium text-gray-900">
              {articleCondition?.label ?? article.condition}
            </span>
          </p>
          <p>
            Publié le:{" "}
            <span className="font-medium text-gray-900">
              {formatDate(article.createdAt)}
            </span>
          </p>
        </div>

        <div className="mt-auto flex items-center gap-3">
          <Link
            to={`/articles/${article.id}`}
            className="inline-flex items-center text-sm font-medium text-teal-700 hover:underline"
          >
            Voir le détail
          </Link>
          <Link
            to={`/articles/${article.id}/edit`}
            className="inline-flex items-center text-sm font-medium text-teal-700 hover:underline"
          >
            Modifier
          </Link>
          <button
            type="button"
            onClick={() => onDelete(article)}
            disabled={isDeleting}
            className="inline-flex items-center text-sm font-medium text-red-700 hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function MyArticlesPage() {
  const currentUserId = useCurrentUserId();
  const queryClient = useQueryClient();

  const {
    data: myArticles,
    isLoading,
    isError,
    error,
  } = useQuery<Article[], Error>({
    queryKey: ["my-articles", currentUserId],
    queryFn: () => api.get<Article[]>(`/api/users/${currentUserId}/articles`),
  });

  const deleteArticleMutation = useMutation<
    DeleteArticleResponse,
    Error,
    string
  >({
    mutationFn: (articleId) =>
      api.delete<DeleteArticleResponse>(`/api/articles/${articleId}`),
    onSuccess: (_, articleId) => {
      queryClient.setQueryData<Article[]>(
        ["my-articles", currentUserId],
        (previousArticles = []) =>
          previousArticles.filter((article) => article.id !== articleId),
      );

      void queryClient.invalidateQueries({
        queryKey: ["my-articles", currentUserId],
      });
      void queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const handleDelete = (article: Article) => {
    const isConfirmed = window.confirm(
      `Voulez-vous vraiment supprimer l'annonce \"${article.title}\" ?`,
    );

    if (!isConfirmed) {
      return;
    }

    deleteArticleMutation.mutate(article.id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner text="Chargement de vos annonces en cours" />
      </div>
    );
  }

  if (isError) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Une erreur est survenue lors du chargement de vos annonces";

    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Mes annonces</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {message}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Mes annonces</h1>

      {deleteArticleMutation.isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {deleteArticleMutation.error.message || "La suppression a échoué"}
        </div>
      )}

      {myArticles && myArticles.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center space-y-3">
          <p className="text-sm text-gray-700">
            Vous n'avez encore publié aucune annonce.
          </p>
          <Link
            to="/publish"
            className="inline-flex text-sm font-medium text-teal-700 hover:underline"
          >
            Publier ma première annonce
          </Link>
        </div>
      )}

      {myArticles && myArticles.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {myArticles.map((article) => {
            const isDeletingCurrentArticle =
              deleteArticleMutation.isPending &&
              deleteArticleMutation.variables === article.id;

            return (
              <MyArticleCard
                key={article.id}
                article={article}
                onDelete={handleDelete}
                isDeleting={isDeletingCurrentArticle}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
