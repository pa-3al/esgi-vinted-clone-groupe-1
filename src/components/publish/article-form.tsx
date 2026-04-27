import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CATEGORIES, CONDITIONS, type Article } from "../../types/article";

type PublishTitleFormValues = {
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  size: string;
  imageUrl: string;
};

type ArticleFormProps = {
  submitArticle: (articleData: PublishTitleFormValues) => Promise<void>;
  article : Article | null;
};

export default function ArticleForm({ submitArticle, article }: ArticleFormProps) {

const draftValues = JSON.parse(localStorage.getItem("vinted-clone-publish-draft") ?? "{}");
  
const { register, handleSubmit, watch, formState: { errors, isSubmitting },
  } = useForm<PublishTitleFormValues>({
    defaultValues: {
      title: article ?  article.title : draftValues.title ?? "",
      description: article ? article.description : draftValues.description ?? "",
      price: article ? article.price : draftValues.price,
      category: article ? article.category : draftValues.category ?? "",
      condition: article ? article.condition : draftValues.condition ?? "",
      size: article ? article.size : draftValues.size ?? "",
      imageUrl: article ? article.imageUrl : draftValues.imageUrl ?? "",
    },
  });

  useEffect(() => {
    const draftSubscription = watch((formValues) => {
      localStorage.setItem("vinted-clone-publish-draft", JSON.stringify(formValues));
    });

    return () => draftSubscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (values: PublishTitleFormValues) => {
    await submitArticle(values);

    localStorage.removeItem("vinted-clone-publish-draft");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titre
        </label>

        <input
          id="title"
          type="text"
          placeholder="Ex: Veste Nike vintage size XXXXXXL"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
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
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Prix
        </label>

        <input
          id="price"
          type="number"
          placeholder="Ex: 29999999999999999999.99999"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          {...register("price", {
            required: "Le prix est obligatoire",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Le prix doit être un nombre positif",
            },
          })}
        />

        {errors.price && (
          <p className="text-sm text-red-600" role="alert">
            {errors.price.message}
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
            required: "La catégorie est obligatoire",
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
        <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
          État
        </label>

        <select
          id="condition"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          {...register("condition", {
            required: "L'état est obligatoire",
          })}
        >
          <option value="">état</option>
          {CONDITIONS.map((condition) => (
            <option key={condition.value} value={condition.value}>
              {condition.label}
            </option>
          ))}
        </select>

        {errors.condition && (
          <p className="text-sm text-red-600" role="alert">
            {errors.condition.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="size" className="block text-sm font-medium text-gray-700">
          Taille
        </label>

        <input
          id="size"
          type="number"
          placeholder="Ex: 29999999999.99"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          {...register("size", {
            required: "La size est obligatoire",
            min: {
              value: 0,
              message: "La size doit être un nombre positif",
            },
          })}
        />

        {errors.size && (
          <p className="text-sm text-red-600" role="alert">
            {errors.size.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          URL de l'image
        </label>

        <input
          id="imageUrl"
          type="text"
          placeholder="Ex: https://example.com/image.jpg"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          {...register("imageUrl", {
            required: "L'imageUrl de l'image est obligatoire",
          })}
        />

        {errors.imageUrl && (
          <p className="text-sm text-red-600" role="alert">
            {errors.imageUrl.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Publication..." : "Valider l'annonce"}
      </button>
    </form>
  );
}
