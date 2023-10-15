import React from "react";
import { NavLink } from "react-router-dom";
import MediumPost from "../PostsCards/Medium/Medium";
import styles from "./AllPosts.module.css";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getArticlesSlice } from "../../store/posts/posts.selectors";
import { updateOffset } from "../../store/posts/posts.reducer";
import Typography from "../Typography/Typography";

interface AllArticlesProps {}

const AllArticles: React.FC<AllArticlesProps> = () => {
  const {
    articles,
    isArticlesLoading: loading,
    limit,
    count,
  } = useSelector(getArticlesSlice);
  const dispatch = useDispatch();

  const handlePaginationClick = (page: number) => {
    dispatch(updateOffset(page));
  };

  return (
    <div>
      {loading && (
        <div>
          <Typography centered font="inter" variant="h5" color="primary">
            {"LOADING"}
          </Typography>
        </div>
      )}
      <ul className={styles.mediumPosts}>
        {articles.map((article) => (
          <li className={styles.mediumPost} key={article.id}>
            <NavLink
              style={{
                textDecoration: "none",
                display: "block",
                height: "100%",
              }}
              to={`/articles/${article.id}`}
            >
              <MediumPost post={article} />
            </NavLink>
          </li>
        ))}
      </ul>

      <Pagination
        onClick={handlePaginationClick}
        pages={Math.ceil(count / limit)}
      />
    </div>
  );
};

export default AllArticles;
