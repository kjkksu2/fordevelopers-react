import { atom } from "recoil";

export const corsUrl = atom({
  key: "corsUrl",
  default: "http://localhost:4000",
});

export const loginBtn = atom({
  key: "loginBtn",
  default: false,
});

export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: false,
});

interface IUser {
  id: string;
}

export const loggedInUserLists = atom<IUser[]>({
  key: "loggedInUserLists",
  default: [],
});
