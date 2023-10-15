import React from "react";
import { NavLink } from "react-router-dom";
import Typography from "../Typography/Typography";
import styles from "./BreadCrumbs.module.css";

export interface BreadCrumb {
  link: string;
  label: string;
}

interface BreadCrumbsProps {
  breadcrumbs: BreadCrumb[];
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ breadcrumbs }) => {
  return (
    <ul className={styles.list}>
      {breadcrumbs.map(({ label, link }, i) => (
        <li key={link} className={styles.listItem}>
          <NavLink to={link}>
            <Typography
              variant="span"
              font="inter"
              color={i === breadcrumbs.length - 1 ? "secondary" : "primary"}
            >
              {label}
            </Typography>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default BreadCrumbs;
