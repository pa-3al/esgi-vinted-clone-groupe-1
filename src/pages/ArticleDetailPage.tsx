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

  return null;
}
