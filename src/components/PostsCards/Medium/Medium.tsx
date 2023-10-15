import React from "react";
import { Post } from "../../../api/posts/getArticle";
import Typography from "../../Typography/Typography";
import PostActions from "../PostActions/PostActions";
import styles from "./Medium.module.css";
import { useSelector } from "react-redux";
import { getArticlesSlice } from "../../../store/posts/posts.selectors";

interface MediumPost {
  post: Post;
}

const Medium: React.FC<MediumPost> = ({ post }) => {
  const { articles, articleIsActive } = useSelector(getArticlesSlice);

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <div className={styles.overlay}></div>
        <img className={styles.img} src={post.image_url} alt={post.title} />
      </div>
      <div className={styles.info}>
        <Typography variant="span" font="inter" color="secondary">
          {post.published_at.split("T")[0]}
        </Typography>
        <Typography
          variant="h5"
          font="inter"
          color="primary"
          className={styles.title}
        >
          {post.title.length > 0 ? `${post.title.slice(0, 50)} ...` : ""}
        </Typography>
        <div className={styles.postActionWrapper}>
          {articleIsActive ? <PostActions post={post} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default Medium;
