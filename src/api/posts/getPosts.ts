import { client } from "..";
import { Post } from "./getPost";

type GetPostsParams = { limit: number; offset: number; search?: string };

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

export const getBlogs = (
  params: GetPostsParams
): Promise<GetPostsSuccessResponse> => {
  const { limit, offset, search } = params;

  return client
    .get("/v4/blogs/", { params: { limit, offset, search } })
    .then((res) => {
      return res.data;
    });
};
