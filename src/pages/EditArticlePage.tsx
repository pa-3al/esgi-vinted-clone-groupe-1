import { useNavigate, useParams } from "react-router-dom";
import { useArticleDetail, useUpdateArticle } from "../hooks/useArticles";
import { useCurrentUserId } from "../hooks/useCurrentUserId";
import ArticleForm from "../components/publish/article-form";

type PublishTitleFormValues = {
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  size: string;
  imageUrl: string;
};

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentUserId = useCurrentUserId();

  if (!id) {
    return null;
  }

  const data = useArticleDetail(id).data;
  const updateArticle = useUpdateArticle(id);

  const onSubmit = async (values: PublishTitleFormValues) => {
    try {
      await updateArticle.mutateAsync(values);
      
      localStorage.removeItem("vinted-clone-publish-draft");

      navigate(`/articles/${id}`);
    } catch {
    }
  };

  if (data?.userId !== currentUserId) {
    return (
      <section className="max-w-xl mx-auto bg-white border border-red-200 rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Modifier l'annonce</h1>
        <p className="text-sm text-red-700">
          Vous n'etes pas autorise a modifier cette annonce.
        </p>
      </section>
    );
  }
  
  return (
    <section className="max-w-xl mx-auto bg-white border border-gray-200 rounded-xl p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Modifier l'annonce</h1>
      
      <ArticleForm submitArticle={onSubmit} article={data} />
      {updateArticle.isError && (
        <p className="text-sm text-red-600" role="alert">
          {updateArticle.error.message}
        </p>
      )}
    </section>
  );
}
