import { client } from "..";
import { Post } from "./getArticle";

export type GetPostsParams = { limit: number; offset: number; search?: string };

export type GetPostsSuccessResponse = {
  count: number;
  results: Post[];
};

export const getArticles = (
  params: GetPostsParams
): Promise<GetPostsSuccessResponse> => {
  const { limit, offset, search } = params;

  return client
    .get("/v4/articles/", { params: { limit, offset, search } })
    .then((res) => {
      return res.data;
    });
};
