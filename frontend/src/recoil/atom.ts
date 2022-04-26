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
  community: [];
  created_at: string;
  department: string;
  email: string;
  github_url: string;
  goToSchool: string;
  image_url: string;
  interest: [];
  introduction: string;
  like: number;
  like_clicked_user: [];
  name: string;
  nickname: string;
  recruitment: [];
  visit: number;
  _id: string;
}

export const loggedInUser = atom<IUser>({
  key: "loggedInUser",
  default: {
    choice: [],
    comment: [],
    community: [],
    created_at: "",
    department: "",
    email: "",
    github_url: "",
    goToSchool: "",
    image_url: "",
    interest: [],
    introduction: "",
    like: 0,
    like_clicked_user: [],
    name: "",
    nickname: "",
    recruitment: [],
    visit: 0,
    _id: "",
  },
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

export interface IArticleLists {
  _id: string;
  title: string;
  content: string;
  like: number;
  choice: number;
  views: number;
  user: {
    nickname: string;
    image_url: string;
    department: string;
    goToSchool: string;
    like: number;
  };
  created_at: string;
  comment: [];
}

// export const loggedInUserLists = atom<IUser[]>({
//   key: "loggedInUserLists",
//   default: [],
// });
