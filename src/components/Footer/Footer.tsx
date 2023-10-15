import React, { useLayoutEffect } from "react";
import Typography from "../Typography/Typography";
import { usePersistedState } from "../../hooks/usePersistedState";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const [themeName, setThemeName] = usePersistedState<"dark" | "light">({
    key: "theme",
    initialValue: "light",
  });

  const changeTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
  };

  useLayoutEffect(() => {
    document.body.dataset.theme = themeName;
  }, [themeName]);

  return (
    <div className={styles.footer}>
      <Typography variant="h6" font="inter" color="secondary">
        ©2022 Blogolog
      </Typography>
      <div className={styles.theme}>
        <label htmlFor="theme">
          <Typography color="secondary" font="inter" variant="span">
            {themeName}
          </Typography>
        </label>
        <input type="checkbox" name="theme" id="theme" onChange={changeTheme} />
      </div>
    </div>
  );
};

export default Footer;
