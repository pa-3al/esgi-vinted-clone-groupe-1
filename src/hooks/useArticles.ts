import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Article, ArticleFormData } from "../types/article.ts";
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

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation<Article, Error, ArticleFormData>({
    mutationFn: (articleData) =>
      api.post<Article>("/api/articles", {
        title: articleData.title,
        description: articleData.description,
        price: articleData.price,
        category: articleData.category,
        condition: articleData.condition,
        size: articleData.size,
        imageUrl: articleData.imageUrl,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["articles"] });
      void queryClient.invalidateQueries({ queryKey: ["my-articles"] });
    },
  });
}

export function useUpdateArticle(articleId: string) {
  const queryClient = useQueryClient();

  return useMutation<Article, Error, ArticleFormData>({
    mutationFn: (articleData) =>
      api.put<Article>(`/api/articles/${articleId}`, {
        title: articleData.title,
        description: articleData.description,
        price: articleData.price,
        category: articleData.category,
        condition: articleData.condition,
        size: articleData.size,
        imageUrl: articleData.imageUrl,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["article", articleId] });
      void queryClient.invalidateQueries({ queryKey: ["articles"] });
      void queryClient.invalidateQueries({ queryKey: ["my-articles"] });
    },
  });
}