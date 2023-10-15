import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogThunk } from "../../store/posts/posts.actions";
import { AppDispatch } from "../../store";
import Typography from "../Typography/Typography";
import { getBlogsSlice } from "../../store/posts/posts.selectors";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import styles from "./PostDetail.module.css";
import { setPost } from "../../store/posts/posts.reducer";
import Socials from "../Socials/Socials";

const NewsDetail: React.FC = () => {
  const { id: blogId } = useParams();

  const {
    blog,
    blogCache,
    isBlogLoading: loading,
  } = useSelector(getBlogsSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!blogId) return;

    if (blogCache[blogId]) {
      dispatch(setPost(blogCache[blogId]));
    } else {
      dispatch(getBlogThunk(blogId));
    }
  }, [dispatch, blogCache, blogId]);

  const breadcrumbs: BreadCrumb[] = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: `/news/${blogId}`,
      label: `News ${blogId}`,
    },
  ];

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />

      {loading && "Loading"}

      {blog && (
        <>
          <Typography className={styles.title} font="inter" variant="h2">
            {blog.title}
          </Typography>
          <div className={styles.content}>
            <div>
              <img
                className={styles.img}
                src={blog.image_url}
                alt={blog.title}
              />
            </div>
            <Typography
              className={styles.text}
              font="inter"
              color="secondary"
              variant="span"
            >
              {`Updated at: ${blog.updated_at.split("T")[0]}`}
            </Typography>
            <Typography className={styles.text} font="inter" variant="span">
              <a href={blog.url}> Read more </a>
            </Typography>
            <Socials />
          </div>
        </>
      )}
    </div>
  );
};

export default NewsDetail;
