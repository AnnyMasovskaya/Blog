import { client } from "..";

export interface Post {
  id: string | number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  published_at: string;
  updated_at: string;
  featired: [];
  lauches: [];
  events: [];
  isFavorite: boolean;
}

export type GetPostParams = { id: Post["id"] };

export type GetPostSuccessResponse = Post;

export const getArticle = ({
  id,
}: GetPostParams): Promise<GetPostSuccessResponse> => {
  return client.get(`/v4/articles/${id}`).then((res) => res.data);
};
