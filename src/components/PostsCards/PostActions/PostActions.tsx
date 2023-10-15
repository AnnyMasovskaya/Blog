import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./PostActions.module.css";
import Button from "../../Button/Button";
import Icon from "../../Icon/Icon";
import { Post } from "../../../api/posts/getArticle";
import { togglePostIsFavorite } from "../../../store/posts/posts.reducer";
import { getSlice } from "../../../store/user/user.selectors";

interface PostActionsProps {
  post: Post;
}

const PostActions: React.FC<PostActionsProps> = ({ post }) => {
  const dispatch = useDispatch();
  const { emailSignIn } = useSelector(getSlice);

  const [isFavorite, setIsFavorite] = useState(() => {
    const savedFav = localStorage.getItem("fav");
    return savedFav ? savedFav.includes(String(post.id)) : false;
  });

  useEffect(() => {
    const savedFav = localStorage.getItem("fav");
    if (savedFav) {
      setIsFavorite(savedFav.includes(String(post.id)));
    }
  }, [emailSignIn, post.id]);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const savedFav = localStorage.getItem("fav") || "";
    const updatedFav = savedFav.split(",").filter(Boolean);

    if (isFavorite) {
      const index = updatedFav.indexOf(String(post.id));
      if (index !== -1) {
        updatedFav.splice(index, 1);
      }
    } else {
      updatedFav.push(String(post.id));
    }

    setIsFavorite(!isFavorite);
    localStorage.setItem("fav", updatedFav.join(","));
    dispatch(togglePostIsFavorite(post.id));
  };

  return (
    <div className={styles.actions}>
      <div className={styles.buttonsWrap}>
        <Button variant="icon" onClick={handleBookmarkClick}>
          <Icon
            type="bookmark"
            style={{ color: isFavorite ? "red" : "inherit" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default PostActions;
