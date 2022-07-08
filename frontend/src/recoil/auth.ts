import { atom } from "recoil";

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

export const loggedInUser = atom({
  key: "loggedInUser",
  default: {} as IUser,
});
