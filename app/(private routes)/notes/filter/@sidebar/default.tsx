import css from "./Sidebar.module.css";

import Link from "next/link";

export default async function Sidebar() {
  const tags: string[] = [
    "All",
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
  ];
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}