import React, { useEffect, useState } from "react";
import Logo from "./img/Logo.png";
import searchIcon from "./img/search.svg";
import userIcon from "./img/user.svg";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { getSlice } from "../../store/user/user.selectors";
import Typography from "../Typography/Typography";
import { getArticlesThunk } from "../../store/posts/posts.actions";
import { Post } from "../../api/posts/getPost";
import { getArticlesSlice } from "../../store/posts/posts.selectors";
import { setSearch } from "../../store/posts/posts.reducer";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../store/user/user.reducer";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showUserOptions, setShowUserOptions] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const { articles, articleIsActive } = useSelector(getArticlesSlice);
  const { isAuth, name } = useSelector(getSlice);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClick = () => {
    dispatch(setSearch(searchValue));
  };

  const hadleClickLogOut = () => {
    dispatch(logOut(false));
    setShowUserOptions(!showUserOptions);
  };

  const toggleUserOptions = () => {
    setShowUserOptions(!showUserOptions);
  };

  useEffect(() => {
    dispatch(getArticlesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (searchValue && articleIsActive) {
      const filtered = articles.filter((post) =>
        post.title.includes(searchValue)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(articles);
    }
  }, [searchValue, articles]);

  return (
    <div className={styles.header}>
      <Link to={"/"}>
        <img src={Logo} alt="Logo" className={styles.logo} />
      </Link>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.search}
          value={searchValue}
          onChange={handleChange}
          disabled={!articleIsActive}
        />
        <button className={styles.searchButton} onClick={handleClick}>
          <img src={searchIcon} alt="Search" />
        </button>
      </div>
      {isAuth ? (
        <div className={styles.user}>
          <div className={styles.initials}>
            <button className={styles.btnInitials} onClick={toggleUserOptions}>
              <Typography centered font="inter" variant="h5" color="primary">
                {name
                  .split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")}
              </Typography>
            </button>
          </div>
          {showUserOptions && (
            <div className={styles.userOptions}>
              \{" "}
              <Link
                to={"/"}
                onClick={hadleClickLogOut}
                style={{ textDecoration: "none" }}
              >
                <Typography centered font="inter" variant="h5" color="primary">
                  {"LOG OUT"}
                </Typography>
              </Link>
            </div>
          )}
          <div className={styles.name}>
            <Typography centered font="inter" variant="h5" color="primary">
              {name}
            </Typography>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <button className={styles.searchButton} onClick={toggleUserOptions}>
              <img src={userIcon} alt="User" />
            </button>
          </div>
          {showUserOptions && (
            <div className={styles.userOptions}>
              <Link to="/sign-in" style={{ textDecoration: "none" }}>
                <Typography centered font="inter" variant="h5" color="primary">
                  {"SIGN IN"}
                </Typography>
              </Link>
              <Link to="/sign-up" style={{ textDecoration: "none" }}>
                <Typography centered font="inter" variant="h5" color="primary">
                  {"SIGN UP"}
                </Typography>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
