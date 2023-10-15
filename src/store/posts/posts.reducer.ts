import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Post } from "../../api/posts/getPost";
import {
  getArticlesThunk,
  getArticleThunk,
  getBlogsThunk,
  getBlogThunk,
} from "./posts.actions";

interface PostsState {
  isArticlesLoading: boolean;
  articles: Post[];
  isArticleLoading: boolean;
  article: Post | null;
  articleCache: Record<Post["id"], Post>;
  articleIsActive: boolean;

  isBlogsLoading: boolean;
  blogs: Post[];
  isBlogLoading: boolean;
  blog: Post | null;
  blogCache: Record<Post["id"], Post>;

  count: number;
  search: string;
  limit: number;
  offset: number;
}

const initialState: PostsState = {
  isArticlesLoading: false,
  articles: [],
  isArticleLoading: false,
  article: null,
  articleCache: {} as Record<Post["id"], Post>,
  articleIsActive: false,

  isBlogsLoading: false,
  blogs: [],
  isBlogLoading: false,
  blog: null,
  blogCache: {} as Record<Post["id"], Post>,

  count: 0,
  search: "",
  limit: 18,
  offset: 0,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPost: (state, action: PayloadAction<Post>) => {
      state.article = action.payload;
    },
    setArticleNotActive: (state, action) => {
      state.articleIsActive = action.payload;
    },
    incOffset: (state) => {
      const nextOffset = state.offset + initialState.limit;
      if (nextOffset < state.count) {
        state.offset = nextOffset;
      } else {
        state.offset = state.count;
      }
    },
    updateOffset: (state, action: PayloadAction<number>) => {
      state.offset = state.limit * (action.payload - 1);
    },
    togglePostIsFavorite: (state, action: PayloadAction<Post["id"]>) => {
      const post = state.articles.find((p) => p.id === action.payload);

      if (post) {
        post.isFavorite = !post.isFavorite;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getArticlesThunk.pending, (state) => {
      state.isArticlesLoading = true;
    });
    builder.addCase(getArticlesThunk.fulfilled, (state, action) => {
      state.isArticlesLoading = false;
      state.count = action.payload.count;

      const newPosts = action.payload.results.map((post) => ({
        ...post,
        likes: 0,
        dislikes: 0,
        isFavorite: false,
      }));
      state.articles = newPosts;
    });

    builder.addCase(getArticleThunk.pending, (state) => {
      state.isArticleLoading = true;
    });
    builder.addCase(getArticleThunk.fulfilled, (state, action) => {
      state.isArticleLoading = false;
      state.article = action.payload;
      state.articleCache[action.payload.id] = action.payload;
    });
  },
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getBlogsThunk.pending, (state) => {
      state.isBlogsLoading = true;
    });
    builder.addCase(getBlogsThunk.fulfilled, (state, action) => {
      state.isBlogsLoading = false;
      state.count = action.payload.count;

      const newPosts = action.payload.results.map((post) => ({
        ...post,
        likes: 0,
        dislikes: 0,
        isFavorite: false,
      }));
      state.blogs = newPosts;
    });

    builder.addCase(getBlogThunk.pending, (state) => {
      state.isBlogLoading = true;
    });
    builder.addCase(getBlogThunk.fulfilled, (state, action) => {
      state.isBlogLoading = false;
      state.blog = action.payload;
      state.blogCache[action.payload.id] = action.payload;
    });
  },
});

export const {
  togglePostIsFavorite,
  setArticleNotActive,
  setSearch,
  setPost,
  incOffset,
  updateOffset,
} = articlesSlice.actions;

export const articlesReducer = articlesSlice.reducer;
export const blogsReducer = blogsSlice.reducer;
