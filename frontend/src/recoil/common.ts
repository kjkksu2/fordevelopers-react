import { atom } from "recoil";

export const corsUrl = atom<string>({
  key: "corsUrl",
  default: "http://localhost:4000",
});

export const loading = atom<boolean>({
  key: "loading",
  default: true,
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
