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

// export const loggedInUserLists = atom<IUser[]>({
//   key: "loggedInUserLists",
//   default: [],
// });
