import type { Article } from "../../types/article";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard(props: ArticleCardProps) {
  return (
    <>
      <div className="border">
        <h2>{props.article.title}</h2>
        <p>{props.article.price}</p>
        <p>{props.article.category}</p>
        <p>{props.article.userName}</p>
        <p>{props.article.condition}</p>
      </div>
    </>
  );
}
