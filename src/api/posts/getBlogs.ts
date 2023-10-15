import { client } from "..";
import { GetPostsParams, GetPostsSuccessResponse } from "./getArticles";

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
