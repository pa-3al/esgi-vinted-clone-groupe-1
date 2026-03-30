import type { Article } from "../../types/article";
import { Link } from "react-router-dom";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard(props: ArticleCardProps) {
  return (
    <>
      <Link to={"/" + props.article.id}>
      <div className="border">
        <h2>{props.article.title}</h2>
        <p>{props.article.price}</p>
        <p>{props.article.category}</p>
        <p>{props.article.userName}</p>
        <p>{props.article.condition}</p>
      </div>
      </Link>
    </>
  );
}
