
import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";


export type TagList = string[];

const tags: TagList = ["All", "Work", "Personal", "Ideas", "Other"];

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.logo}>
        <Link href="/">NoteHub</Link>
      </div>

      <TagsMenu tags={tags} /> {}
      
      <AuthNavigation />
    </header>
  );
}
