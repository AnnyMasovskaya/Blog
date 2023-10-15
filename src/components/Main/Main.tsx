import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tabs, { Tab } from "../Tabs/Tabs";
import Typography from "../Typography/Typography";
import { getArticlesSlice } from "../../store/posts/posts.selectors";
import Favorites from "../Favorites/Favorites";
import styles from "./Main.module.css";
import {
  getArticlesThunk,
  getBlogsThunk,
} from "../../store/posts/posts.actions";
import { AppDispatch } from "../../store";
import AllArticles from "../AllPosts/AllArticles";
import AllNews from "../AllPosts/AllNews";
import { getSlice } from "../../store/user/user.selectors";
import { setArticleNotActive } from "../../store/posts/posts.reducer";

const tabs: Tab[] = [
  {
    label: "Articles",
    value: "articles",
  },
  { label: "News", value: "news" },
  { label: "Favorites", value: "favorites" },
];

const Main: React.FC = () => {
  const { limit, offset, search, articleIsActive } =
    useSelector(getArticlesSlice);
  const { isAuth } = useSelector(getSlice);
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  useEffect(() => {
    if (activeTab === "articles") {
      dispatch(getArticlesThunk());
      dispatch(setArticleNotActive(true));
    } else if (activeTab === "news") {
      dispatch(setArticleNotActive(false));
      dispatch(getBlogsThunk());
    } else if (activeTab === "favorites") {
      dispatch(setArticleNotActive(false));
    }
  }, [dispatch, search, limit, offset, activeTab, articleIsActive]);

  const handleChangeTab = (tab: Tab) => setActiveTab(tab.value);

  return (
    <>
      <Typography className={styles.title} font="inter" variant="h1">
        Blog
      </Typography>
      <Tabs
        className={styles.tabs}
        activeTab={activeTab}
        tabs={tabs}
        onTabClick={handleChangeTab}
      />

      <div className={styles.posts}>
        {activeTab === "articles" && <AllArticles />}
        {activeTab === "news" && <AllNews />}
        {activeTab === "favorites" && <Favorites />}
      </div>
    </>
  );
};

export default Main;
