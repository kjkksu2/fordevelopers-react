import { atom } from "recoil";
import { IUser } from "./auth";

export interface IComment {
  content: string;
  created_at: string;
  like: number;
  like_clicked_user: IUser[];
  post_id: string;
  post_kinds: string;
  user: IUser;
  _id: string;
}

export interface IArticle {
  category: string;
  scrap: number;
  scrap_clicked_user: IUser[];
  comment: IComment[];
  content: string;
  created_at: string;
  images: string[];
  like: number;
  like_clicked_user: IUser[];
  title: string;
  user: IUser;
  views: number;
  _id: string;
}

export const articleLists = atom<IArticle[]>({
  key: "articleLists",
  default: [],
});

export const article = atom({
  key: "article",
  default: {} as IArticle,
});
