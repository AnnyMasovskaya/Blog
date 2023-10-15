import { client } from "..";
import { GetPostParams, GetPostSuccessResponse } from "./getArticle";

export const getBlog = ({
  id,
}: GetPostParams): Promise<GetPostSuccessResponse> => {
  return client.get(`/v4/blogs/${id}`).then((res) => res.data);
};
