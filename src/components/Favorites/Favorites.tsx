import React from "react";
import { NavLink } from "react-router-dom";
import MediumPost from "../PostsCards/Medium/Medium";
import styles from "./Favorites.module.css";
import { useSelector } from "react-redux";
import {
  getArticlesSlice,
  getFavoritesArticles,
} from "../../store/posts/posts.selectors";
import { Post } from "../../api/posts/getPost";

interface FavoritesProps {}

const Favorites: React.FC<FavoritesProps> = () => {
  const { articles } = useSelector(getArticlesSlice);
  const favoritesPosts = useSelector(getFavoritesArticles);
  const savedFavorites = localStorage.getItem("fav");
  const savedFavoritesIds = savedFavorites ? savedFavorites.split(",") : [];
  const favoritePostsToShow = articles.filter((post) =>
    savedFavoritesIds.includes(String(post.id))
  );

  return (
    <ul className={styles.mediumPosts}>
      {favoritePostsToShow.map((post: Post) => (
        <li className={styles.mediumPost} key={post.id}>
          <NavLink style={{ textDecoration: "none" }} to={`/post/${post.id}`}>
            <MediumPost post={post} />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Favorites;
