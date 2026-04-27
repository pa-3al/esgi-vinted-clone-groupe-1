import { useNavigate } from "react-router-dom";
import { useCreateArticle } from "../hooks/useArticles";
import ArticleForm from "../components/publish/article-form";

type PublishTitleFormValues = {
  title: string;
  description: string;
  price: number;
  category: string;
  condition : string;
  size : string;
  imageUrl : string;
};

export default function PublishPage() {
  const navigate = useNavigate();
  const createArticle = useCreateArticle();
  
  const submitArticle = async (values: PublishTitleFormValues) => {
    try {
      const result = await createArticle.mutateAsync(values);

      localStorage.removeItem("vinted-clone-publish-draft");
      navigate(`/articles/${result.id}`);
    } catch (error) {
      console.error("Error creating article:", error);
    }
  }

    return (
      <section className="max-w-xl mx-auto bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Publier une annonce</h1>

        <ArticleForm submitArticle={submitArticle} article={null} />

        {createArticle.isError && (
          <p className="text-sm text-red-600" role="alert">
            {createArticle.error.message}
          </p>
        )}
      </section>
    );
}
  