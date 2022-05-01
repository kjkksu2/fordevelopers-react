import { atom } from "recoil";

export const corsUrl = atom<string>({
  key: "corsUrl",
  default: "http://localhost:4000",
});

export const loginBtn = atom<boolean>({
  key: "loginBtn",
  default: false,
});

export const isLoggedIn = atom<boolean>({
  key: "isLoggedIn",
  default: false,
});

export interface IUser {
  choice: [];
  comment: [];
  dev: [];
  created_at: string;
  department: string;
  email: string;
  github_url: string;
  goToSchool: string;
  image_url: string;
  introduction: string;
  heart: number;
  heart_clicked_user: [];
  name: string;
  nickname: string;
  visit: number;
  _id: string;
}

export const loggedInUser = atom<IUser>({
  key: "loggedInUser",
  default: <IUser>{},
});

export interface IPagination {
  articlesPerPage: number;
  maxShownButtons: number;
  numberOfArticles: number;
  currentPage: number;
}

export const pagination = atom<IPagination>({
  key: "pagination",
  default: {
    articlesPerPage: 4,
    maxShownButtons: 10,
    numberOfArticles: -1,
    currentPage: 1,
  },
});

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

export const article = atom<IArticle>({
  key: "post",
  default: <IArticle>{},
});

// export const loggedInUserLists = atom<IUser[]>({
//   key: "loggedInUserLists",
//   default: [],
// });
