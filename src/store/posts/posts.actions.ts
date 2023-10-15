import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getArticlesSlice, getBlogsSlice } from "./posts.selectors";
import { getArticles, getBlogs } from "../../api/posts/getPosts";
import { getArticle, getBlog, Post } from "../../api/posts/getPost";

export const getArticlesThunk = createAsyncThunk(
  "blog/getArticlesThunk",
  async (param, thunkApi) => {
    const { getState } = thunkApi;
    const { limit, offset, search } = getArticlesSlice(getState() as RootState);

    return getArticles({ limit, offset, search });
  }
);

export const getArticleThunk = createAsyncThunk(
  "blog/getArticleThunk",
  (id: Post["id"]) => getArticle({ id })
);

export const getBlogsThunk = createAsyncThunk(
  "blog/getBlogsThunk",
  async (param, thunkApi) => {
    const { getState } = thunkApi;
    const { limit, offset, search } = getBlogsSlice(getState() as RootState);

    return getBlogs({ limit, offset, search });
  }
);

export const getBlogThunk = createAsyncThunk(
  "blog/getBlogThunk",
  (id: Post["id"]) => getBlog({ id })
);
