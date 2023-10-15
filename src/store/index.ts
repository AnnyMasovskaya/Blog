import { Middleware, configureStore } from "@reduxjs/toolkit";
import { articlesReducer, blogsReducer } from "./posts/posts.reducer";
import userReducer from "./user/user.reducer";

const logger: Middleware = (store) => (next) => (action) => {
  next(action);
};

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
