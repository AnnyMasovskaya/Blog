import instagram from "./img/instagram.svg";
import facebook from "./img/facebook.svg";
import twitter from "./img/twitter.svg";

import styles from "./Social.module.css";

const Socials = () => {
  return (
    <div className={styles.iconsWrapper}>
      <a
        href="https://www.facebook.com/"
        className={styles.aWrapp}
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.iconSocial} src={facebook} alt="facebook" />
      </a>
      <a
        href="https://twitter.com/"
        className={styles.aWrapp}
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.iconSocial} src={twitter} alt="twitter" />
      </a>

      <a
        href="https://www.instagram.com/"
        className={styles.aWrapp}
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.iconSocial} src={instagram} alt="instagram" />
      </a>
    </div>
  );
};

export default Socials;
