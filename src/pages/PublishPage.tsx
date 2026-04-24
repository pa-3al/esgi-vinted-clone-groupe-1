import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateArticle } from "../hooks/useArticles";
import { CATEGORIES, CONDITIONS } from '../types/article';

type PublishTitleFormValues = {
  title: string;
  description: string;
  prix: number;
  category: string;
  etat : string;
  taille : number;
  url : string;
};

export default function PublishPage() {
  const navigate = useNavigate();
  const createArticle = useCreateArticle();
  const draftValues = JSON.parse(localStorage.getItem("vinted-clone-publish-draft") ?? "{}");

  const {register, handleSubmit, watch, formState: { errors, isSubmitting },
    } = useForm<PublishTitleFormValues>({
      defaultValues: {
      title: draftValues.title ?? "",
      description: draftValues.description ?? "",
      prix: draftValues.prix,
      category: draftValues.category ?? "",
      etat: draftValues.etat ?? "",
      taille: draftValues.taille,
      url: draftValues.url ?? "",
    },
  });

  useEffect(() => {
    const draftSubscription = watch((formValues) => {
      localStorage.setItem("vinted-clone-publish-draft", JSON.stringify(formValues));
    });

    return () => draftSubscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (values: PublishTitleFormValues) => {

    try {
      await createArticle.mutateAsync({
        title: values.title.trim(),
        description: values.description.trim(),
        price: values.prix,
        category: values.category,
        condition: values.etat,
        size: String(values.taille),
        imageUrl: values.url.trim(),
      });

      localStorage.removeItem("vinted-clone-publish-draft");

      navigate("/my-articles");
    } catch {
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


          <div className="space-y-1.5">
          
            <label htmlFor="prix" className="block text-sm font-medium text-gray-700">
              Prix
            </label>

            <input
              id="prix"
              type="number"
              placeholder="Ex: 29999999999.99"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              aria-invalid={errors.prix ? "true" : "false"}
              {...register("prix", {
                required: "Le prix est obligatoire",
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Le prix doit être un nombre positif",
                },
              })}
            />

            {errors.prix && (
              <p className="text-sm text-red-600" role="alert">
                {errors.prix.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
          
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Catégorie
            </label>

            <select
              id="category"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              {...register("category", { 
                required: "La catégorie est obligatoire" 
              })}
            >
              <option value="">Catégorie</option>
              {CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="text-sm text-red-600" role="alert">
                {errors.category.message}
              </p>
            )}
          </div>


          <div className="space-y-1.5">
          
            <label htmlFor="etat" className="block text-sm font-medium text-gray-700">
              État
            </label>

            <select
              id="etat"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              {...register("etat", { 
                required: "L'état est obligatoire" 
              })}
            >
              <option value="">état</option>
              {CONDITIONS.map((condition) => (
                <option key={condition.value} value={condition.value}>
                  {condition.label}
                </option>
              ))}
            </select>

            {errors.etat && (
              <p className="text-sm text-red-600" role="alert">
                {errors.etat.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
          
            <label htmlFor="taille" className="block text-sm font-medium text-gray-700">
              Taille
            </label>

            <input
              id="taille"
              type="number"
              placeholder="Ex: 29999999999.99"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              aria-invalid={errors.taille ? "true" : "false"}
              {...register("taille", {
                required: "La taille est obligatoire",
                min: {
                  value: 0,
                  message: "La taille doit être un nombre positif",
                },
              })}
            />

            {errors.taille && (
              <p className="text-sm text-red-600" role="alert">
                {errors.taille.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
          
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              URL de l'image
            </label>

            <input
              id="url"
              type="text"
              placeholder="Ex: https://example.com/image.jpg"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              aria-invalid={errors.url ? "true" : "false"}
              {...register("url", {
                required: "L'url de l'image est obligatoire",
              })}
            />

            {errors.url && (
              <p className="text-sm text-red-600" role="alert">
                {errors.url.message}
              </p>
            )}
          </div>

        {createArticle.isError && (
          <p className="text-sm text-red-600" role="alert">
            {createArticle.error.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || createArticle.isPending}
          className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting || createArticle.isPending
            ? "Publication..."
            : "Valider l'annonce"}
        </button>
      </form>
    </section>
  );
}
