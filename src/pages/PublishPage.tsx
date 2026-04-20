import { useState } from "react";
import { useForm } from "react-hook-form";

type PublishTitleFormValues = {
  title: string;
  description: string;
};

export default function PublishPage() {
  const {register, handleSubmit, formState: { errors, isSubmitting },
    } = useForm<PublishTitleFormValues>({
      defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: PublishTitleFormValues) => {

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      console.log("Titre validé:", values.title);
      console.log("Description validée:", values.description);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erreur inattendue";
    }
  };

  return (
    <section className="max-w-xl mx-auto bg-white border border-gray-200 rounded-xl p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Publier une annonce</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>

          <input
            id="title"
            type="text"
            placeholder="Ex: Veste Nike vintage taille XXXXXXL"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            aria-invalid={errors.title ? "true" : "false"}
            {...register("title", {
              required: "Le titre est obligatoire",
              minLength: {
                value: 5,
                message: "Le titre doit contenir au moins 5 caractères",
              },
              maxLength: {
                value: 80,
                message: "Le titre doit contenir au maximum 80 caractères",
              },
            })}
          />

          {errors.title && (
            <p className="text-sm text-red-600" role="alert">
              {errors.title.message}
            </p>
          )}
      </div>

          <div className="space-y-1.5">
          
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            id="description"
            placeholder="Ex: L'article est une contre façon, et a été porté plusieurs fois."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            aria-invalid={errors.description ? "true" : "false"}
            {...register("description", {
              required: "La description est obligatoire",
              minLength: {
                value: 5,
                message: "La description doit contenir au moins 5 caractères",
              },
              maxLength: {
                value: 500,
                message: "La description doit contenir au maximum 500 caractères",
              },
            })}
          />

          {errors.description && (
            <p className="text-sm text-red-600" role="alert">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Validation..." : "Valider l'annonce"}
        </button>
      </form>
    </section>
  );
}
