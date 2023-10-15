import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getArticleThunk } from "../../store/posts/posts.actions";
import { AppDispatch } from "../../store";
import Typography from "../Typography/Typography";
import { getArticlesSlice } from "../../store/posts/posts.selectors";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import styles from "./PostDetail.module.css";
import { setPost } from "../../store/posts/posts.reducer";
import Socials from "../Socials/Socials";

const ArticleDetail: React.FC = () => {
  const { id: postId } = useParams();

  const {
    article,
    articleCache,
    isArticleLoading: loading,
  } = useSelector(getArticlesSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!postId) return;

    if (articleCache[postId]) {
      dispatch(setPost(articleCache[postId]));
    } else {
      dispatch(getArticleThunk(postId));
    }
  }, [dispatch, articleCache, postId]);

  const breadcrumbs: BreadCrumb[] = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: `/article/${postId}`,
      label: `Article ${postId}`,
    },
  ];

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />

      {loading && "Loading"}

      {article && (
        <>
          <Typography className={styles.title} font="inter" variant="h2">
            {article.title}
          </Typography>
          <div className={styles.content}>
            <div>
              <img
                className={styles.img}
                src={article.image_url}
                alt={article.title}
              />
            </div>
            <Typography
              className={styles.text}
              font="inter"
              color="secondary"
              variant="p"
            >
              {`Updated at: ${article.updated_at.split("T")[0]}`}
            </Typography>
            <Typography className={styles.text} font="inter" variant="span">
              <a href={article.url} target="_blank" rel="noreferrer">
                Read more
              </a>
            </Typography>
            <Socials />
          </div>
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
