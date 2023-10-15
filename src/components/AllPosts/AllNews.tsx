import React from "react";
import { NavLink } from "react-router-dom";
import MediumPost from "../PostsCards/Medium/Medium";
import styles from "./AllPosts.module.css";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsSlice } from "../../store/posts/posts.selectors";
import { updateOffset } from "../../store/posts/posts.reducer";
import Typography from "../Typography/Typography";

interface AllNewsProps {}

const AllNews: React.FC<AllNewsProps> = () => {
  const { blogs, isBlogsLoading: loading } = useSelector(getBlogsSlice);
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
        {blogs.map((blog) => (
          <li className={styles.mediumPost} key={blog.id}>
            <NavLink style={{ textDecoration: "none" }} to={`/news/${blog.id}`}>
              <MediumPost post={blog} />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllNews;
