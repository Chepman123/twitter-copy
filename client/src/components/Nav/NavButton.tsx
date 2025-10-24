import { Link } from "react-router-dom";
import classes from "./NavButton.module.css";

interface NavButtonProps {
  children: string;
  path: string;
  icon: string;
}

export default function NavButton({ children, path, icon }: NavButtonProps) {
  return (
    <Link to={path} className={classes.navButton}>
      <svg className={classes.svg}
  viewBox="0 0 24 24"
  width="24"
  height="24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  aria-hidden="true"
  focusable="false"
      >
        <path d={icon} />
      </svg>
      <span>{children}</span>
    </Link>
  );
}
