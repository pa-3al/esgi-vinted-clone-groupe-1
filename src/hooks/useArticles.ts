import { useQuery } from "@tanstack/react-query";
import type { Article } from "../types/article.ts";
import { api } from "../services/api.ts";


export function useArticles(filters? : Record<string, string>) {

    return useQuery<Article[]>({
      queryKey: ["articles", filters],
      queryFn: () => {
        const params = new URLSearchParams();

        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value);
          });
        }

        return api.get<Article[]>(`/api/articles?${params.toString()}`);
      },
    });
}

export function useArticleDetail(articleId: string) {

  return useQuery<Article>({
    queryKey: ["article", articleId],
    queryFn: () => api.get<Article>(`/api/articles/${articleId}`),
    enabled: Boolean(articleId),
  });

}