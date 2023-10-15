import { RootState } from "..";

export const getArticlesSlice = (state: RootState) => state.articles;

export const getBlogsSlice = (state: RootState) => state.blogs;

export const getFavoritesArticles = (state: RootState) =>
  getArticlesSlice(state).articles.filter((p) => p.isFavorite);
