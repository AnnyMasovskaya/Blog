import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Main from "../pages/Main";
import { useSelector } from "react-redux";
import PostNews from "../pages/PostNews";
import PostArt from "../pages/PostArt";
import { getSlice } from "../store/user/user.selectors";

const Router: React.FC = () => {
  const { isAuth } = useSelector(getSlice);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Main />} />
        <Route path="/articles/:id" element={<PostArt />} />
        <Route path="/news/:id" element={<PostNews />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
