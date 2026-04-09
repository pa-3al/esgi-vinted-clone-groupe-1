import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/ui/spinner";
import { api } from "../services/api";
import { CATEGORIES, CONDITIONS, type Article } from "../types/article";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useQuery<Article>({
    queryKey: ["article", id],
    queryFn: () => api.get<Article>(`/api/articles/${id}`),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner text="Chargement de l'article en cours" />
      </div>
    );
  }

  if (isError) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Une erreur est survenue lors du chargement de l'article";
    return (
      <section className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Article indisponible
        </h1>
        <p className="text-sm text-red-700">{message}</p>
        <Link
          to="/"
          className="inline-flex text-sm font-medium text-teal-700 hover:underline"
        >
          Retour au catalogue
        </Link>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Article introuvable
        </h1>
        <p className="text-sm text-gray-700">
          Cet article n'existe pas ou n'est plus disponible.
        </p>
        <Link
          to="/"
          className="inline-flex text-sm font-medium text-teal-700 hover:underline"
        >
          Retour au catalogue
        </Link>
      </section>
    );
  }

  const [imageError, setImageError] = useState(false);
  const articleCategory = CATEGORIES.find(
    (category) => category.id === article.category,
  );
  const articleCondition = CONDITIONS.find(
    (condition) => condition.value === article.condition,
  );

  return (
    <section className="space-y-5">
      <Link
        to="/"
        className="inline-flex text-sm font-medium text-teal-700 hover:underline"
      >
        Retour au catalogue
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white border border-gray-200 rounded-2xl p-6">
        <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
          {!imageError && article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              onError={() => setImageError(true)}
              className="w-full h-full max-h-[620px] object-cover"
            />
          ) : (
            <img
              src="/not-found-picture.png"
              alt="Image non trouvée"
              onError={() => setImageError(true)}
              className="w-full h-full max-h-[620px] object-cover"
            />
          )}
        </div>

        <article className="space-y-5">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {article.title}
            </h1>
            <p className="text-2xl font-semibold text-teal-700">
              {priceFormatter.format(article.price)}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {article.description}
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <dt className="text-gray-500">Catégorie</dt>
              <dd className="font-medium text-gray-900">
                {articleCategory?.label ?? article.category}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">État</dt>
              <dd className="font-medium text-gray-900">
                {articleCondition?.label ?? article.condition}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">Taille</dt>
              <dd className="font-medium text-gray-900">{article.size}</dd>
            </div>

            <div>
              <dt className="text-gray-500">Vendeur</dt>
              <dd className="font-medium text-gray-900">{article.userName}</dd>
            </div>

            <div>
              <dt className="text-gray-500">Date de publication</dt>
              <dd className="font-medium text-gray-900">
                {dateFormatter.format(new Date(article.createdAt))}
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
